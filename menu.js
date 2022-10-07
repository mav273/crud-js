const { usuario,mudarsenha } = require("./classes/classes_usuarios");
//const us = require("./Sequelize/controllers/usuarios_controllers.js.js");
const text = require("./classes/functionsAnotacoes.js");
const txt = require("./sequelize/controllers/textos_controllers.js");
var readlineSync = require('readline-sync');
var prompt = require("prompt");

async function menuUs() {
  console.log("Login/Cadastro de Usuário\n");
  console.log("Digite o número de sua opção:\n1 - Login\n2 - Cadastro");
  const escolha = readlineSync.question('Escolha:  ');

  if (escolha == 1){
    let username = readlineSync.question('\nUSER: ');
    let senha    = readlineSync.question('SENHA: ', {hideEchoBack: true});
    const user_id = await new usuario(username,senha).login()

    if (!(isNaN(user_id))){
      menuAn(user_id)
    }
  }
  if (escolha == 2){
    let username = readlineSync.question('\nUSER: ');
    let senha    = readlineSync.question('SENHA: ', {hideEchoBack: true});
    let senha_re = readlineSync.question('DIGITE A SENHA DE NOVO: ', {hideEchoBack: true});

    if (senha == senha_re){
     await new usuario(username,senha).cadastrar()
    }
    else{
      throw 'Senhas não correspondem'
    }
  }
}

function menuAn(user_id) {
  console.log('\nBem Vindo(a)!\n')
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
        console.log('\n')
        menuAn(user_id)
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

menuUs()