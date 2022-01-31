import express from "express";
import { config } from "dotenv";
config();

import userRoutes from "./routers/user";
import groupRoutes from "./routers/group";
import authRoutes from "./routers/authentication";
import { startDbConnection } from "./data-access/database";

import LoggingService from "./services/logging";
import { AuthService } from "./services/authentication";

const logger = new LoggingService("app");

const app = express();
const PORT = 3000;

process.on("uncaughtException", logger.unhandledExceptionLogger);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

startDbConnection();

app.use("/auth", authRoutes);
app.use("/user", AuthService.authenticateToken, userRoutes);
app.use("/group", AuthService.authenticateToken, groupRoutes);

app.listen(PORT, () => console.log(`The app is listening to ${PORT}`));
