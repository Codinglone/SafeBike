import { AppDataSource } from "../data-source";
import { Admin } from "../entity/Admin";
import * as bcrypt from "bcrypt";

export const createInitialAdmin = async () => {
  try {
    await AppDataSource.initialize();
    
    const adminRepository = AppDataSource.getRepository(Admin);
    const existingAdmin = await adminRepository.findOne({
      where: { email: "admin@safebike.rw" }
    });
    
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("Admin@123", salt);
      
      const admin = adminRepository.create({
        firstName: "Fabrice",
        lastName: "NIYOKWIZERWA",
        email: "niyokwizerwafabrice250@gmail.com",
        phoneNumber: "0784427142",
        password: hashedPassword
      });
      
      await adminRepository.save(admin);
      console.log("Initial admin account created successfully");
    } else {
      console.log("Admin account already exists");
    }
    
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Error creating initial admin:", error);
  }
};

// Execute if run directly
if (require.main === module) {
  createInitialAdmin()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}