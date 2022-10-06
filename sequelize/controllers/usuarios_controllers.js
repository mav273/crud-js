const { usuarios, sequelize } = require("../models/index.js");

//Verifica se o usuário existe e se a senha inserida é correta
async function verificarUsuario(nome, senha) {
  try {
    const id = await usuarios.findOne({ where: { nome: nome, senha: senha } });
    return id.dataValues.id;
  } catch (e) {
    console.error(e);
  }
}
//Verifica se o nome usado ao fazer o cadastro já existe
async function verificarUsername(nome) {
  try {
    const id = await usuarios.findOne({ where: { nome: nome } });
    return id.dataValues.id;
  } catch (e) {
    return e;
  }
}
//Cria o usuário
async function criarUsuario(nomeu, senhau) {
  try {
    await usuarios.create({
      nome: nomeu,
      senha: senhau,
    });
    console.log("Usuário criado com sucesso.");
  } catch (e) {
    console.log(e.message);
    console.log("Erro na inserção do Usuário");
  }
}
//Atualiza a senha
async function atualizarSenha(user_id, senha) {
  try {
    await sequelize.query(
      `update "usuarios"  set senha ='${senha}' where id = ${user_id}`
    );
    console.log("Senha alterada! :)");
  } catch (e) {
    console.log(e.message);
    console.log("Erro ao atualizar senha!");
  }
}

module.exports = {
  verificarUsuario,
  verificarUsername,
  criarUsuario,
  atualizarSenha,
};
