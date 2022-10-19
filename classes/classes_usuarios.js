const us = require("../sequelize/controllers/usuarios_controllers.js");

class usuario {
  constructor(username = null, senha) {
    this.username = username;
    this.senha = senha;
  }
  async login() {
    try {
      const id = await us.verificarUsuario(this.username, this.senha);
      if (id != null) {
        return id;
      } else {
        throw "Usuário ou Senha incorretos ou não cadastrados";
      }
    } catch (e) {
      console.error(e);
    }
  }
  async cadastrar() {
    try {
      let ver = await us.verificarUsername(this.username);
      if (ver == null) {
        await us.criarUsuario(this.username, this.senha);
      } else {
        throw "Usuário já existe";
      }
    } catch (e) {
      console.error(e);
    }
  }
  async mudarsenha(user_id) {
    try {
      await us.atualizarSenha(user_id, this.senha);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = {
  usuario,
};
