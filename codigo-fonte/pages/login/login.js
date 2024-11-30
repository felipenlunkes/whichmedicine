function processarLogin(event) {
  // Cancela a submissão do formulário para tratar sem fazer refresh da tela
  event.preventDefault();

  // Obtem os dados de login e senha a partir do formulário de login
  var username = document.getElementById("email").value;
  var password = document.getElementById("senha").value;

  var incorrectLogin = document.getElementById("init-wrong-password");

  var dadosPresentes = true;
  if (!username) {
    incorrectLogin.innerHTML = "Email inválido!";
    incorrectLogin.style.display = "block";
    dadosPresentes = false;
  }

  if (username && !password) {
    incorrectLogin.innerHTML = "Senha inválida!";
    incorrectLogin.style.display = "block";
    dadosPresentes = false;
  }

  if (dadosPresentes) {
    // Valida login. Redireciona para tela de usuário comum ou administrador, a depender do caso
    resultadoLogin = loginUsuario(username, password);

    if (resultadoLogin) {
      if (resultadoLogin.eAdmin) {
        window.location.href = "../adm/adm.html";
      } else {
        window.location.href = "../profile/profile.html";
      }
    } else {
      // Se usuário/senha incorretos, habilitar mensagem
      incorrectLogin.style.display = "block";
      incorrectLogin.innerHTML = "Email ou senha incorretos!";
    }
  }
}

function loginUsuario(login, senha) {
  var usuariosJSON = localStorage.getItem("db_usuarios");
  var db_usuarios = JSON.parse(usuariosJSON);

  // Localiza o usuário na base de dados

  for (var i = 0; i < db_usuarios.usuarios.length; i++) {
    var usuario = db_usuarios.usuarios[i];

    // Se encontrou, carrega o usuário e persiste no sessionStorage
    if (login == usuario.email && senha == usuario.senha) {
      var usuarioAtual = { ...usuarioAtual, ...usuario };
      usuarioAtual.senha = null;

      // Salva os dados do usuário corrente no sessionStorage, mas antes converte para string
      sessionStorage.setItem("usuarioAtual", JSON.stringify(usuarioAtual));

      // Retorna o usuário
      return usuarioAtual;
    }
  }

  // Se o usuário não foi encontrado, retorna null
  return null;
}

function irParaCadastro() {
  window.location.href = "../register/register.html";
}

// Associa a funçao processarLogin  formulário adicionado um manipulador do evento submit
document
  .getElementById("register-btn")
  .addEventListener("click", irParaCadastro);
document
  .getElementById("login-form")
  .addEventListener("submit", processarLogin);
