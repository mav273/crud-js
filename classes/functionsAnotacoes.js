const txt = require("../sequelize/controllers/textos_controllers.js");
var prompt = require("prompt");

function criarAnotacao(user_id) {
  prompt.start();
  prompt.get(["Título", "Texto"], async function (err, result) {
    try {
      const existe = await txt.verificarTexto(result.Título, user_id);
      if (err) {
        return console.error(err);
      }
      if (Number.isInteger(existe)) {
        throw "Título já existe, faça uma anotação com um título novo.";
      } else {
        txt.criarTexto(result.Título, result.Texto, user_id);
      }
    } catch (e) {
      console.error(e.message);
    }
  });
}

function deletarAnotacao(user_id) {
  prompt.start();
  prompt.get(["Título"], function (err, result) {
    if (err) {
      return console.error(err);
    }
    txt.deletarTexto(result.Título, user_id);
  });
}

function consultarTitulo(user_id) {
  prompt.start();
  prompt.get(["Título"], function (err, result) {
    if (err) {
      return console.error(err);
    }
    txt.buscarTexto(result.Título, user_id);
  });
}

function alterarAnotacao(user_id) {
  prompt.start();
  prompt.get(
    ["Título_antigo", "Título_novo", "Texto_novo"],
    function (err, result) {
      const existe = txt.verificarTexto(result.Título_novo, user_id);
      if (err) {
        return console.error(err);
      }
      if (Number.isInteger(existe)) {
        throw "Já existe um texto com esse titulo.";
      }
      else{
        txt.atualizarTexto(
            result.Título_antigo,
            user_id,
            result.Título_novo,
            result.Texto_novo
          );
      }
    }
  );
}
module.exports = {
  criarAnotacao,
  deletarAnotacao,
  consultarTitulo,
  alterarAnotacao,
};
