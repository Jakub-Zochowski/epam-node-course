import express from "express";
import { config } from "dotenv";
config();

import userRoutes from "./routers/user";
import groupRoutes from "./routers/group";
import { startDbConnection } from "./data-access/database";

import LoggingService from "./services/logging";

const app = express();
const PORT = 3000;

process.on('uncaughtException', LoggingService.unhandledExceptionLogger);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

startDbConnection();

app.use("/user", userRoutes);
app.use("/group", groupRoutes);

app.listen(PORT, () => console.log(`The app is listening to ${PORT}`));
