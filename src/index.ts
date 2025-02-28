require("dotenv").config();
import fastify from "fastify";
import { connectDB } from "./db-connect";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
export const app = fastify();
const PORT = parseInt(process.env.PORT) || 5000;
const path = require("path");
const multer = require("fastify-multer");
const BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://safebike.onrender.com'  // Updated production URL
    : `http://localhost:${PORT}`;
app.register(fastifySwagger, {
    mode: 'dynamic',
    openapi: {
        info: {
            title: 'SafeBike Rwanda APIs',
            description: 'SafeBike Rwanda APIs Documentation',
            version: '0.1.0'
        },
        servers: [
          {
              url: BASE_URL,
              description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
          }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    }
})

app.register(fastifySwaggerUi, {
    routePrefix: '/api-docs',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
        persistAuthorization: true,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
          next();
      },
      preHandler: function (request, reply, next) {
          next();
      }
  },
    staticCSP: true,
    transformStaticCSP: (header) => header,
})

app.register(require("@fastify/cors"), {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
});

app.register(multer.contentParser);

app.register(require("@fastify/static"), {
  root: path.join(__dirname, "uploads"),
  prefix: "/uploads/",
});



app.register(require("./routes/welcome.routes"), { prefix: "" });
app.register(require("./routes/auth/auth.routes"), { prefix: "/api/v1" });
app.register(require("./routes/package.routes"), { prefix: "/api/v1" });

const start = async () => {
  try {
    await app.listen({
      port: PORT,
      host: "0.0.0.0",
    });
    console.log("Server is running on port: ", PORT);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Swagger documentation available at: ${
      process.env.NODE_ENV === 'production'
          ? 'https://safebike-rwanda.onrender.com/api-docs'
          : `http://localhost:${PORT}/api-docs`
  }`);
    await connectDB();
  } catch (err) {
    app.log.error(err);
    console.log(err);
    process.exit(1);
  }
};
start();
