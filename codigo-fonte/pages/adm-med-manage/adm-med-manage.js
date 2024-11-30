class MedicationManager {
  constructor() {
    this.dbMedicamentos = [];
    this.defaultImagePath = '../../assets/pills-suggestion-page.png';
    this.form = document.querySelector('form');
    this.interacoesContainer = document.getElementById('interacoes-container');
    this.addInteracaoBtn = document.getElementById('add-interacao-btn');
    this.deleteBtn = document.getElementById('delete-btn');
    this.breadcrumbTitle = document.getElementById('type-mode');
    this.mode = this.determineMode();

    this.initialize();
  }

  initialize() {
    this.loadDatabase();
    this.setbreadcrumbTitle();
    this.setupEventListeners();
    this.setupClearIcons();
    this.setupImagePreview();

    if (this.mode.type === 'edit') {
      this.populateForm();
    } else {
      this.setDefaultImage();
    }
  }

  loadDatabase() {
    try {
      const dbString = localStorage.getItem('db_medicamentos');
      const dbObj = JSON.parse(dbString);
      this.dbMedicamentos = dbObj?.medicamentos || [];
    } catch (error) {
      console.error('Error loading database:', error);
      this.dbMedicamentos = [];
    }
  }

  saveDatabase() {
    try {
      localStorage.setItem(
        'db_medicamentos',
        JSON.stringify({
          medicamentos: this.dbMedicamentos,
        })
      );
      return true;
    } catch (error) {
      console.error('Error saving database:', error);
      return false;
    }
  }

  setbreadcrumbTitle() {
    if (this.mode.type == 'edit') {
      this.breadcrumbTitle.innerText = 'Editar Medicamento';
    } else if (this.mode.type == 'create') {
      this.breadcrumbTitle.innerText = 'Criar Medicamento';
    }
  }

  determineMode() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('edicao')) {
      return { type: 'edit', id: parseInt(params.get('edicao')) };
    }
    return { type: 'create', id: null };
  }

  setupEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.addInteracaoBtn.addEventListener('click', () => this.createInteracaoFields());
    this.deleteBtn.addEventListener('click', () => this.handleDelete());
  }

  setupClearIcons() {
    const clearIcons = document.querySelectorAll('.clear-icon');
    clearIcons.forEach((icon) => {
      icon.addEventListener('click', () => {
        const input = icon.previousElementSibling;
        if (input?.tagName.toLowerCase() === 'input') {
          input.value = '';
        }
      });
    });
  }

  setDefaultImage() {
    const medicationImage = document.getElementById('medicationImage');
    medicationImage.src = this.defaultImagePath;
    medicationImage.onerror = () => {
      console.warn('Não conseguiu carregar imagem default');
      medicationImage.src =
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f8f9fa"/><text x="50%" y="50%" font-family="Arial" font-size="14" fill="%23dee2e6" text-anchor="middle" dy=".3em">No Image</text></svg>';
    };
  }

  setupImagePreview() {
    const imageInput = document.getElementById('imageInput');
    const medicationImage = document.getElementById('medicationImage');

    imageInput.addEventListener('change', async (event) => {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const validatedImage = await this.validateAndProcessImage(file);

        if (validatedImage) {
          const url = URL.createObjectURL(validatedImage);
          medicationImage.src = url;
        } else {
          event.target.value = '';
          this.setDefaultImage();
        }
      } else {
        this.setDefaultImage();
      }
    });
  }

  createInteracaoFields(interacaoData = {}) {
    const interacaoDiv = document.createElement('div');
    interacaoDiv.classList.add('interacao-field', 'mb-5', 'position-relative');

    const medicamentoSelect = document.createElement('select');
    medicamentoSelect.name = 'interacaoMedicamentoId';
    medicamentoSelect.classList.add('form-control', 'mb-2', 'border-radius-30');

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecione o medicamento';
    medicamentoSelect.appendChild(defaultOption);

    this.dbMedicamentos
      .filter((med) => med.id !== this.mode.id)
      .sort((a, b) => {
        const nomeA = (a.nomeFarmacologico || '').toLowerCase();
        const nomeB = (b.nomeFarmacologico || '').toLowerCase();

        const normalizadoA = nomeA.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const normalizadoB = nomeB.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return normalizadoA.localeCompare(normalizadoB);
      })
      .forEach((med) => {
        const option = document.createElement('option');
        option.value = med.id;
        option.textContent = med.nomeFarmacologico;
        if (interacaoData.id === med.id) {
          option.selected = true;
        }
        medicamentoSelect.appendChild(option);
      });

    interacaoDiv.appendChild(medicamentoSelect);

    const fields = [
      { name: 'efeitoLeve', type: 'text', placeholder: 'Efeito Leve' },
      { name: 'efeitoModerado', type: 'text', placeholder: 'Efeito Moderado' },
      { name: 'efeitoSevero', type: 'text', placeholder: 'Efeito Severo' },
    ];

    fields.forEach((field) => {
      const input = document.createElement('input');
      input.type = field.type;
      input.name = field.name;
      input.placeholder = field.placeholder;
      input.classList.add('form-control', 'mb-2', 'border-radius-30');
      input.value = interacaoData[field.name] || '';
      interacaoDiv.appendChild(input);
    });

    const removeBtn = this.createRemoveButton(interacaoDiv);
    interacaoDiv.appendChild(removeBtn);
    this.interacoesContainer.appendChild(interacaoDiv);
  }

  createRemoveButton(parentDiv) {
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.classList.add('position-absolute', 'clear-icon', 'border-radius-30');
    removeBtn.style.top = '-20px';
    removeBtn.style.right = '0';
    removeBtn.style.backgroundColor = 'transparent';
    removeBtn.style.border = '2px solid #727272';
    removeBtn.style.padding = '0 10px';
    removeBtn.innerHTML = '&times;';
    removeBtn.addEventListener('click', () => {
      this.interacoesContainer.removeChild(parentDiv);
    });
    return removeBtn;
  }

  getFormData() {
    const formData = {};
    const inputs = this.form.querySelectorAll('input[name]');
    const textareas = this.form.querySelectorAll('textarea[name]');
    const interacaoFields = [
      'interacaoMedicamentoId',
      'efeitoLeve',
      'efeitoModerado',
      'efeitoSevero',
    ];

    inputs.forEach((input) => {
      if (!interacaoFields.includes(input.name)) {
        formData[input.name] = input.value;
      }
    });

    textareas.forEach((textarea) => {
      formData[textarea.name] = textarea.value;
    });

    formData.interacoes = this.getInteracoesData();
    return formData;
  }

  getInteracoesData() {
    const interacoes = [];
    const fields = this.interacoesContainer.querySelectorAll('.interacao-field');

    fields.forEach((field) => {
      const targetMedicamentoId = parseInt(
        field.querySelector('select[name="interacaoMedicamentoId"]').value,
        10
      );
      console.log(targetMedicamentoId);
      if (targetMedicamentoId) {
        interacoes.push({
          id: targetMedicamentoId,
          efeitoLeve: field.querySelector('input[name="efeitoLeve"]').value,
          efeitoModerado: field.querySelector('input[name="efeitoModerado"]').value,
          efeitoSevero: field.querySelector('input[name="efeitoSevero"]').value,
        });
      }
    });

    return interacoes;
  }

  async populateForm() {
    const data = this.dbMedicamentos.find((med) => med.id === this.mode.id);

    if (!data) {
      alert('Página não encontrada!');
      window.history.back();
      return;
    }

    const inputs = this.form.querySelectorAll('input[name]');
    inputs.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });

    const textareas = this.form.querySelectorAll('textarea[name]');
    textareas.forEach((textarea) => {
      if (data[textarea.name]) {
        textarea.value = data[textarea.name];
      }
    });

    try {
      const imageUrl = await this.getMedicationImage(this.mode.id);
      const medicationImage = document.getElementById('medicationImage');
      medicationImage.src = imageUrl;
    } catch (error) {
      console.error('Error carregar imagem do medicamento:', error);
    }

    this.populateInteracoes(data.interacoes || []);
  }

  populateInteracoes(interacoes) {
    this.interacoesContainer.innerHTML = '';

    const sortedInteracoes = this.sortInteracoes(interacoes);

    sortedInteracoes.forEach((interacao) => {
      const targetMed = this.dbMedicamentos.find((med) => med.id === interacao.id);
      if (targetMed) {
        this.createInteracaoFields({
          id: interacao.id,
          targetMedicamento: targetMed.nomeFarmacologico,
          efeitoLeve: interacao.efeitoLeve || '',
          efeitoModerado: interacao.efeitoModerado || '',
          efeitoSevero: interacao.efeitoSevero || '',
        });
      } else {
        console.warn(
          `Medicamento com ID ${interacao.id} não encontrado no banco. Esta interação será ignorada.`
        );
      }
    });
  }

  sortInteracoes(interacoes) {
    return [...interacoes].sort((a, b) => {
      const medA = this.dbMedicamentos.find((med) => med.id === a.id);
      const medB = this.dbMedicamentos.find((med) => med.id === b.id);

      if (!medA || !medB) return 0;

      return medA.nomeFarmacologico.localeCompare(medB.nomeFarmacologico);
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const formData = this.getFormData();

    if (this.mode.type === 'edit') {
      formData.id = this.mode.id;
    }

    const success = await this.updateDatabase(formData);
    if (success) {
      alert(
        `${formData.nomeFarmacologico} foi ${
          this.mode.type === 'edit' ? 'atualizado' : 'adicionado'
        } com sucesso!`
      );
      if (this.mode.type === 'edit') {
        location.reload();
      }
    }
  }

  async updateDatabase(data) {
    if (this.mode.type === 'create') {
      return this.createMedicamento(data);
    } else if (this.mode.type === 'edit') {
      return this.updateMedicamento(data);
    }
    return false;
  }

  async createMedicamento(data) {
    const exists = this.dbMedicamentos.some(
      (med) => med.nomeFarmacologico.toLowerCase() === data.nomeFarmacologico.toLowerCase()
    );

    if (exists) {
      alert(
        `${data.nomeFarmacologico} já existe no banco! Para editar, acesse a Lista de Medicamentos.`
      );
      return false;
    }

    const maxId = Math.max(...this.dbMedicamentos.map((med) => med.id), 0);
    const newInteractions = data.interacoes || [];
    const newId = maxId + 1;

    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length > 0) {
      const validatedImage = await this.validateAndProcessImage(imageInput.files[0]);
      if (validatedImage) {
        await this.updateMedicationImage(newId, validatedImage);
      } else {
        return false;
      }
    }

    const newMed = {
      id: newId,
      ...data,
      interacoes: data.interacoes || [],
    };

    newInteractions.forEach((interaction) => {
      this.updateBidirectionalInteraction(newMed.id, interaction);
    });

    this.dbMedicamentos.push(newMed);
    return this.saveDatabase();
  }

  async updateMedicamento(data) {
    const medIndex = this.dbMedicamentos.findIndex((med) => med.id === data.id);

    if (medIndex === -1) {
      alert(`Medicamento com ID ${data.id} não encontrado!`);
      return false;
    }

    const duplicate = this.dbMedicamentos.some(
      (med) =>
        med.nomeFarmacologico.toLowerCase() === data.nomeFarmacologico.toLowerCase() &&
        med.id !== data.id
    );

    if (duplicate) {
      alert(`Outro medicamento com o nome ${data.nomeFarmacologico} já existe!`);
      return false;
    }

    const existingInteractions = this.dbMedicamentos[medIndex].interacoes || [];
    const newInteractions = data.interacoes || [];

    existingInteractions.forEach((oldInteraction) => {
      if (!newInteractions.some((newInt) => newInt.id === oldInteraction.id)) {
        this.removeInteractionFromTarget(data.id, oldInteraction.id);
      }
    });

    newInteractions.forEach((interaction) => {
      this.updateBidirectionalInteraction(data.id, interaction);
    });

    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length > 0) {
      const validatedImage = await this.validateAndProcessImage(imageInput.files[0]);
      if (validatedImage) {
        await this.updateMedicationImage(data.id, validatedImage);
      } else {
        return false;
      }
    }

    this.dbMedicamentos[medIndex] = {
      ...this.dbMedicamentos[medIndex],
      ...data,
      interacoes: newInteractions,
    };
    return this.saveDatabase();
  }

  updateBidirectionalInteraction(sourceId, interaction) {
    const targetIndex = this.dbMedicamentos.findIndex((med) => med.id === interaction.id);
    if (targetIndex === -1) return;

    const targetMed = this.dbMedicamentos[targetIndex];

    const targetInteractions = targetMed.interacoes || [];
    const existingTargetInteraction = targetInteractions.findIndex(
      (int) => int.id === sourceId
    );

    const mirroredInteraction = {
      id: sourceId,
      efeitoLeve: interaction.efeitoLeve,
      efeitoModerado: interaction.efeitoModerado,
      efeitoSevero: interaction.efeitoSevero,
    };

    if (existingTargetInteraction >= 0) {
      targetInteractions[existingTargetInteraction] = mirroredInteraction;
    } else {
      targetInteractions.push(mirroredInteraction);
    }

    this.dbMedicamentos[targetIndex] = {
      ...targetMed,
      interacoes: targetInteractions,
    };
  }

  removeInteractionFromTarget(sourceId, targetId) {
    const targetIndex = this.dbMedicamentos.findIndex((med) => med.id === targetId);
    if (targetIndex === -1) return;

    const targetMed = this.dbMedicamentos[targetIndex];
    const targetInteractions = targetMed.interacoes || [];

    const updatedInteractions = targetInteractions.filter((int) => int.id !== sourceId);

    this.dbMedicamentos[targetIndex] = {
      ...targetMed,
      interacoes: updatedInteractions,
    };
  }

  async handleDelete() {
    if (this.mode.type !== 'edit') {
      alert('A exclusão só é possível no modo de edição.');
      return;
    }

    const confirmation = confirm('Tem certeza de que deseja deletar este medicamento?');
    if (!confirmation) return;

    const medIndex = this.dbMedicamentos.findIndex((med) => med.id === this.mode.id);
    if (medIndex === -1) {
      alert(`Medicamento com ID ${this.mode.id} não encontrado!`);
      return;
    }

    this.removeAllInteractionsWithMedication(this.mode.id);

    await this.deleteMedicationImage(this.mode.id);

    this.dbMedicamentos.splice(medIndex, 1);
    if (this.saveDatabase()) {
      alert('Medicamento deletado com sucesso!');
      window.location.href = '../adm-med-list/adm-med-list.html';
    }
  }

  removeAllInteractionsWithMedication(medicationId) {
    this.dbMedicamentos = this.dbMedicamentos.map((med) => {
      if (!med.interacoes || !Array.isArray(med.interacoes)) {
        return med;
      }
      const filteredInteracoes = med.interacoes.filter(
        (interacao) => interacao.id !== medicationId
      );
      return {
        ...med,
        interacoes: filteredInteracoes,
      };
    });
  }

  async getMedicationImage(id) {
    const db = await openImageDB();
    const transaction = db.transaction(['images'], 'readonly');
    const store = transaction.objectStore('images');

    return new Promise((resolve, reject) => {
      const request = store.get(id);

      request.onsuccess = () => {
        if (request.result) {
          resolve(URL.createObjectURL(request.result.image));
        } else {
          reject(new Error(`No image found for medication ${id}`));
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  async validateAndProcessImage(file) {
    if (file.type !== 'image/png') {
      alert('Formato deve ser .PNG');
      return null;
    }
    if (file.size > 512000) {
      alert('Imagens devem ser menores que 500kb');
      return null;
    }

    return file;
  }

  async updateMedicationImage(id, imageFile) {
    try {
      const db = await openImageDB();
      const transaction = db.transaction(['images'], 'readwrite');
      const store = transaction.objectStore('images');

      return new Promise((resolve, reject) => {
        const request = store.put({
          id: id,
          image: imageFile,
        });

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Erro ao salvar imagem:', error);
      return false;
    }
  }

  async deleteMedicationImage(id) {
    try {
      const db = await openImageDB();
      const transaction = db.transaction(['images'], 'readwrite');
      const store = transaction.objectStore('images');

      return new Promise((resolve, reject) => {
        const request = store.delete(id);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Erro ao remover imagem:', error);
      return false;
    }
  }
}

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

function addBySuggestion() {
  let params = new URLSearchParams(window.location.search);

  if (params.has('nomeComercial')) {
    const inputNomeComercial = document.querySelector('input[name="nomeComercial"]');
    const inputNomeFarmacologico = document.querySelector(
      'input[name="nomeFarmacologico"]'
    );

    let nomeComercial = params.get('nomeComercial');
    let nomeFarmacologico = params.get('nomeFarmacologico');

    inputNomeComercial.value = nomeComercial;
    inputNomeFarmacologico.value = nomeFarmacologico;
  } else {
    return;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.medicationManager = new MedicationManager();
});

addBySuggestion()
