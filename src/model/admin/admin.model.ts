import {  DeepPartial } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Admin } from "../../entity/Admin";
import * as bcrypt from "bcrypt";
import { generateToken } from "../../utility/jwt";

export class AdminAPI {
  static async createAdmin(adminData: any): Promise<any> {
    const adminRepository = AppDataSource.getRepository(Admin);

    // Check if admin with email already exists
    const existingAdmin = await adminRepository.findOne({ 
      where: { email: adminData.email } 
    });

    if (existingAdmin) {
      throw new Error("Admin with this email already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    // Create new admin
    const admin = adminRepository.create({
      ...adminData,
      password: hashedPassword
    });

    const savedAdmins: DeepPartial<Admin>[] = await adminRepository.save(admin) as Admin[];
    const savedAdmin = savedAdmins[0];

    // Generate JWT token
    const token = generateToken({
      id: savedAdmin.id,
      email: savedAdmin.email,
      userType: "admin"
    });

    // Return admin without password and with token
    const { password, ...adminWithoutPassword } = savedAdmin;
    return {
      ...adminWithoutPassword,
      token
    };
  }

  static async loginAdmin(email: string, password: string): Promise<any> {
    const adminRepository = AppDataSource.getRepository(Admin);

    // Find admin by email
    const admin = await adminRepository.findOne({ where: { email } });

    if (!admin) {
      throw new Error("Invalid email or password");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = generateToken({
      id: admin.id,
      email: admin.email,
      userType: "admin"
    });

    // Return admin without password and with token
    const { password: _, ...adminWithoutPassword } = admin;
    return {
      ...adminWithoutPassword,
      token
    };
  }

  static async getAllAdmins(): Promise<Admin[]> {
    const adminRepository = AppDataSource.getRepository(Admin);
    return await adminRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  static async getAdmin(adminId: number): Promise<Admin> {
    const adminRepository = AppDataSource.getRepository(Admin);
    const admin = await adminRepository.findOne({ where: { id: adminId } });

    if (!admin) {
      throw new Error("Admin not found");
    }

    return admin;
  }
}