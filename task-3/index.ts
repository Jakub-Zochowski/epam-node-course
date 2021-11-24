import express from "express";
import { config } from "dotenv";
config();

import userRoutes from "./routers/user";
import groupRoutes from "./routers/group";
import { startDbConnection } from "./data-access/database";

const app = express();
const PORT = 3000;

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
