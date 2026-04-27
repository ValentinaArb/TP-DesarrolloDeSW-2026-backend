import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import router from "./routes/router.js";
import { errorLogger } from "./middlewaress/errorLogger.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorLogger);

export default app

// MIN 56