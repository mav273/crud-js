const { usuarios } = require("../models/index.js");

async function verificarUsuario(nome,senha){
  try{
    const id = await usuarios.findOne({ where: { nome: nome,senha: senha} });
    return id.dataValues.id
  }
  catch(e){
    return e.message 
  }
}

async function verificarUsername(nome){
  try{
    const id = await usuarios.findOne({ where: { nome: nome} });
    return id.dataValues.id
  }
  catch(e){
    return e.message 
  }
}

async function criarUsuario(nomeu,senhau){
  try {
    await usuarios.create({
      nome: nomeu,
      senha: senhau
      })
      console.log("Usuário criado com sucesso.")
    }
    catch(e){
        console.log(e.message)
        console.log("Erro na inserção do Usuário")
    }
}

async function updatePassword(nome,senha){
  try{
    const aprovados = await sequelize.query(
      `update "usuarios" where nome = ${nome} set senha ='${senha}'`
    )
    console.log("Senha alterada! :)")
  }
  catch(e){
      console.log(e.message)
      console.log("Erro ao atualizar senha!")
  }
}
module.exports = {
  verificarUsuario,
  verificarUsername,
  criarUsuario
}
