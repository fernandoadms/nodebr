/*
    0 Obter usuário
    1 Obter o número de telefone de um usuário a partir de seu ID
    2 Obter o endereço do usuário pelo ID
*/

function obterUsuario(callback) {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      nome: "Fernando",
      dataNascimento: new Date()
    });
  }, 1000);
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: "87879898",
      ddd: 11
    });
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "Largo Redentor",
      numero: 46
    });
  }, 2000);
}

obterUsuario(function resolverUsuario(error, usuario) {
  //null || "" || 0 === false
  if (error) {
    console.log("Erro no usuário: ", error);
    return;
  }

  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.log("Erro no telefone: ", error1);
      return;
    }

    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.log("Erro no telefone: ", error2);
        return;
      }

      console.log(`
        Nome: ${usuario.nome},
        Endereco: ${endereco.rua}, ${endereco.numero}
        Telefone: (${telefone.ddd}) ${telefone.telefone}
      `);
    });
  });
});
