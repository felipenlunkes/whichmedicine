const COR_PADRAO = "#DDDDDD";
var modal = document.getElementById("modal-cadastro");
var userId = null;

function carregarUsuario() {

  var usuarioJSON = sessionStorage.getItem('usuarioAtual');
  var usuario = JSON.parse(usuarioJSON);

  userId = usuario.id;

  var nome = document.getElementById("nome");
  var sobrenome = document.getElementById("sobrenome");
  var dia = document.getElementById("dia");
  var mes = document.getElementById("mes");
  var ano = document.getElementById("ano");
  var genero = document.getElementById("genero");
  var email = document.getElementById("email");

  nome.value = usuario.nome;
  sobrenome.value = usuario.sobrenome;
  dia.value = usuario.dia;
  mes.value = usuario.mes;
  ano.value = usuario.ano;
  genero.value = usuario.genero;
  email.value = usuario.email;

  email.setAttribute("disabled", "true");

}

function validarAtributos(
  nome,
  sobrenome,
  dia,
  mes,
  ano,
  genero,
) {
  var atributoNome = document.getElementById("nome");
  var atributoSobrenome = document.getElementById("sobrenome");
  var atributoDia = document.getElementById("dia");
  var atributoMes = document.getElementById("mes");
  var atributoAno = document.getElementById("ano");
  var atributoGenero = document.getElementById("genero");

  atributoNome.style.borderColor = COR_PADRAO;
  atributoSobrenome.style.borderColor = COR_PADRAO;
  atributoDia.style.borderColor = COR_PADRAO;
  atributoMes.style.borderColor = COR_PADRAO;
  atributoAno.style.borderColor = COR_PADRAO;

  var valido = true;

  if (!nome) {
    atributoNome.style.borderColor = "red";
    atributoNome.placeholder = "Nome é obrigatório";
    valido = false;
  }
  if (!sobrenome) {
    atributoSobrenome.style.borderColor = "red";
    atributoSobrenome.placeholder = "Sobrenome é obrigatório";
    valido = false;
  }
  if (!dia) {
    atributoDia.style.borderColor = "red";
    atributoDia.placeholder = "Dia é obrigatório";
    valido = false;
  }
  if (!mes) {
    atributoMes.style.borderColor = "red";
    atributoMes.placeholder = "Mês é obrigatório";
    valido = false;
  }
  if (!ano) {
    atributoAno.style.borderColor = "red";
    atributoAno.placeholder = "Ano é obrigatório";
    valido = false;
  }
  if (!genero) {
    atributoGenero.style.borderColor = "red";
    valido = false;
  }

  return valido;
}

function atualizarCadastro(nome, sobrenome, dia, mes, ano, genero) {
  var usuariosJSON = localStorage.getItem("db_usuarios");
  var db_usuarios = JSON.parse(usuariosJSON);

  // Encontrar o usuário pelo id
  const usuarioParaAtualizar = db_usuarios.usuarios.find(usr => usr.id === userId);

  if (usuarioParaAtualizar) {
    // Atualizar os atributos do objeto
    usuarioParaAtualizar.nome = nome;
    usuarioParaAtualizar.sobrenome = sobrenome;
    usuarioParaAtualizar.dia = dia;
    usuarioParaAtualizar.mes = mes;
    usuarioParaAtualizar.ano = ano;
    usuarioParaAtualizar.genero = genero;

    localStorage.setItem("db_usuarios", JSON.stringify(db_usuarios));

    // Atualizar os dados no sessionStorage com o usuário

    var usuarioAtual = { ...usuarioAtual, ...usuarioParaAtualizar};
    
    usuarioAtual.senha = null;

    // Salva os dados do usuário corrente no sessionStorage, mas antes converte para string
    sessionStorage.setItem("usuarioAtual", JSON.stringify(usuarioAtual));

    return true;
  }

  return false;
  
}

function atualizar() {
  
  var nome = document.getElementById("nome").value;
  var sobrenome = document.getElementById("sobrenome").value;
  var dia = document.getElementById("dia").value;
  var mes = document.getElementById("mes").value;
  var ano = document.getElementById("ano").value;
  var genero = document.getElementById("genero").value;

  var valido = validarAtributos(
    nome,
    sobrenome,
    dia,
    mes,
    ano,
    genero
  );

  if (valido) {
    var resultado = atualizarCadastro(
      nome,
      sobrenome,
      dia,
      mes,
      ano,
      genero
    );
    if (resultado) {
      exibirModal("modal-atualizar");
    } else {
      ocultarModal("modal-atualizar");
      exibirModal("modal-erro");
    }
  }
}

function exibirModal(id) {
  var modal = new bootstrap.Modal(document.getElementById(id));
  modal.show();
}

function ocultarModal(id) {
  var modal = new bootstrap.Modal(document.getElementById(id));
  modal.hide();
}

carregarUsuario();

document.getElementById("atualizar-btn").addEventListener("click", atualizar);
