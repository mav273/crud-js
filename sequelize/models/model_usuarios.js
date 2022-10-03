"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const usuarios = sequelize.define(
    "usuarios",
    {
      id: {
        field: "id",
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      nome: {
        field: "nome",
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
      tableName: "usuarios",
    }
  );

  usuarios.associate = function (models) {};
  return usuarios;
};
