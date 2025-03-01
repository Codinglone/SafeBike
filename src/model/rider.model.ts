import { AppDataSource } from "../data-source";
import { Rider } from "../entity/Rider";
import { RiderAccountCreationType } from "../utility/interfaces";
const bcrypt = require("bcrypt");

export class RiderAccountCreationAPI {
  static async createRider(payload: RiderAccountCreationType): Promise<any> {
    const riderRepository = AppDataSource.getRepository(Rider);
    const email = payload.email;
    console.log(email);
    const existingRider = await riderRepository.findOneBy({ email });
    if (!existingRider) {
      const rider = new Rider();
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      return await riderRepository.save({
        ...rider,
        ...payload,
        password: hashedPassword,
      });
    } else {
      throw new Error(`${payload.email} already exists!, use different email!`);
    }
  }

  static async getAllRiders(): Promise<Rider[]> {
    const riderRepository = AppDataSource.getRepository(Rider);
    return await riderRepository.find({
      order: { createdAt: "DESC" },
    });
  }

  static async updateAvailability(riderId: number, isAvailable: boolean): Promise<Rider> {
    const riderRepository = AppDataSource.getRepository(Rider);
    
    const rider = await riderRepository.findOne({
      where: { id: riderId }
    });

    if (!rider) {
      throw new Error("Rider not found");
    }

    rider.isAvailable = isAvailable;
    rider.lastLocationUpdate = new Date();

    return await riderRepository.save(rider);
  }
}
