const { usuario } = require("./classes/classes_usuarios");
const { anotacao } = require("./classes/classes_anotacoes.js");
var readlineSync = require("readline-sync");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function menuUs() {
  console.log("Login/Cadastro de Usuário\n");
  console.log("Digite o número de sua opção:\n1 - Login\n2 - Cadastro");
  const escolha = readlineSync.question("Escolha:  ");

  if (escolha == 1) {
    let username = readlineSync.question("\nUSER: ");
    let senha = readlineSync.question("SENHA: ", { hideEchoBack: true });
    const user_id = await new usuario(username, senha).login();

    if (!isNaN(user_id)) {
      await menuAnotacoes(user_id);
    }
  }
  else if (escolha == 2) {
    let username = readlineSync.question("\nUSER: ");
    let senha = readlineSync.question("SENHA: ", { hideEchoBack: true });
    let senha_re = readlineSync.question("DIGITE A SENHA DE NOVO: ", {
      hideEchoBack: true,
    });

    if (senha == senha_re) {
      await new usuario(username, senha).cadastrar();
    } else {
      throw "Senhas não correspondem";
    }
  }
}

async function menuAnotacoes(user_id) {
  await delay(5000);
  console.log("\nLogin/Cadastro de Usuário\n");
  console.log(
    "Digite sua opção:\n1 - Criar anotação\n2 - Consultar todas anotações\n3 - Consultar titulos\n4 - Consultar anotações por titulo\n5 - Atualizar anotação\n6 - Deletar anotação\n7 - Atualizar senha"
  );

  const número = readlineSync.question("Escolha:  ");
  if (número == 1) {
    let titulo = readlineSync.question("\nTITULO: ");
    let texto = readlineSync.question("TEXTO: ");
    await new anotacao(titulo, texto).criar(user_id);
    await menuAnotacoes(user_id);

  } else if (número == 2) {
    await new anotacao().consultarAnotacoes(user_id);
    await menuAnotacoes(user_id);

  } else if (número == 3) {
    await new anotacao().consultarTitulo(user_id);
    await menuAnotacoes(user_id);

  } else if (número == 4) {
    let titulo = readlineSync.question("\nTITULO: "); 
    await new anotacao(titulo).consultarAnotacao(user_id);
    await menuAnotacoes(user_id);

  } else if (número == 5) {
    let titulo = readlineSync.question("\nTITULO ANTIGO: ");
    let ttnovo = readlineSync.question("\nTITULO NOVO: ");
    let txtnovo = readlineSync.question("\nTEXTO NOVO: ");
    await new anotacao(titulo, null, ttnovo, txtnovo).atualizar(user_id);
    await menuAnotacoes(user_id);

  } else if (número == 6) {
    let titulo = readlineSync.question("\nTITULO: ");
    await new anotacao(titulo).deletar(user_id);
    await menuAnotacoes(user_id);

  } else if (número == 7) {
    let nsenha = readlineSync.question("\nSENHA NOVA: ");
    await new usuario(null, nsenha).mudarsenha(user_id);
    await menuAnotacoes(user_id);
  }
}

menuUs();
