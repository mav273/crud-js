"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "patronuses",
      [
        {
          titulo: "Lista de Compras",
          tipo: "CheckList",
          texto: "[x] Pão\n[ ] Ovo\ns"
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("patronuses", null, {});
  },
};
