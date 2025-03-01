import { AppDataSource } from "../data-source";
import { Package, PackageStatus } from "../entity/Package";
import { Passenger } from "../entity/Passenger";
import { Rider } from "../entity/Rider";

export class PackageAPI {
  static async createPackage(payload: any, senderId: number): Promise<Package> {
    const packageRepository = AppDataSource.getRepository(Package);
    const passengerRepository = AppDataSource.getRepository(Passenger);

    // Find the sender (passenger)
    const sender = await passengerRepository.findOne({
      where: { id: senderId },
    });
    console.log("Searching for sender with ID:", senderId); // Debug log
    console.log("Found sender:", sender);
    if (!sender) {
      throw new Error("Sender not found");
    }

    const recipient = await passengerRepository.findOne({
      where: { email: payload.recipientEmail },
    });

    if (!recipient) {
      throw new Error(
        "Recipient not found - they must be registered in the system"
      );
    }

    // Create new package
    const newPackage = packageRepository.create({
      ...payload,
      sender,
      recipient,
      status: PackageStatus.PENDING,
    });

    return packageRepository.save(newPackage) as unknown as Promise<Package>;
  }

  static async getAllPackages(): Promise<Package[]> {
    const packageRepository = AppDataSource.getRepository(Package);
    return await packageRepository.find({
      relations: ["sender", "recipient", "rider"],
      order: { createdAt: "DESC" },
    });
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
      relations: ["rider", "sender"],
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
      relations: ["sender", "recipient", "rider"],
    });

    if (!packageToDeliver) {
      throw new Error("Package not found");
    }

    if (!packageToDeliver.recipient) {
      packageToDeliver.recipient = null;
    }

    return packageToDeliver;
  }

  static async getPackagesByPassenger(passengerId: number): Promise<Package[]> {
    const packageRepository = AppDataSource.getRepository(Package);
    return await packageRepository.find({
      where: { sender: { id: passengerId } },
      relations: ["rider"],
    });
  }

  static async assignRider(
    packageId: number,
    plateNumber: string
  ): Promise<Package> {
    const packageRepository = AppDataSource.getRepository(Package);
    const riderRepository = AppDataSource.getRepository(Rider);

    const packageToAssign = await packageRepository.findOne({
      where: { id: packageId },
      relations: ["rider"],
    });

    if (!packageToAssign) {
      throw new Error("Package not found");
    }

    if (packageToAssign.status !== PackageStatus.PENDING) {
      throw new Error("Package is not available for assignment");
    }

    const rider = await riderRepository.findOne({
      where: { plateNumber },
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
      relations: ["sender"],
    });
  }

  static async getPackagesByRider(riderId: number): Promise<Package[]> {
    const packageRepository = AppDataSource.getRepository(Package);
    return await packageRepository.find({
      where: { rider: { id: riderId } },
      relations: ["sender"],
    });
  }

  static async confirmPickup(
    packageId: number,
    riderId: number
  ): Promise<Package> {
    const packageRepository = AppDataSource.getRepository(Package);

    const packageToConfirm = await packageRepository.findOne({
      where: {
        id: packageId,
        rider: { id: riderId },
        status: PackageStatus.ACCEPTED,
      },
      relations: ["rider"],
    });

    if (!packageToConfirm) {
      throw new Error("Package not found or not assigned to this rider");
    }

    packageToConfirm.status = PackageStatus.PICKED_UP;
    packageToConfirm.pickedUpAt = new Date();

    return packageRepository.save(packageToConfirm);
  }

  static async confirmDelivery(
    packageId: number,
    riderId: number
  ): Promise<Package> {
    const packageRepository = AppDataSource.getRepository(Package);

    const packageToDeliver = await packageRepository.findOne({
      where: {
        id: packageId,
        status: PackageStatus.PICKED_UP,
      },
      relations: ["rider"],
    });

    if (!packageToDeliver) {
      throw new Error("Package not found or not picked up");
    }

    // Here you can add logic to verify the recipient, e.g., check recipient ID
    packageToDeliver.status = PackageStatus.DELIVERED;
    packageToDeliver.deliveredAt = new Date();

    return packageRepository.save(packageToDeliver);
  }

  static async confirmReceipt(
    packageId: number,
    recipientId: number
  ): Promise<Package> {
    const packageRepository = AppDataSource.getRepository(Package);

    const packageToConfirm = await packageRepository.findOne({
      where: {
        id: packageId,
        status: PackageStatus.DELIVERED,
      },
      relations: ["recipient", "rider", "sender"],
    });

    if (!packageToConfirm) {
      throw new Error("Package not found or not delivered yet");
    }

    // Verify this is actually the recipient confirming
    if (packageToConfirm.recipient.id !== recipientId) {
      throw new Error(
        "Only the designated recipient can confirm package receipt"
      );
    }

    packageToConfirm.status = PackageStatus.CONFIRMED;
    packageToConfirm.confirmedAt = new Date();

    return packageRepository.save(packageToConfirm);
  }
}
