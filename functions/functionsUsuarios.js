const us = require("../sequelize/controllers/usuarios_controllers.js");
var readlineSync = require("readline-sync");

console.log("\nDigite seu usuário e senha:\n");

class user {
  constructor(username, senha) {
    this.username = username;
    this.senha = senha;
  }
  async login() {
    const id = await us.verificarUsuario(this.username, this.senha);
    if (!isNaN(id)) {
      console.log(id);
    } else {
      throw "Usuário ou Senha incorretos ou não cadastrados";
    }
  }
  async cadastrar() {
    let ver = await us.verificarUsername(this.username);
    console.log(ver);
    if (isNaN(ver)) {
      await us.criarUsuario(this.username, this.senha);
    } else {
      throw "Usuário já existe";
    }
  }
}

class mudarsenha extends user {
  constructor(senha, senha_nova) {
    super(senha);
    this.senha_nova = senha_nova;
  }
  async atualizar(user_id) {
    await us.atualizarSenha(user_id, this.senha_nova);
  }
}

// module.exports = {
// };

var un = readlineSync.question("Nome de Usuário: ");
var pwd = readlineSync.question("Senha: ", { hideEchoBack: true });

const u1 = new user(un, pwd).cadastrar();
