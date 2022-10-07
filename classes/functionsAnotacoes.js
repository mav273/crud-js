const txt = require("../sequelize/controllers/textos_controllers.js");
var prompt = require("prompt");

// function criarAnotacao(user_id) {
//   prompt.start();
//   prompt.get(["Título", "Texto"], async function (err, result) {
//     try {
//       const existe = await txt.verificarTitulo(result.Título, user_id);
//       if (err) {
//         return console.error(err);
//       }
//       if (Number.isInteger(existe)) {
//         throw "Título já existe, faça uma anotação com um título novo.";
//       } else {
//         txt.criarAnotacao(result.Título, result.Texto, user_id);
//       }
//     } catch (e) {
//       console.error(e.message);
//     }
//   });
// }

// function deletarAnotacao(user_id) {
//   prompt.start();
//   prompt.get(["Título"], function (err, result) {
//     if (err) {
//       return console.error(err);
//     }
//     txt.deletarTexto(result.Título, user_id);
//   });
// }

// function consultarTitulo(user_id) {
//   prompt.start();
//   prompt.get(["Título"], function (err, result) {
//     if (err) {
//       return console.error(err);
//     }
//     txt.buscarTexto(result.Título, user_id);
//   });
// }

// function alterarAnotacao(user_id) {
//   prompt.start();
//   prompt.get(
//     ["Título_antigo", "Título_novo", "Texto_novo"],
//     function (err, result) {
//       const existe = txt.verificarTitulo(result.Título_novo, user_id);
//       if (err) {
//         return console.error(err);
//       }
//       if (Number.isInteger(existe)) {
//         throw "Já existe um texto com esse titulo.";
//       }
//       else{
//         txt.atualizarTexto(
//             result.Título_antigo,
//             user_id,
//             result.Título_novo,
//             result.Texto_novo
//           );
//       }
//     }
//   );
// }

class anotacao {
  constructor({ titulo = null,texto = null, titulo_novo = null,texto_novo = null }) {
    this.titulo = titulo;
    this.texto = texto;
    this.titulo_novo = titulo_novo;
    this.texto_novo = texto_novo
  }
  async criar(user_id) {
    try{
      let verificar = await txt.verificarTitulo(this.titulo,user_id)
      if (isNaN(verificar)){
        txt.criarAnotacao(this.titulo,this.texto,user_id)
      }
      else{ throw "Você já possui uma anotação com esse título!" }
    } catch(e) { console.error(e) }
  }

  async deletar(user_id){
    try{  
      await txt.deletarAnotacao(this.titulo,user_id)
    } catch(e){ console.error(e) }
  }

  async atualizar(user_id) {
    try{
      let tt_antigo = await txt.verificarTitulo(this.titulo,user_id)
      if (!(isNaN(tt_antigo))){  
        let tt_novo
        if (isNaN(tt_novo)){
          txt.criarAnotacao(this.titulo,user_id,this.titulo_novo,this.texto_novo)
        }
        else{ throw "Você já possui uma anotação com esse título!" }
      }
      else{ throw "Anotação com título digitado não existe" }
    } catch(e) { console.error(e) }
  }
   
  async consultarTitulo(user_id) {
    try{
      txt.buscarTitulos(user_id)
    } catch(e) { console.error(e) }
  }

  async consultarAnotacao(user_id) {
    try{
      txt.buscarTitulos(user_id)
    } catch(e) { console.error(e) }
  }

  async consultarAnotacoes(user_id) {
    try{
      txt.buscarTitulos(user_id)
    } catch(e) { console.error(e) }
  }

}

module.exports = {
  criarAnotacao,
  deletarAnotacao,
  consultarTitulo,
  alterarAnotacao,
};
