const us = require("../sequelize/controllers/usuarios_controllers.js");

class user {
  constructor(username, senha) {
    this.username = username;
    this.senha = senha;
  }
  async login() {
    try{
      const id = await us.verificarUsuario(this.username, this.senha);
      if (!isNaN(id)) {
        return id;
      } else {
        throw "Usuário ou Senha incorretos ou não cadastrados";
      }
    } catch(e){ console.error(e) }
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

module.exports = {
  user,
  mudarsenha
};