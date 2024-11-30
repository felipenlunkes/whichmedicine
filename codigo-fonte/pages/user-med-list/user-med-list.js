
class ListaMedicamentos {
  constructor() {
    this.dbMedicamentos = [];
    this.listContainer = document.getElementById("lista-medicamentos");
    this.searchInput = document.querySelector("input[type='text']");
    
    this.initialize();
  }

  initialize() {
    this.obterMedicamentos();
    this.renderListaMedicamentos(this.dbMedicamentos);
    this.listenerPesquisa();
  }

  obterMedicamentos() {
    const medicamentosJSON = localStorage.getItem("db_medicamentos");
    if (medicamentosJSON) {
      this.dbMedicamentos = JSON.parse(medicamentosJSON).medicamentos;
    }
}

  listenerPesquisa() {
  let searchTimeout;
  this.searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const termosBusca = e.target.value.toLowerCase().trim();
      const medicamentosFiltrados = this.dbMedicamentos.filter(med => 
        med.nomeFarmacologico.toLowerCase().includes(termosBusca) ||
        med.nomeComercial.toLowerCase().includes(termosBusca) ||
        med.classe.toLowerCase().includes(termosBusca)
      );
      this.renderListaMedicamentos(medicamentosFiltrados);
    }, 300);
  });
}

  renderListaMedicamentos(listaMedicamentos) {

  // Elemento pai para adicionar os items do accordion dentro deste elemento
  const containerLista = document.getElementById("medListAccordion");

  while (containerLista.firstChild) {
    containerLista.removeChild(containerLista.firstChild);
  }

  listaMedicamentos.map((listItem, index, arr) => {
    // Criação do container principal
    const medListAccordion = document.createElement("div");
    medListAccordion.id = "medListAccordion";

    // Criação do item do acordeão
    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordionItem", "accordionStyles");

    // Criação do cabeçalho
    const h2 = document.createElement("h2");
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", `#collapse${index}`);
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-controls", `collapse${index}`);
    button.innerHTML = `${listItem.nomeComercial}`;

    // Criação do SVG dentro do botão
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("fill", "none");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M10 0C9.55797 0 9.13405 0.175595 8.82149 0.488155C8.50893 0.800716 8.33333 1.22464 8.33333 1.66667V8.33333H1.66667C1.22464 8.33333 0.800716 8.50893 0.488155 8.82149C0.175595 9.13405 0 9.55797 0 10C0 10.442 0.175595 10.8659 0.488155 11.1785C0.800716 11.4911 1.22464 11.6667 1.66667 11.6667H8.33333V18.3333C8.33333 18.7754 8.50893 19.1993 8.82149 19.5118C9.13405 19.8244 9.55797 20 10 20C10.442 20 10.8659 19.8244 11.1785 19.5118C11.4911 19.1993 11.6667 18.7754 11.6667 18.3333V11.6667H18.3333C18.7754 11.6667 19.1993 11.4911 19.5118 11.1785C19.8244 10.8659 20 10.442 20 10C20 9.55797 19.8244 9.13405 19.5118 8.82149C19.1993 8.50893 18.7754 8.33333 18.3333 8.33333H11.6667V1.66667C11.6667 1.22464 11.4911 0.800716 11.1785 0.488155C10.8659 0.175595 10.442 0 10 0Z"
    );
    path.setAttribute("fill", "#5E5E5E");
    svg.appendChild(path);

    button.appendChild(svg);
    h2.appendChild(button);

    // Criação do conteúdo colapsável
    const collapseDiv = document.createElement("div");
    collapseDiv.id = `collapse${index}`;
    collapseDiv.classList.add("collapse");
    collapseDiv.setAttribute("data-bs-parent", "#medListAccordion");

    const accordionBody = document.createElement("div");
    accordionBody.classList.add("accordionBody");

    const classeMedicamento = document.createElement("p1");
    classeMedicamento.textContent = `Classe do medicamento: ${listItem.classe}`

    const nomeFarmacologico = document.createElement("p");
    nomeFarmacologico.textContent = "Composição (nome farmacológico)"

    const textareaNomeFarmacologico = document.createElement("textarea");
    textareaNomeFarmacologico.setAttribute("name", "pharmacological description");
    textareaNomeFarmacologico.setAttribute("disabled", "true");
    textareaNomeFarmacologico.innerHTML = `${listItem.nomeFarmacologico}.`;

    const descricaoMedicamento = document.createElement("p");
    descricaoMedicamento.textContent = "Descrição do medicamento"

    const textareaDescricaoMedicamento = document.createElement("textarea");
    textareaDescricaoMedicamento.setAttribute("name", "pharmacological description");
    textareaDescricaoMedicamento.setAttribute("disabled", "true");
    textareaDescricaoMedicamento.innerHTML = `${listItem.descricao}.`;

    const posologiaMedicamento = document.createElement("p");
    posologiaMedicamento.textContent = "Posologia"

    const textareaPosologiaMedicamento = document.createElement("textarea");
    textareaPosologiaMedicamento.setAttribute("name", "pharmacological description");
    textareaPosologiaMedicamento.setAttribute("disabled", "true");
    textareaPosologiaMedicamento.innerHTML = `${listItem.posologia}.`;

    accordionBody.appendChild(classeMedicamento);

    accordionBody.appendChild(nomeFarmacologico);
    accordionBody.appendChild(textareaNomeFarmacologico);

    accordionBody.appendChild(descricaoMedicamento);
    accordionBody.appendChild(textareaDescricaoMedicamento);

    accordionBody.appendChild(posologiaMedicamento);
    accordionBody.appendChild(textareaPosologiaMedicamento);

    collapseDiv.appendChild(accordionBody);

    // Adiciona o cabeçalho e conteúdo colapsável ao item do acordeão
    accordionItem.appendChild(h2);
    accordionItem.appendChild(collapseDiv);

    // Adiciona o item do acordeão ao container principal
    medListAccordion.appendChild(accordionItem);

    // Adiciona o container ao body da página
    containerLista.append(accordionItem);
  });
};

}

function exibirModal() {
  var modal = new bootstrap.Modal(document.getElementById("modal-erro"));
  modal.show();
};

function ocultarModal() {
  var modal = new bootstrap.Modal(document.getElementById("modal-erro"));
  modal.hide();
};

function validarMedicamentos(listaMedicamentos) {

  if (!listaMedicamentos) {
      exibirModal();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.medicationManager = new ListaMedicamentos();
});

