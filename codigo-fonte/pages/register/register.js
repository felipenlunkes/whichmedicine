const COR_PADRAO = "#DDDDDD";
var modal = document.getElementById("modal-cadastro");

function validarAtributos(
  nome,
  sobrenome,
  dia,
  mes,
  ano,
  genero,
  email,
  senha
) {
  var atributoNome = document.getElementById("nome");
  var atributoSobrenome = document.getElementById("sobrenome");
  var atributoDia = document.getElementById("dia");
  var atributoMes = document.getElementById("mes");
  var atributoAno = document.getElementById("ano");
  var atributoGenero = document.getElementById("genero");
  var atributoEmail = document.getElementById("email");
  var atributoSenha = document.getElementById("senha");

  atributoNome.style.borderColor = COR_PADRAO;
  atributoSobrenome.style.borderColor = COR_PADRAO;
  atributoDia.style.borderColor = COR_PADRAO;
  atributoMes.style.borderColor = COR_PADRAO;
  atributoAno.style.borderColor = COR_PADRAO;
  atributoEmail.style.borderColor = COR_PADRAO;
  atributoSenha.style.borderColor = COR_PADRAO;

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
  if (!email) {
    atributoEmail.style.borderColor = "red";
    atributoEmail.placeholder = "Email é obrigatório";
    valido = false;
  }
  if (!senha) {
    atributoSenha.style.borderColor = "red";
    atributoSenha.placeholder = "Senha é obrigatório";
    valido = false;
  }

  return valido;
}

function criarCadastro(nome, sobrenome, dia, mes, ano, genero, email, senha) {
  var usuariosJSON = localStorage.getItem("db_usuarios");
  var db_usuarios = JSON.parse(usuariosJSON);

  // Verificar se já existe outro usuário com o mesmo email
  for (var i = 0; i < db_usuarios.usuarios.length; i++) {
    var usuario = db_usuarios.usuarios[i];
    if (email === usuario.email) {
      exibirModal("modal-email-cadastrado");
      return false;
    }
  }

  let idUsuario = db_usuarios.usuarios.length + 1;

  let novoUsuario = {
    id: idUsuario,
    nome: nome,
    sobrenome: sobrenome,
    dia: dia,
    mes: mes,
    ano: ano,
    genero: genero,
    email: email,
    senha: senha,
  };

  db_usuarios.usuarios.push(novoUsuario);

  localStorage.setItem("db_usuarios", JSON.stringify(db_usuarios));

  return true;
}

function cadastrar() {

  ocultarModal("modal-email-cadastrado");
  
  var nome = document.getElementById("nome").value;
  var sobrenome = document.getElementById("sobrenome").value;
  var dia = document.getElementById("dia").value;
  var mes = document.getElementById("mes").value;
  var ano = document.getElementById("ano").value;
  var genero = document.getElementById("genero").value;
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  var valido = validarAtributos(
    nome,
    sobrenome,
    dia,
    mes,
    ano,
    genero,
    email,
    senha
  );

  if (valido) {
    var resultado = criarCadastro(
      nome,
      sobrenome,
      dia,
      mes,
      ano,
      genero,
      email,
      senha
    );
    if (resultado) {
      exibirModal("modal-cadastro");
    } else {
      ocultarModal("modal-cadastro");
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

document.getElementById("cadastrar-btn").addEventListener("click", cadastrar);
