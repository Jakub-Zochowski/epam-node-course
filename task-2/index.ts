import express from "express";

import userRoutes from "./user-routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`The app is listening to ${PORT}`));
