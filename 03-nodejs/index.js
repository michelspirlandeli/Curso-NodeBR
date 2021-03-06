/*
# Objetivo da aula trabalhar com callback

0-Obter um usuario
01-Obter o numero de telefone de um usuario a partir de seu Id
02-Obter o endereco do usuario pelo Id
*/
//importamos um modulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
    //quando der algum problema -> reject(ERRO)
    //quando sucess -> RESOLV
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function(){
            //return reject(new Error('DEU RUIM DE VERDADE!'))
            return resolve({
                id:1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario){
     return new Promise(function resolvePromise(resolve, reject){
         setTimeout(() => {
            return resolve({
                telefone:'1199002',
                ddd: 11
            })
        }, 2000)
     })
}

function obterEndereco(idUsuario, callback){
     setTimeout(function(){
        return callback(null,{
           rua: 'vitoria',
           numero: 0
        })
    }, 2000)
}

const usuarioPromise = obterUsuario()
// para manipular o sucesso usamos a função .then
// para manipular erros, usamos o .catch
// usuario -> telefone -> telefone
usuarioPromise
    .then(function(usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return{
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function(resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return{
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function(resultado){
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
    })
    .catch(function(error){
        console.log('DEU RUIM', error)
    })

/*obterUsuario(function resolveUsuario(error, usuario){
        //null || "" || 0 === false
        if(error){
            console.log('Deu RUIM em USUARIO', error)
            return;
        }

        obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error1){
            console.log('Deu RUIM em TELEFONE', error)
            return;
        }  

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
        if(error2){
            console.log('Deu RUIM em ENDERECO', error)
            return;
        }   
            console.log(`
            Nome: ${usuario.nome},
            Endereco: ${endereco.rua}, ${endereco.numero}
            Telefone:(${telefone.ddd})${telefone.telefone}
            `)
        })
    })
})
*/
