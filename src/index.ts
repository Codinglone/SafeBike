import fastify from "fastify";
import { connectDB } from "./db-connect";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
export const app = fastify();
const PORT = parseInt(process.env.PORT) || 5000;
require("dotenv").config();
const path = require("path");
const multer = require("fastify-multer");
app.register(fastifySwagger, {
    mode: 'dynamic',
    openapi: {
        info: {
            title: 'SafeBike Rwanda APIs',
            description: 'SafeBike Rwanda APIs Documentation',
            version: '0.1.0'
        },
        servers: [
            { url: 'http://localhost:5000', description: 'Development server' },
            // { url: 'https://safebikerwanda.herokuapp.com', description: 'Production server' }
        ],
    }
})

app.register(fastifySwaggerUi, {
    routePrefix: '/api-docs',
    initOAuth: {},
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
    },
    uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
})

app.register(multer.contentParser);

app.register(require("@fastify/static"), {
  root: path.join(__dirname, "uploads"),
  prefix: "/uploads/",
});



app.register(require("@fastify/cors"), {
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  allowedHeaders: "*",
});

app.register(require("./routes/welcome.routes"), { prefix: "" });
app.register(require("./routes/auth/auth.routes"), { prefix: "/api/v1" });

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
    console.log(err);
    process.exit(1);
  }
};
start();
