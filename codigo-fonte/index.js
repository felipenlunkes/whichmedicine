const COR_PADRAO = "#DDDDDD";

async function obterInfoWM() {
  try {
    const response = await fetch(`VERSION`);
    let versaoWM = await response.text();

    // Filtrar apenas o valor da versão
    versaoWM = versaoWM.match(/\d+\.\d+\.\d+/)?.[0] || 'Versão não encontrada';
    
    sessionStorage.setItem("versao", JSON.stringify(versaoWM));
    
  } catch (error) {
    console.error(`Erro ao carregar a versão do Which Medicine:`, error);
  }
};

function exibirModal() {
  var modal = new bootstrap.Modal(document.getElementById("modal-erro"));
  modal.show();
};

function ocultarModal() {
  var modal = new bootstrap.Modal(document.getElementById("modal-erro"));
  modal.hide();
};

function popularSeletores(db_medicamentos) {
  const seletor1 = document.getElementById("medicamento-1");
  const seletor2 = document.getElementById("medicamento-2");
  
  seletor1.innerHTML = '<option value="">Selecione um medicamento</option>';
  seletor2.innerHTML = '<option value="">Selecione um medicamento</option>';

  const medicamentosOrdenados = [...db_medicamentos.medicamentos].sort((a, b) => 
    a.nomeComercial.localeCompare(b.nomeComercial, 'pt-BR')
  );

  medicamentosOrdenados.forEach(med => {
      const opcao1 = new Option(`${med.nomeComercial} - ${med.nomeFarmacologico}`, med.id);
      const opcao2 = new Option(`${med.nomeComercial} - ${med.nomeFarmacologico}`, med.id);
      
      seletor1.add(opcao1);
      seletor2.add(opcao2);
  });
}

function encontrarMedicamentos(event) {
  // Cancela a submissão do formulário para tratar sem fazer refresh da tela
  event.preventDefault();

  var inputMedicamento1 = document.getElementById("medicamento-1");
  var inputMedicamento2 = document.getElementById("medicamento-2");
  
  var medicamentoInseridoId1 = inputMedicamento1.value;
  var medicamentoInseridoId2 = inputMedicamento2.value;

  if (medicamentoInseridoId1 === medicamentoInseridoId2) {
    alert("Você não pode comparar o medicamento com ele mesmo!")
    inputMedicamento2.value = "";
    return
  }

  inputMedicamento1.style.borderColor = COR_PADRAO;
  inputMedicamento2.style.borderColor = COR_PADRAO;

  let valido = true;

  if (!medicamentoInseridoId1) {
    inputMedicamento1.style.borderColor = "red";
    inputMedicamento1.placeholder = "Obrigatório";
    valido = false;
  }

  if (valido) {

    var medicamentoEncontrado1 = null;
    var medicamentoEncontrado2 = null;

    // Localiza os medicamentos na base de dados

    for (var i = 0; i < db_medicamentos.medicamentos.length; i++) {
      var medicamento = db_medicamentos.medicamentos[i];

      // Se encontrou, carrega o primeiro medicamento no sessionStorage
      if (medicamento.id == medicamentoInseridoId1) {
        medicamentoEncontrado1 = { ...medicamentoEncontrado1, ...medicamento };
      }

      // Se encontrou, carrega o segundo medicamento no sessionStorage
      if (medicamentoInseridoId2 && medicamento.id == medicamentoInseridoId2)
      {
        medicamentoEncontrado2 = { ...medicamentoEncontrado2, ...medicamento };
      }
    }

    if (!medicamento) {

      for (var i = 0; i < db_medicamentos.medicamentos.length; i++) {
        var medicamento = db_medicamentos.medicamentos[i];
  
        // Se encontrou, carrega o primeiro medicamento no sessionStorage
        if (medicamento.id == medicamentoInseridoId1) {
          medicamentoEncontrado1 = { ...medicamentoEncontrado1, ...medicamento };
        }
      }
    }

    if (medicamentoInseridoId2 && !medicamentoEncontrado2) {
      for (var i = 0; i < db_medicamentos.medicamentos.length; i++) {
        var medicamento = db_medicamentos.medicamentos[i];
  
        // Se encontrou, carrega o primeiro medicamento no sessionStorage
        if (medicamento.id == medicamentoInseridoId2) {
          medicamentoEncontrado2 = { ...medicamentoEncontrado2, ...medicamento };
        }
      }
    }

    if (!medicamentoEncontrado1 && !medicamentoEncontrado2) {
      exibirModal();
      document.getElementById("fechar-btn").addEventListener("click", ocultarModal);
      inputMedicamento1.style.borderColor = "red";
      inputMedicamento2.style.borderColor = "red";
    } else {
      if (!medicamentoEncontrado1 && medicamentoEncontrado2) {
        medicamentoEncontrado1 = medicamentoEncontrado2;
        medicamentoEncontrado2 = null;
      }

      sessionStorage.setItem("medicamento1", JSON.stringify(medicamentoEncontrado1));
      sessionStorage.setItem("medicamento2", JSON.stringify(medicamentoEncontrado2));

      window.location.href = "./pages/result/result.html";
    }
  }
};

function exibirNoticias(db_noticiasWM) {

  const ultimasTresNoticias = db_noticiasWM.noticias
  .sort((a, b) => b.timestamp - a.timestamp)
  .slice(0, 3); // Pega as três primeiras notícias após a ordenação

  // Encontrar o contêiner onde as notícias serão adicionadas
  const container = document.getElementById('cards-noticias');

  // Itera sobre cada notícia
  ultimasTresNoticias.forEach(noticia => {
    
    // Cria os elementos para o card
    const card = document.createElement('div');
    const img = document.createElement('img');
    const cardBody = document.createElement('div');
    const h5 = document.createElement('h5');
    const p = document.createElement('p');
    const a = document.createElement('a');
    const smallText = document.createElement('small');

    // Adiciona as classes e atributos aos elementos
    card.classList.add('card');
    card.classList.add('col-12', 'col-md-4'); // Responsividade: 3 cards por linha no tamanho médio
    card.classList.add('flex-column');
    img.src = noticia.imagem;
    img.classList.add('card-img-top');
    img.classList.add('news-img');
    img.alt = noticia.titulo; // Adiciona o título como descrição alternativa da imagem
    cardBody.classList.add('card-body');
    cardBody.classList.add('d-flex', 'flex-column'); // Flexbox para organizar os elementos verticalmente
    h5.classList.add('primary-blue', 'mb-2');
    h5.setAttribute('inert', ''); // Adiciona o atributo inert
    p.classList.add('card-text', 'mb-2');
    p.setAttribute('inert', ''); // Adiciona o atributo inert
    a.classList.add('card-link', 'primary-blue', 'mt-auto'); // Adiciona mt-auto para empurrar o link para o final
    a.href = `pages/news/news.html?id=${noticia.id}`;
    smallText.textContent = noticia.resumo;

    // Preenche o conteúdo do card
    h5.textContent = noticia.titulo;
    p.appendChild(smallText);
    a.innerHTML = '<small>Saiba mais</small>';

    // Organiza os elementos dentro do card
    cardBody.appendChild(h5);
    cardBody.appendChild(p);
    cardBody.appendChild(a);
    card.appendChild(img);
    card.appendChild(cardBody);

    // Adiciona o card ao contêiner
    container.appendChild(card);
});

};

sessionStorage.removeItem("medicamentoInseridoId1");
sessionStorage.removeItem("medicamentoInseridoId2");
document.addEventListener("DOMContentLoaded", () => {
  const medicamentosJSON = localStorage.getItem("db_medicamentos");
  const db_medicamentos = JSON.parse(medicamentosJSON);
  const noticiasJSON = localStorage.getItem("db_noticias");
  const db_noticiasWM = JSON.parse(noticiasJSON);
  obterInfoWM();
  popularSeletores(db_medicamentos);
  exibirNoticias(db_noticiasWM);
  document.getElementById("botao-comparacao-1").addEventListener("click", encontrarMedicamentos);
  document.getElementById("botao-comparacao-2").addEventListener("click", encontrarMedicamentos);
});
