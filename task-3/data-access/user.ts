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

export { sequelize };
