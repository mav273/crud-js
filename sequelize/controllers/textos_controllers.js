const { textos, sequelize } = require("../models/index.js");

async function verificarTexto(titulo, user_id) {
  try {
    const id = await textos.findOne({
      where: { titulo: titulo, user_id: user_id },
    });
    return id.dataValues.id;
  } catch (e) {
    return e.message;
  }
}
async function deletarTexto(titulo, user_id) {
  try {
    await textos.destroy({
      where: {
        titulo: titulo,
        user_id: user_id
      },
    });
    console.log("Anotação deletada com sucesso");
  } catch (e) {
    console.log(e.message);
    console.log("Erro ao deletar anotação");
  }
}

async function buscarTitulos(user_id) {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT titulo FROM textos WHERE user_id = ${user_id}`
    );
    for (titulos of results) {
      console.log("Textos por título do usuário:\n" + titulos.titulo);
    }
  } catch (e) {
    return e;
  }
}
async function createTexto(titulo, texto, user_id) {
  try {
    await textos.create({
      titulo: titulo,
      texto: texto,
      user_id: user_id,
    });
    console.log("Anotação criada com sucesso");
  } catch (e) {
    console.log(e.message);
    console.log("Erro na inserção da anotação");
  }
}

module.exports = {
  createTexto,
  deletarTexto,
  verificarTexto,
  buscarTitulos,
};
