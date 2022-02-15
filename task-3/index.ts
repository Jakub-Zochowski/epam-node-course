import { config } from "dotenv";
config();
import { startDbConnection } from "./data-access/database";

import app from "./app";

startDbConnection();

const PORT = 3000;

app.listen(PORT, () => console.log(`The app is listening to ${PORT}`));
