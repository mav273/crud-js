const { users } = require("../models/index.js");

async function checkUser(){
  try{
    await sequelize.query({
      `SELECT `
    })
  }
}
async function createUser(nome,senha){
  try {
    await users.create({
      nome,
      senha
      })
      console.log("Usuário criado com sucesso")
    }
    catch(e){
        console.log(e.message)
        console.log("Erro na inserção do Usuário")
    }
}

async function updatePassword(nome,senha){
  try{
    const aprovados = await sequelize.query(
      `update "users" where nome = ${nome} set senha ='${senha}'`
    )
    console.log("Senha alterada! :)")
  }
  catch(e){
      console.log(e.message)
      console.log("Erro ao atualizar senha!")
  }
}