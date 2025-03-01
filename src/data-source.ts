require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Passenger } from "./entity/Passenger";
import { Rider } from "./entity/Rider";
import { Package } from "./entity/Package";
import { Admin } from "./entity/Admin";

export const AppDataSource = new DataSource({
  type: "postgres",
  ...(process.env.NODE_ENV === "production"
      ? {
          url: process.env.DATABASE_URL,
          ssl: {
              rejectUnauthorized: false
          },
          extra: {
            ssl: {
                rejectUnauthorized: false
            }
        }
      }
      : {
          host: process.env.DB_HOST || "localhost",
          port: parseInt(process.env.DB_PORT) || 5432,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME
      }),
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  entities: [Passenger, Rider, Package, Admin],
  migrations: [],
  subscribers: []
});