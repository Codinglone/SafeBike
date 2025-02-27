import { AppDataSource } from "../data-source";
import { Passenger } from "../entity/Passenger";
import { PassengerAccountCreationType } from "../utility/interfaces";
const bcrypt = require("bcrypt");

export class PassengerAccountCreationAPI {
  static async createPassenger(
    payload: PassengerAccountCreationType
  ): Promise<any> {
    const passengerRepository = AppDataSource.getRepository(Passenger);
    const email = payload.email;
    console.log(email);
    const existingPassenger = await passengerRepository.findOneBy({ email });
    if (!existingPassenger) {
      const passenger = new Passenger();
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      return await passengerRepository.save({
        ...passenger,
        ...payload,
        password: hashedPassword,
      });
    } else {
      throw new Error(`${payload.email} already exists!, use different email!`);
    }
  }
}
