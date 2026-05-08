import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import router from "./routes/router.js";
import { errorLogger } from "./middlewaress/errorLogger.js";
import { NotFoundHandler } from "./middlewaress/notFoundHandler.js";
import { errorHandler } from "./middlewaress/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from './swagger.js';

dotenv.config();

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación de API Sweet Medical',
      version: '1.0.0',
      description: 'Desarrollo de Software',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router);
app.use(NotFoundHandler);
app.use(errorLogger);
app.use(errorHandler);

export default app