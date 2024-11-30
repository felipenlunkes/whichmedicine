let versaoJSON = sessionStorage.getItem("versao");
let versao = JSON.parse(versaoJSON);

let sobreWM = document.getElementById("versao-wm");

let sobreWMComVersao = "Versão: " + versao;

sobreWM.innerHTML = sobreWMComVersao;
