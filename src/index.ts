import fastify from "fastify";
import { connectDB } from "./db-connect";
export const app = fastify();
const PORT = parseInt(process.env.PORT) || 5000;

const start = async () => {
  try {
    await app.listen({
      port: PORT,
      host: process.env.HOST || "0.0.0.0",
    });
    console.log("Server is running on port: ", PORT);
    connectDB();
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
