"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "textos",
      [
        {
          titulo: "Lista de Compras",
          texto: "[x] Pão\n[ ] Ovos",
          user_id: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("textos", null, {});
  },
};
