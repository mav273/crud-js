'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("textos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      tipo:{
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      texto:{
        type: Sequelize.STRING(500),
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("textos");
  }
};
