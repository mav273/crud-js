const { Console } = require('console');
var prompt = require('prompt')
const readline = require('readline');
var readlineSync = require('readline-sync');


function user(){
    var schema = {
        properties:{
            Username:{
                required: true
            },
            Senha: {
                hidden:true
            }
        } 
    }

    console.log("Login/Cadastro de Usuário\n")
    console.log("Digite sua opção:\n1 - Cadastro\n2 - Login\n")
    prompt.start();

    prompt.get(['Escolha'], function (err, result) {
        if (err) {
            return onErr(err);
        }

        if(result.Escolha == 2){
            console.log("\n\nDigite seu usuário e senha:\n")
            prompt.get(schema, function (err, result) {
                if (result.Username == 'admin'){
                    console.log('  name: ' + result.Username);
                    console.log('  password: ' + result.Senha);

                        
                }
        
            });
        }
    });

}

user()