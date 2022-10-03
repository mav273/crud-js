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
        {
          titulo: "Bom dia",
          texto: "são exatamente 8:15 da manhâ o dia nem começou",
          user_id: 1,
        },
        {
          titulo: "Yugioh",
          texto: "GX, 5DS, ARC V",
          user_id: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("textos", null, {});
  },
};
