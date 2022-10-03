
const us  = require('./sequelize/controllers/usuarios_controllers.js')
const funcAn  = require('./functionsAnotacoes.js')
var prompt = require('prompt')


function login(){
    var schema = {
        properties:{
            Username:{required: true},
            Senha: {hidden:true}
        } 
    }

    console.log("\nDigite seu usuário e senha:\n")
    prompt.get(schema, async function (err, result) {

        try{
            const id = await us.verificarUsuario(result.Username,result.Senha)
            if (Number.isInteger(id)){
                console.log(`\n\nBem vindo(a) ${result.Username}!\n`)
                funcAn.menuAn(id)
            }
            else { throw "Usuário ou Senha incorretos ou não cadastrados" }
        }
        catch(e){ console.error(e.message) }
    });
}

function cadastro(){
    var schema = {
        properties:{
            Username:{required: true},
            Senha: {hidden:true},
            Confirmar_senha: {hidden:true}
        } 
    }

    console.log("\nDigite seu usuário e senha:")
    prompt.get(schema, async function (err, result) {
        try{
            const id = await us.verificarUsername(result.Username)
            if (result.Senha == result.Confirmar_senha){
                if (Number.isInteger(id)){
                    throw "Nome de usuário já existe, coloque um nome diferente."
                }
                else { 
                    us.criarUsuario(result.Username,result.Senha)
                }
            }
            else{ throw 'Senhas não correspondem.' }
        }
        catch(e){ console.error(e) }
    });
}

function menuUs(){
    console.log("Login/Cadastro de Usuário\n")
    console.log("Digite sua opção:\n1 - Cadastro\n2 - Login")

    prompt.start();
    prompt.get(['Escolha'], function (err, result) {
        if (err) {
            return onErr(err);
        }
        if(result.Escolha == 1){
            cadastro()
        }
        if(result.Escolha == 2){
            login()
        }
    });

}
menuUs()
module.exports = {
    login,
    cadastro
}