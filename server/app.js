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

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router);
app.use(NotFoundHandler);
app.use(errorLogger);
app.use(errorHandler);

export default app