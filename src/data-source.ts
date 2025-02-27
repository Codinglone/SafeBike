require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Passenger } from "./entity/Passenger";

const dbURL = "";
export const AppDataSource = new DataSource(
  process.env.NODE_ENV === "production"
    ? {
        type: "postgres",
        url: dbURL,
        synchronize: true,
        logging: false,
        entities: [Passenger],
        migrations: [],
        subscribers: [],
      }
    : {
        type: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: false,
        entities: [Passenger],
        migrations: [],
        subscribers: [],
      }
);
