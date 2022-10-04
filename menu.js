const user = require("./functionsUsuarios.js");
const us = require("./sequelize/controllers/usuarios_controllers.js");
const text = require("./functionsAnotacoes.js");
const txt = require("./sequelize/controllers/textos_controllers.js");

var prompt = require("prompt");

function menuAn(user_id) {
  console.log(
    "Digite sua opção:\n1 - Criar anotação\n2 - Consultar todas anotações\n3 - Consultar titulos\n4 - Consultar anotações por titulo\n5 - Atualizar anotação\n6 - Deletar anotação\n7 - Atualizar senha"
  );

  prompt.start();
  prompt.get(["Opção"], async function (err, result) {
    try {
      if (err) {
        return console.error(err);
      }
      if (result.Opção == 1) {
        text.criarAnotacao(user_id);
      } else if (result.Opção == 2) {
        txt.buscarTextos(user_id);
      } else if (result.Opção == 3) {
        txt.buscarTitulos(user_id);
      } else if (result.Opção == 4) {
        txt.consultarTitulo(user_id);
      } else if (result.Opção == 5) {
        text.alterarAnotacao(user_id);
      } else if (result.Opção == 6) {
        text.deletarAnotacao(user_id);
      } else if (result.Opção == 7) {
        user.mudarSenha(user_id);
      }
    } catch (e) {
      console.error(e.message);
    }
  });
}

function menuUs() {
  console.log("Login/Cadastro de Usuário\n");
  console.log("Digite sua opção:\n1 - Cadastro\n2 - Login");

  prompt.start();
  prompt.get(["Escolha"], async function (err, result) {
    if (err) {
      return console.error(err);
    }
    if (result.Escolha == 1) {
      user.cadastro();
    }
    if (result.Escolha == 2) {
      var credenciais = {
        properties: {
          Username: { required: true },
          Senha: { hidden: true },
        },
      };
      console.log("\nDigite seu usuário e senha:\n");
      prompt.get(credenciais, async function (err, result) {
        try {
          const id = await us.verificarUsuario(result.Username, result.Senha);
          if (Number.isInteger(id)) {
            console.log(`\n\nBem vindo(a) ${result.Username}!\n`);
            menuAn(id);
          } else {
            throw "Usuário ou Senha incorretos ou não cadastrados";
          }
        } catch (e) {
          console.error(e);
        }
      });
    }
  });
}
menuUs();
