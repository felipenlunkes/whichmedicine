// Se o usuário já está logado, deve redirecionar para a tela correta

var usuarioJSON = sessionStorage.getItem("usuarioAtual");
var usuario = JSON.parse(usuarioJSON);

    if (usuario) {

        if (usuario.eAdmin) {

            window.location.href = "../adm/adm.html";

        } else {

            window.location.href = "../profile/profile.html";

        }
    }