const txt = require("../sequelize/controllers/textos_controllers.js");

class anotacao {
  constructor(
    titulo = null,
    texto = null,
    titulo_novo = null,
    texto_novo = null
  ) {
    this.titulo = titulo;
    this.texto = texto;
    this.titulo_novo = titulo_novo;
    this.texto_novo = texto_novo;
  }
  async criar(user_id) {
    try {
      let verificar = await txt.verificarTitulo(this.titulo, user_id);
      if (isNaN(verificar)) {
        txt.criarAnotacao(this.titulo, this.texto, user_id);
      } else {
        throw "Você já possui uma anotação com esse título!";
      }
    } catch (e) {
      console.error(e);
    }
  }

  async deletar(user_id) {
    try {
      await txt.deletarAnotacao(this.titulo, user_id);
    } catch (e) {
      console.error(e);
    }
  }

  async atualizar(user_id) {
    try {
      let tt_antigo = await txt.verificarTitulo(this.titulo, user_id);
      if (!isNaN(tt_antigo)) {
        let tt_novo;
        if (isNaN(tt_novo)) {
          txt.criarAnotacao(
            this.titulo,
            user_id,
            this.titulo_novo,
            this.texto_novo
          );
        } else {
          throw "Você já possui uma anotação com esse título!";
        }
      } else {
        throw "Anotação com título digitado não existe";
      }
    } catch (e) {
      console.error(e);
    }
  }

  async consultarTitulo(user_id) {
    try {
      txt.buscarTitulos(user_id);
    } catch (e) {
      console.error(e);
    }
  }

  async consultarAnotacao(user_id) {
    try {
      txt.buscarAnotacao(this.titulo, user_id);
    } catch (e) {
      console.error(e);
    }
  }

  async consultarAnotacoes(user_id) {
    try {
      txt.buscarAnotacoes(user_id);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = {
  anotacao,
};
