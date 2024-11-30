const INTERACOES_INICIO =
  "Existem interações relatadas entre os medicamentos. ";
const INTERACOES_LEVES = "Interações leves relatadas: ";
const INTERACOES_MODERADAS = "Interações moderadas: ";
const INTERACOES_SEVERAS = "Interações severas: ";
const MEDICAMENTO_UNICO =
  "Você está vendo mais informações sobre o único medicamento selecionado.";
const ACAO = "Utilização clínica: ";
const POSOLOGIA = "Posologia: ";
const APRESENTACAO = "Apresentação: ";

// Função modificada para verificar se `medicamento2` existe
function montarEfeitosColaterais(medicamento1, medicamento2) {
  if (!medicamento2) {
    return (
      MEDICAMENTO_UNICO +
      "<br><br>" +
      ACAO +
      medicamento1.descricao +
      ". <br>" +
      POSOLOGIA +
      medicamento1.posologia +
      ". <br>" +
      APRESENTACAO +
      medicamento1.apresentacao +
      "."
    );
  }

  // Tentar encontrar interações entre o medicamento 1 e o 2

  if (medicamento1.interacoes) {
    for (var i = 0; i < medicamento1.interacoes.length; i++) {
      var interacao = medicamento1.interacoes[i];
  
      if (interacao.id == medicamento2.id) {
        return obterInteracoes(interacao);
      }
    }
  } else {
    medicamento1.interacoes = [];
  }

  // Se não encontrado, tente na outra direção
  if (medicamento2.interacoes) {
    for (var i = 0; i < medicamento2.interacoes.length; i++) {
      var interacao = medicamento2.interacoes[i];
  
      if (interacao.id == medicamento1.id) {
        return obterInteracoes(interacao);
      }
    }
  } else {
    medicamento2.interacoes = [];
  }

  return "Nenhuma interação catalogada entre os dois medicamentos pesquisados." +
  "<br>"+
  "Vá até <strong><a href='../user-med-list/user-med-list.html'>Medicamentos</a></strong> para ver a lista completa de medicamentos.";
}

function obterInteracoes(interacao) {
  return (
    INTERACOES_INICIO +
    "<br><br>" +
    INTERACOES_LEVES +
    interacao.efeitoLeve +
    ". <br> " +
    INTERACOES_MODERADAS +
    interacao.efeitoModerado +
    ". <br>" +
    INTERACOES_SEVERAS +
    interacao.efeitoSevero +
    "."
  );
}

let currentMed1Id, currentMed2Id;

async function carregarMedicamentos() {
  const params = new URLSearchParams(window.location.search);

  if (params.has("compara")) {
    const id1 = params.get("med1");
    const id2 = params.get("med2");
    const dbString = localStorage.getItem("db_medicamentos");
    const dbMedicamentos = JSON.parse(dbString);
    medicamento1 = dbMedicamentos.medicamentos.find(med => med.id == id1);
    medicamento2 = dbMedicamentos.medicamentos.find(med => med.id == id2);
  } else {
    const remedio1JSON = sessionStorage.getItem("medicamento1");
    const remedio2JSON = sessionStorage.getItem("medicamento2");
    medicamento1 = JSON.parse(remedio1JSON);
    medicamento2 = JSON.parse(remedio2JSON);
  }

  const imageUrl1 = await getMedicationImage(medicamento1.id);
  const imageUrl2 = await getMedicationImage(medicamento2.id);

  medicationImage1.src = imageUrl1;
  medicationImage2.src = imageUrl2;

  let exibirSegundoMedicamento = true;

  if (!medicamento2) {
    exibirSegundoMedicamento = false;
    document.getElementById("versus").classList.add("d-none");
    document.getElementById("segundo-medicamento").classList.add("d-none");
    document.getElementById("primeiro-medicamento").classList.add("mx-auto");
  } else {
    document.getElementById("versus").classList.remove("d-none");
    document.getElementById("segundo-medicamento").classList.remove("d-none");
    document.getElementById("primeiro-medicamento").classList.remove("mx-auto");
  }

  document.getElementById("remedio-1").innerHTML = medicamento1.nomeComercial;
  document.getElementById("nome-farmacologico-1").innerHTML =
    medicamento1.nomeFarmacologico;
  document.getElementById("classe-medicamento-1").innerHTML =
    medicamento1.classe;

  if (exibirSegundoMedicamento) {
    document.getElementById("remedio-2").innerHTML = medicamento2.nomeComercial;
    document.getElementById("nome-farmacologico-2").innerHTML =
      medicamento2.nomeFarmacologico;
    document.getElementById("classe-medicamento-2").innerHTML =
      medicamento2.classe;
  }

  var textInteracao = montarEfeitosColaterais(medicamento1, medicamento2);

  document.getElementById("interacoes-text").innerHTML = textInteracao;

  currentMed1Id = medicamento1.id;
  currentMed2Id = medicamento2.id;
  initCompartilhaRedesSociais()
}

async function getMedicationImage(id) {
  const db = await openImageDB();
  const transaction = db.transaction(['images'], 'readonly');
  const store = transaction.objectStore('images');
  
  return new Promise((resolve, reject) => {
    const request = store.get(id);
    
    request.onsuccess = () => {
      if (request.result) {
        resolve(URL.createObjectURL(request.result.image));
      } else {
        reject(new Error(`Sem imagem para o medicamento id ${id}`));
      }
    };
    
    request.onerror = () => reject(request.error);
  });
};

async function openImageDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MedicationImages');
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id' });
      }
    };
  });
}

function initCompartilhaRedesSociais() {
  document.querySelectorAll('.list-group-item').forEach(item => {
      item.style.cursor = 'pointer';
  });

  const urlBase = `${window.location.href}`;
  const urlCompartilhamento = `${urlBase}?compara=true&med1=${currentMed1Id}&med2=${currentMed2Id}`;

  const msgCompartilhamento = 'Compare estes medicamentos:';
  const messagemEncodada = encodeURIComponent(msgCompartilhamento + ' ' + urlCompartilhamento);

  const ehMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const redesSociais = {
      'WhatsApp': () => {
          const whatsappUrl = ehMobile 
              ? `whatsapp://send?text=${messagemEncodada}`
              : `https://web.whatsapp.com/send?text=${messagemEncodada}`;
          window.open(whatsappUrl, '_blank');
      },
      'Facebook': () => {
          const facebookUrl = ehMobile
              ? `fb://facewebmodal/f?href=${encodeURIComponent(urlCompartilhamento)}`
              : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlCompartilhamento)}`;
          
          if (ehMobile) {
              window.location.href = facebookUrl;
              setTimeout(() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlCompartilhamento)}`, '_blank');
              }, 1000);
          } else {
              window.open(facebookUrl, '_blank');
          }
      },
      'X': () => {
          const twitterUrl = ehMobile
              ? `twitter://post?text=${messagemEncodada}`
              : `https://twitter.com/intent/tweet?text=${messagemEncodada}`;
          
          if (ehMobile) {
              window.location.href = twitterUrl;
              setTimeout(() => {
                  window.open(`https://twitter.com/intent/tweet?text=${messagemEncodada}`, '_blank');
              }, 1000);
          } else {
              window.open(twitterUrl, '_blank');
          }
      },
      'Copiar link': async () => {
          try {
              await navigator.clipboard.writeText(urlCompartilhamento);
              alert('Link copiado com sucesso!');
          } catch (err) {
              console.error('Falha ao copiar link:', err);
              alert('Erro ao copiar link');
          }
      }
  };

  document.querySelectorAll('.list-group-item').forEach(item => {
      const nomeRedeSocial = item.querySelector('span.ps-2').textContent;
      item.addEventListener('click', () => {
          const handler = redesSociais[nomeRedeSocial];
          if (handler) {
              handler();
          }
      });
  });
}

// Assegura que o código será executado após o carregamento do DOM
document.addEventListener("DOMContentLoaded", carregarMedicamentos);