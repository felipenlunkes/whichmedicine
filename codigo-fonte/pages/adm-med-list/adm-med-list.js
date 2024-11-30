class MedicationList {
  constructor() {
    this.dbMedicamentos = [];
    this.listContainer = document.getElementById("lista-medicamentos");
    this.searchInput = document.querySelector("input[type='text']");
    
    this.initialize();
  }

  initialize() {
    this.loadDatabase();
    this.renderList(this.dbMedicamentos);
    this.setupSearchListener();
  }

  loadDatabase() {
    const medicamentosJSON = localStorage.getItem("db_medicamentos");
    if (medicamentosJSON) {
      this.dbMedicamentos = JSON.parse(medicamentosJSON).medicamentos;
    }
  }

  setupSearchListener() {
    let searchTimeout;
    this.searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const filteredMeds = this.dbMedicamentos.filter(med => 
          med.nomeFarmacologico.toLowerCase().includes(searchTerm) ||
          med.nomeComercial.toLowerCase().includes(searchTerm) ||
          med.classe.toLowerCase().includes(searchTerm)
        );
        this.renderList(filteredMeds);
      }, 300);
    });
  }

  async createMedicationItem(medicamento) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="adm-med-list-item d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center ps-md-5 ps-4">
          <div>
            <p class="text-start mb-0 fw-medium">${medicamento.nomeFarmacologico}</p>
            <small class="text-muted">${medicamento.classe}</small>
          </div>
        </div>
        <div class="pe-md-5 pe-2">
          <span class="icon-circle">
            <a href="../adm-med-manage/adm-med-manage.html?edicao=${medicamento.id}" 
               class="text-decoration-none">
              <i class="fas fa-pencil"></i>
            </a>
          </span>
        </div>
      </div>`;
    
    return div;
  }

  async renderList(medications) {
    this.listContainer.innerHTML = "";
    
    if (medications.length === 0) {
      this.listContainer.innerHTML = `
        <div class="text-center py-5 text-muted">
          <i class="fas fa-search fa-3x mb-3"></i>
          <p>Nenhum medicamento encontrado</p>
        </div>`;
      return;
    }

    const itemPromises = medications.map(med => this.createMedicationItem(med));
    const items = await Promise.all(itemPromises);
    items.forEach(item => this.listContainer.appendChild(item));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.medicationManager = new MedicationList();
});
