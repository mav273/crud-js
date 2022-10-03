const txt = require("./sequelize/controllers/textos_controllers.js");
var prompt = require("prompt");

function criarAnotacao(user_id) {
  prompt.start();
  prompt.get(["Título", "Texto"], async function (err, result) {
    try {
      const existe = await txt.verificarTexto(result.Título, user_id);
      if (err) {
        return onErr(err);
      }
      if (Number.isInteger(existe)) {
        throw "Título já existe, faça uma anotação com um título novo.";
      } else {
        txt.createTexto(result.Título, result.Texto, user_id);
      }
    } catch (e) {
      console.error(e.message);
    }
  });
}
function deletarAnotacao(user_id) {
  txt.buscarTitulos(user_id);

  prompt.start();
  prompt.get(["Título"], function (err, result) {
    if (err) {
      return onErr(err);
    }
    txt.deletarTexto(result.Título);
  });
}

function menuAn(user_id) {
  console.log(
    "Digite sua opção:\n1 - Criar anotação\n2 - Consultar todas anotações\n3 - Consultar anotação por titulo\n4 - Atualizar anotação\n5 - Deletar anotação"
  );

  prompt.start();
  prompt.get(["Opção"], async function (err, result) {
    try {
      if (err) {
        return onErr(err);
      }
      if (result.Opção == 1) {
        criarAnotacao(user_id);
      } else if (result.Opção == 5) {
        deletarAnotacao(user_id);
      }
    } catch (e) {
      console.error(e.message);
    }
  });
}

module.exports = {
  criarAnotacao,
  menuAn,
};
