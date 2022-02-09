import express from "express";

import userRoutes from "./routers/user";
import groupRoutes from "./routers/group";
import authRoutes from "./routers/authentication";

import LoggingService from "./services/logging";
import { AuthService } from "./services/authentication";

const logger = new LoggingService("app");

const app = express();

process.on("uncaughtException", logger.unhandledExceptionLogger);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);


app.use("/auth", authRoutes);
app.use("/user", AuthService.authenticateToken, userRoutes);
app.use("/group", AuthService.authenticateToken, groupRoutes);

export default app;