const { DataTypes } = require("sequelize");

import { sequelize } from "../data-access/database";

const Group = sequelize.define(
  "group",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    timestamps: false,
  }
);

export { Group };
