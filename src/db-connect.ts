import { AppDataSource } from "./data-source";

export const connectDB = async (retries = 3) => {
    while (retries) {
        try {
            await AppDataSource.initialize();
            console.log("Data Source has been initialized!");
            break;
        } catch (err) {
            console.error("Error during Data Source initialization:", err);
            retries -= 1;
            console.log(`Retries left: ${retries}`);
            if (retries === 0) {
                throw new Error("Failed to connect to database");
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};