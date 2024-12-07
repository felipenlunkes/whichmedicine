// Lista de sugestões
const listaSugestoes = localStorage.getItem("db_sugestoes");
const adicionadoMedList = localStorage.getItem("db_medicamentos");
let lista = JSON.parse(listaSugestoes);

// Lista de medicamentos já cadastrados no localStorage.
let medLista = JSON.parse(adicionadoMedList).medicamentos;

// Recebe os dados da lista de sugestões e renderiza no HTML.
const renderListaSugestoes = () => {
  // Elemento pai para adicionar os items do accordion dentro deste elemento
  const containerLista = document.getElementById("usrSugestAccordion");

  lista.sugestoes.map((listItem, index) => {
    // Se "true" cria um elemento dentro da div "usrSugestAccordion"

    const novoAccordionSugestao = document.createElement("div");

    novoAccordionSugestao.classList.add("accordionItem", "accordionStyles");

    novoAccordionSugestao.innerHTML = `
        <h2>
          <button
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse${index}"
            aria-expanded="true"
            aria-controls="collapse${index}"
            class=""
          >
            ${listItem.nomeComercial} 
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 0C9.55797 0 9.13405 0.175595 8.82149 0.488155C8.50893 0.800716 8.33333 1.22464 8.33333 1.66667V8.33333H1.66667C1.22464 8.33333 0.800716 8.50893 0.488155 8.82149C0.175595 9.13405 0 9.55797 0 10C0 10.442 0.175595 10.8659 0.488155 11.1785C0.800716 11.4911 1.22464 11.6667 1.66667 11.6667H8.33333V18.3333C8.33333 18.7754 8.50893 19.1993 8.82149 19.5118C9.13405 19.8244 9.55797 20 10 20C10.442 20 10.8659 19.8244 11.1785 19.5118C11.4911 19.1993 11.6667 18.7754 11.6667 18.3333V11.6667H18.3333C18.7754 11.6667 19.1993 11.4911 19.5118 11.1785C19.8244 10.8659 20 10.442 20 10C20 9.55797 19.8244 9.13405 19.5118 8.82149C19.1993 8.50893 18.7754 8.33333 18.3333 8.33333H11.6667V1.66667C11.6667 1.22464 11.4911 0.800716 11.1785 0.488155C10.8659 0.175595 10.442 0 10 0Z"
                fill="#5E5E5E"
              ></path>
            </svg>
          </button>
        </h2>
        <div
          id="collapse${index}"
          class="collapse"
          data-bs-parent="#usrSugestAccordion"
          style=""
        >
          <div class="accordionBody">
            <p>${listItem.nomeFarmacologico}</p>
            <textarea>${listItem.descricao}</textarea>
            <div>
              <button onclick="apagarSugFunc('${listItem.nomeComercial}')">
                <svg width="20" height="26" viewBox="0 0 20 26" fill="none">
                  <path
                    d="M1.42857 22.8571C1.42857 24.4286 2.71429 25.7143 4.28571 25.7143H15.7143C17.2857 25.7143 18.5714 24.4286 18.5714 22.8571V5.71429H1.42857V22.8571ZM20 1.42857H15L13.5714 0H6.42857L5 1.42857H0V4.28571H20V1.42857Z"
                    fill="#FF3B30"
                  ></path>
                </svg>
              </button>
              <button onclick="irCriarMedicacao('${listItem.nomeComercial}', '${listItem.nomeFarmacologico}')">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path
                    d="M27.7278 2.625L27.3531 2.25C26.0417 0.75 23.9808 0 22.1073 0C20.2338 0 18.173 0.75 16.6742 2.25L2.2482 16.6875C-0.7494 19.6875 -0.7494 24.375 2.2482 27.375L2.6229 27.75C3.93435 29.25 5.9952 30 7.8687 30C9.7422 30 11.8031 29.25 13.3019 27.75L27.9152 13.125C30.7254 10.3125 30.7254 5.4375 27.7278 2.625ZM26.4164 12L19.1097 19.3125L12.5525 12.5625L5.43315 19.6875C3.3723 21.75 3.3723 24.375 3.55965 26.25C1.31145 24 1.31145 20.4375 3.55965 18.1875L18.173 3.5625C19.1097 2.4375 20.6085 1.875 22.1073 1.875C23.6061 1.875 25.1049 2.4375 26.229 3.5625L26.6037 3.9375C27.5405 4.875 28.1025 6.375 28.1025 7.875C28.1025 9.375 27.5405 10.875 26.4164 12Z"
                    fill="#4C72B2"
                  ></path>
                </svg>
              </button>
           
            </div>
          </div>
        </div>
      `;

    containerLista.append(novoAccordionSugestao);
  });
};

function irCriarMedicacao(nomeComercial, nomeFarmacologico) {
  window.location.href = `../adm-med-manage/adm-med-manage.html?nomeComercial=${nomeComercial}&nomeFarmacologico=${nomeFarmacologico}`;
}

// Função para apagar uma sugestão
// Recebe: nome da medicação sugerida
// Retorno: void
function apagarSugFunc(nomeMedSug) {
  const containerLista = document.getElementById("usrSugestAccordion");

  lista.sugestoes.forEach((sugestao, index) => {
    if (nomeMedSug === sugestao.nomeComercial) {
      lista.sugestoes.splice(index, 1);

      localStorage.setItem("db_sugestoes", JSON.stringify(lista));

      containerLista.innerHTML = "";
      console.log(listaSugestoes);
      renderListaSugestoes(listaSugestoes);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderListaSugestoes(lista);
});
