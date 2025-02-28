import { AppDataSource } from "../data-source";
import { Package, PackageStatus } from "../entity/Package";
import { Passenger } from "../entity/Passenger";
import { Rider } from "../entity/Rider";

export class PackageAPI {
    static async createPackage(payload: any, senderId: number): Promise<Package> {
        const packageRepository = AppDataSource.getRepository(Package);
        const passengerRepository = AppDataSource.getRepository(Passenger);

        // Find the sender (passenger)
        const sender = await passengerRepository.findOne({ where: { id: senderId } });
        console.log('Searching for sender with ID:', senderId); // Debug log
        console.log('Found sender:', sender);
        if (!sender) {
            throw new Error("Sender not found");
        }

        // Create new package
        const newPackage = packageRepository.create({
            ...payload,
            sender,
            status: PackageStatus.PENDING
        });

        return packageRepository.save(newPackage) as unknown as Promise<Package>;
    }

    static async updatePackageStatus(
        packageId: number, 
        status: PackageStatus, 
        riderId?: number
    ): Promise<Package> {
        const packageRepository = AppDataSource.getRepository(Package);
        const riderRepository = AppDataSource.getRepository(Rider);

        const packageToDeliver = await packageRepository.findOne({
            where: { id: packageId },
            relations: ['rider', 'sender']
        });

        if (!packageToDeliver) {
            throw new Error("Package not found");
        }

        if (riderId) {
            const rider = await riderRepository.findOneBy({ id: riderId });
            if (!rider) {
                throw new Error("Rider not found");
            }
            packageToDeliver.rider = rider;
        }

        packageToDeliver.status = status;

        if (status === PackageStatus.PICKED_UP) {
            packageToDeliver.pickedUpAt = new Date();
        } else if (status === PackageStatus.DELIVERED) {
            packageToDeliver.deliveredAt = new Date();
        }

        return await packageRepository.save(packageToDeliver);
    }

    static async getPackage(packageId: number): Promise<Package> {
        const packageRepository = AppDataSource.getRepository(Package);
        const packageToDeliver = await packageRepository.findOne({
            where: { id: packageId },
            relations: ['sender', 'rider']
        });

        if (!packageToDeliver) {
            throw new Error("Package not found");
        }

        return packageToDeliver;
    }

    static async getPackagesByPassenger(passengerId: number): Promise<Package[]> {
        const packageRepository = AppDataSource.getRepository(Package);
        return await packageRepository.find({
            where: { sender: { id: passengerId } },
            relations: ['rider']
        });
    }

    static async assignRider(packageId: number, plateNumber: string): Promise<Package> {
        const packageRepository = AppDataSource.getRepository(Package);
        const riderRepository = AppDataSource.getRepository(Rider);
    
        const packageToAssign = await packageRepository.findOne({
            where: { id: packageId },
            relations: ['rider']
        });
    
        if (!packageToAssign) {
            throw new Error("Package not found");
        }
    
        if (packageToAssign.status !== PackageStatus.PENDING) {
            throw new Error("Package is not available for assignment");
        }
    
        const rider = await riderRepository.findOne({
            where: { plateNumber }
        });
    
        if (!rider) {
            throw new Error("Rider not found");
        }
    
        packageToAssign.rider = rider;
        packageToAssign.status = PackageStatus.ACCEPTED;
    
        return packageRepository.save(packageToAssign);
    }
    
    // Add method to get available packages
    static async getAvailablePackages(): Promise<Package[]> {
        const packageRepository = AppDataSource.getRepository(Package);
        return packageRepository.find({
            where: { status: PackageStatus.PENDING },
            relations: ['sender']
        });
    }

    static async getPackagesByRider(riderId: number): Promise<Package[]> {
        const packageRepository = AppDataSource.getRepository(Package);
        return await packageRepository.find({
            where: { rider: { id: riderId } },
            relations: ['sender']
        });
    }
}