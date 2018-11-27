/*
# Objetivo da aula trabalhar com callback

0-Obter um usuario
01-Obter o numero de telefone de um usuario a partir de seu Id
02-Obter o endereco do usuario pelo Id
*/

function obterUsuario(callback){
    setTimeout(function(){
        return callback(null, {
            id:1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback){
     setTimeout(function(){
        return callback(null,{
            telefone:'1199002',
            ddd: 11
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback){
     setTimeout(function(){
        return callback(null,{
           rua: 'vitoria',
           numero: 0
        })
    }, 2000)
}

function resolveUsuario(erro, usuario){
    console.log('usuario', usuario)
}

obterUsuario(function resolveUsuario(error, usuario){
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

