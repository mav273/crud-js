"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const textos = sequelize.define(
    "textos",
    {
      id: {
        field: "id",
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        field: "titulo",
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      texto: {
        field: "texto",
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      user_id: {
        field: "user_id",
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "textos",
    }
  );

  textos.associate = function (models) {};
  return textos;
};
