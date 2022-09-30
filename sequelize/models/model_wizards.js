"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        field: "id",
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      name: {
        field: "name",
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      senha: {
        field: "senha",
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "users",
    }
  );

  users.associate = function (models) {};
  return users;
};
