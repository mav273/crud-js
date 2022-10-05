//const user = require("./functionsUsuarios.js");
const us = require("./sequelize/controllers/usuarios_controllers.js");
const text = require("./functions/functionsAnotacoes.js");
const txt = require("./sequelize/controllers/textos_controllers.js");
var readlineSync = require('readline-sync');
var prompt = require("prompt");

async function login(){

  console.log("\nDigite seu usuário e senha:\n");
  var username = readlineSync.question('Username: ');
  var senha    = readlineSync.question('Senha: ', {hideEchoBack: true});

  const id = await us.verificarUsuario(username, senha);

  if (Number.isInteger(id)) {
    console.log(`\n\nBem vindo(a) ${result.Username}!\n`);
    menuAn(id);
  } else {
    throw "Usuário ou Senha incorretos ou não cadastrados";
  }

}
login() 
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
  var senhas = {
    properties: {
      Senha_nova: { hidden: true },
      Confirmar_senha: { hidden: true },
    },
  };

  prompt.start();
  prompt.get(senhas, function (err, result) {
    if (err) {
      return console.error(err);
    }
    if (result.Senha_nova == result.Confirmar_senha) {
      us.atualizarSenha(user_id, result.Senha_nova);
    }
  });
}
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
        mudarSenha(user_id);
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
      cadastro();
    }
    if (result.Escolha == 2) {
      login()
    }
  });
}
