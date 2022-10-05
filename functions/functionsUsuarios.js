const us = require("../sequelize/controllers/usuarios_controllers.js");
var readlineSync = require('readline-sync');


console.log("\nDigite seu usuário e senha:\n");

class user {
  constructor(username, senha) {
    this.username = username;
    this.senha = senha;
  }
  async login(){
    const id = await us.verificarUsuario(this.username,this.senha)
    if (!(isNaN(id))) {
      console.log(id) 
    } else {
      throw "Usuário ou Senha incorretos ou não cadastrados";
    }
  
  }
  async cadastrar(){
    let ver = await us.verificarUsername(this.username)
    if(NaN(ver)){
      us.criarUsuario(this.username,this.senha)
    }
  }  
}

class mudarsenha extends user{
  constructor(senha_nova) {
    this.senha_nova = senha_nova;
  }
    //us.atualizarSenha()
}

module.exports = {

};

var un = readlineSync.question('Nome de Usuário: ');
var pwd    = readlineSync.question('Senha: ', {hideEchoBack: true});

const u1 = new user(un,pwd).login()