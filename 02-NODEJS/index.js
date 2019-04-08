/*
    0 Obter usuário
    1 Obter o número de telefone de um usuário a partir de seu ID
    2 Obter o endereço do usuário pelo ID
*/
// importamos um módulo interno do node.js
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  // quando erro    -> reject(ERRO)
  // quando success -> resolve
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      // return reject(new Error("Deu ruim de verdade"));

      return resolve({
        id: 1,
        nome: "Fernando",
        dataNascimento: new Date()
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "87879898",
        ddd: 11
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "Largo Redentor",
      numero: 46
    });
  }, 2000);
}

const usuarioPromise = obterUsuario();
// para manipular o sucesso usamos a função .then
// para manipular erros usamos o .catch
// usuario -> telefone -> telefone
usuarioPromise
  .then(function(usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id
        },
        telefone: result
      };
    });
  })
  .then(function(resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      };
    });
  })
  .then(function(resultado) {
    console.log(`
      Nome: ${resultado.usuario.nome}
      Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
      Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `);
  })
  .catch(function(error) {
    console.log("Deu ruim", error);
  });
