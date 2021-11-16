const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("USERS", "epamadmin", "securePassword123", {
  host: "localhost",
  dialect: "postgres",
});

export { sequelize };
