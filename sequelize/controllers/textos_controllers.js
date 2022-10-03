const { textos, sequelize } = require("../models/index.js");

async function verificarTexto(titulo, user_id) {
  try {
    const id = await textos.findOne({
      where: { titulo: titulo, user_id: user_id },
    });
    return id.dataValues.id;
  } catch (e) {
    console.log("Ocorreu um erro ao buscar a anotação.");
  }
}
async function deletarTexto(titulo, user_id) {
  try {
    await textos.destroy({
      where: {
        titulo: titulo,
        user_id: user_id,
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
    console.log(results);
  } catch (e) {
    return e;
  }
}
async function buscarTextos(user_id) {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT titulo,texto FROM textos WHERE user_id = ${user_id}`
    );
    console.log(results);
  } catch (e) {
    return e;
  }
}

async function buscarAnotacao(titulo, user_id) {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT titulo,texto FROM textos WHERE titulo = ${titulo} and user_id = ${user_id}`
    );
    console.log(results);
  } catch (e) {
    return e;
  }
}

async function criarTexto(titulo, texto, user_id) {
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

async function atualizarAnotacao(titulo, user_id, titulo_novo, texto_novo) {
  try {
    await sequelize.query(
      `update "textos"  set titulo ='${titulo_novo}',texto = ${texto_novo} where id = ${user_id} and titulo = ${titulo}`
    );
    console.log("Anotação alterada! :)");
  } catch (e) {
    console.log(e.message);
    console.error(
      "Erro ao atualizar a anotação! Certifique-se que o título pertence a um texto que existe"
    );
  }
}

module.exports = {
  criarTexto,
  deletarTexto,
  verificarTexto,
  buscarTitulos,
  buscarTextos,
  buscarAnotacao,
  atualizarAnotacao,
};
