const { DataTypes } = require("sequelize");

import { sequelize } from "../data-access/database";

const UserGroup = sequelize.define(
  "user_group",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    group_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

export { UserGroup };
