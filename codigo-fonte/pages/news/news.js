// Pega a URL atual
const url = new URL(window.location.href);

// Usa URLSearchParams para obter o valor do parâmetro "id"
const params = new URLSearchParams(url.search);
const id = params.get("id"); // 'id' é o nome do parâmetro na URL

const noticiasJSON = localStorage.getItem("db_noticias");
const db_noticias = JSON.parse(noticiasJSON);

function converterData(timestamp) {
  const date = new Date(timestamp * 1000);

  // Obter partes da data
  const dia = date.getDate().toString().padStart(2, "0");
  const mes = (date.getMonth() + 1).toString().padStart(2, "0"); // Meses começam do 0
  const ano = date.getFullYear();
  const hora = date.getHours().toString().padStart(2, "0");
  const minuto = date.getMinutes().toString().padStart(2, "0");
  const segundos = date.getSeconds().toString().padStart(2, "0");

  // Formatar a data e hora
  const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}`;
  return `Publicado em: ${dataFormatada}`;
}

function exibirNoticia() {
  // Encontra a notícia com o id correspondente
  const noticia = db_noticias.noticias.find((n) => n.id == id);

  // Exibe a notícia no console (ou pode usá-la como quiser)
  if (!noticia) {
    console.error("Notícia não encontrada");
  }

  var imagemNoticia = document.getElementById("imagem-noticia");
  var tituloNoticia = document.getElementById("titulo-noticia");
  var conteudoNoticia = document.getElementById("texto-noticia");
  var dataNoticia = document.getElementById("data-noticia");

  const imagem = "../../" + noticia.imagem;

  imagemNoticia.setAttribute("src", imagem);
  tituloNoticia.innerHTML = noticia.titulo;
  conteudoNoticia.innerHTML = noticia.conteudo;

  let data = converterData(noticia.timestamp);

  dataNoticia.innerHTML = data;

}

exibirNoticia();
