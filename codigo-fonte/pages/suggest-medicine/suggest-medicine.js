class NovaSugestaoManager {
  constructor() {
    this.dbSugestoes = [];
    this.form = document.querySelector('form');
    this.form.addEventListener('submit', (e) => this.gravarForm(e));
    this.carregarBd();
  }

  carregarBd() {
    try {
      const dbString = localStorage.getItem('db_sugestoes');
      const dbObj = JSON.parse(dbString);
      this.dbSugestoes = dbObj?.sugestoes || [];
    } catch (error) {
      console.error('Erro ao carregar o banco de dados:', error);
      this.dbSugestoes = [];
    }
  }

  salvarBd() {
    try {
      localStorage.setItem(
        'db_sugestoes',
        JSON.stringify({
          sugestoes: this.dbSugestoes,
        })
      );
      alert("Sugestão registrada com sucesso!")
      this.form.reset();
      return true;
    } catch (error) {
      console.error('Erro ao tentar salvar no banco de dados:', error);
      return false;
    }
  }

  gravarForm(event) {
    event.preventDefault();
    const formData = {};
    const inputs = this.form.querySelectorAll('input[name]');
    const textareas = this.form.querySelectorAll('textarea[name]');

    inputs.forEach((input) => {
      formData[input.name] = input.value;
    });

    textareas.forEach((textarea) => {
      formData[textarea.name] = textarea.value;
    });

    if (!formData['nomeComercial'] || !formData['nomeFarmacologico']) {
      alert("Nome comercial e nome farmacológicos devem ser preenchidos!")
      return
    }

    formData['id'] = this.dbSugestoes.length > 0 
    ? this.dbSugestoes[this.dbSugestoes.length - 1].id + 1 
    : 1;
    this.dbSugestoes.push(formData)
    this.salvarBd();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.novaSugestaoManager = new NovaSugestaoManager();
});
