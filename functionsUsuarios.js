const us = require("./sequelize/controllers/usuarios_controllers.js");
var prompt = require("prompt");

function cadastro() {
  var schema = {
    properties: {
      Username: { required: true },
      Senha: { hidden: true },
      Confirmar_senha: { hidden: true },
    },
  };

  console.log("\nDigite seu usuário e senha:");
  prompt.get(schema, async function (err, result) {
    try {
      const id = await us.verificarUsername(result.Username);
      if (result.Senha == result.Confirmar_senha) {
        if (Number.isInteger(id)) {
          throw "Nome de usuário já existe, coloque um nome diferente.";
        } else {
          us.criarUsuario(result.Username, result.Senha);
        }
      } else {
        throw "Senhas não correspondem.";
      }
    } catch (e) {
      console.error(e);
    }
  });
}

function mudarSenha(user_id) {
  prompt.start();
  prompt.get(["Senha_nova", "Confirmar_senha"], function (err, result) {
    if (err) {
      return console.error(err);
    }
    if (result.Senha_nova == result.Confirmar_senha) {
      us.atualizarSenha(user_id, result.Senha_nova);
    }
  });
}

module.exports = {
  cadastro,
  mudarSenha,
};
