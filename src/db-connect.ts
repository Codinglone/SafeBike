import { AppDataSource } from "./data-source";
export const connectDB = async (retries = 10) => {
  while (retries) {
    try {
      await AppDataSource.initialize();
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await ((res) => setTimeout(res, 5000));
    }
  }
};
