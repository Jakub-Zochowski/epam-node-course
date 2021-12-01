import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD!,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

const startDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, startDbConnection };
