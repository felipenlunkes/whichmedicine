const COR_PADRAO = '#DDDDDD';

const medicamentosJSON = localStorage.getItem('db_medicamentos');
const db_medicamentos = JSON.parse(medicamentosJSON);

function carregarUsuario() {
  var usuarioJSON = sessionStorage.getItem('usuarioAtual');
  var usuario = JSON.parse(usuarioJSON);

  var username = document.getElementById('user-name');
  username.innerHTML = usuario.nome + ' ' + usuario.sobrenome;
}

function logout() {
  event.preventDefault();

  sessionStorage.removeItem('usuarioAtual');
  window.location.href = '../../index.html';
}

function renderizarLista() {
  const dbComparacoesUsuario = JSON.parse(
    sessionStorage.getItem('usuarioAtual')
  ).comparacoesSalvas;
  const parentElement = document.getElementById('lista-comparacoes');

  if (dbComparacoesUsuario.length === 0) {
    const itemSemComparacao = document.createElement('li');
    itemSemComparacao.classList.add(
      'd-flex',
      'justify-content-center',
      'align-items-center'
    );

    itemSemComparacao.innerHTML = `
        <span class="text-center">
            Você não possui nenhuma comparação salva por enquanto...
        </span>
    `;

    parentElement.append(itemSemComparacao);
  } else {
    dbComparacoesUsuario.forEach((comparacao) => {
      const itemLista = document.createElement('li');
      itemLista.classList.add(
        'list-group-item',
        'd-flex',
        'flex-row',
        'flex-nowrap',
        'justify-content-between',
        'py-4'
      );

      itemLista.innerHTML = `
                <span class="align-top">
                    ${comparacao.medicamento1.nomeComercial} 
                    <strong>VS</strong> 
                    ${comparacao.medicamento2.nomeComercial}
                </span>
                <div>
                  <button onclick="handleRemoverComparacao(${comparacao.idComparacao})"class="rounded-circle overflow-hidden">
                      <svg
                          width="22"
                          height="20"
                          viewBox="0 0 22 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                      <path
                          d="M10.8992 20L9.3188 18.5613C3.70572 13.4714 0 10.1144 0 5.99455C0 2.6376 2.6376 0 5.99455 0C7.89101 0 9.71117 0.882834 10.8992 2.27793C12.0872 0.882834 13.9074 0 15.8038 0C19.1608 0 21.7984 2.6376 21.7984 5.99455C21.7984 10.1144 18.0926 13.4714 12.4796 18.5722L10.8992 20Z"
                          fill="#4C72B2"
                      />
                      </svg>
                  </button>
                  <button onclick="irParaComparacaoSalva(${comparacao.medicamento1.idMedicamento}, ${comparacao.medicamento2.idMedicamento})" class="rounded-circle overflow-hidden">
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.2806 9.21997L10.2806 0.219966C10.1757 0.114957 10.042 0.0434315 9.89648 0.0144437C9.75092 -0.0145441 9.60003 0.00030937 9.46291 0.0571237C9.32579 0.113938 9.20861 0.210159 9.12621 0.333604C9.04381 0.457049 8.99988 0.602169 9 0.750591V4.50059H1.5C1.10218 4.50059 0.720644 4.65863 0.43934 4.93993C0.158035 5.22124 0 5.60277 0 6.00059V13.5006C0 13.8984 0.158035 14.2799 0.43934 14.5613C0.720644 14.8426 1.10218 15.0006 1.5 15.0006H9V18.7506C8.99988 18.899 9.04381 19.0441 9.12621 19.1676C9.20861 19.291 9.32579 19.3872 9.46291 19.4441C9.60003 19.5009 9.75092 19.5157 9.89648 19.4867C10.042 19.4578 10.1757 19.3862 10.2806 19.2812L19.2806 10.2812C19.3504 10.2116 19.4057 10.1288 19.4434 10.0378C19.4812 9.94675 19.5006 9.84915 19.5006 9.75059C19.5006 9.65203 19.4812 9.55443 19.4434 9.46339C19.4057 9.37234 19.3504 9.28962 19.2806 9.21997ZM10.5 16.9403V14.2506C10.5 14.0517 10.421 13.8609 10.2803 13.7203C10.1397 13.5796 9.94891 13.5006 9.75 13.5006H1.5V6.00059H9.75C9.94891 6.00059 10.1397 5.92157 10.2803 5.78092C10.421 5.64027 10.5 5.4495 10.5 5.25059V2.5609L17.6897 9.75059L10.5 16.9403Z"
                          fill="#4C72B2"
                        />
                      </svg>

                  </button>
                </div>
        `;
      parentElement.append(itemLista);
    });
  }
}

function exibirModal() {
  var modal = new bootstrap.Modal(document.getElementById('modal-erro'));
  modal.show();
}

function ocultarModal() {
  var modal = new bootstrap.Modal(document.getElementById('modal-erro'));
  modal.hide();
}

function popularSeletores() {
  const seletor1 = document.getElementById('medicamento-1');
  const seletor2 = document.getElementById('medicamento-2');

  seletor1.innerHTML = '<option value="">Selecione um medicamento</option>';
  seletor2.innerHTML = '<option value="">Selecione um medicamento</option>';

  const medicamentosOrdenados = [...db_medicamentos.medicamentos].sort((a, b) =>
    a.nomeComercial.localeCompare(b.nomeComercial, 'pt-BR')
  );

  medicamentosOrdenados.forEach((med) => {
    const opcao1 = new Option(`${med.nomeComercial} - ${med.nomeFarmacologico}`, med.id);
    const opcao2 = new Option(`${med.nomeComercial} - ${med.nomeFarmacologico}`, med.id);

    seletor1.add(opcao1);
    seletor2.add(opcao2);
  });
}

function irParaComparacaoSalva(idMed1, idMed2) {
  const dbMedicamentos = JSON.parse(localStorage.getItem('db_medicamentos'));

  console.log(idMed1, idMed2);

  let medIndex1 = dbMedicamentos.medicamentos.findIndex((med) => med.id === idMed1);
  let medIndex2 = dbMedicamentos.medicamentos.findIndex((med) => med.id === idMed2);

  let medicamento1 = dbMedicamentos.medicamentos.slice(medIndex1, medIndex1 + 1);
  let medicamento2 = dbMedicamentos.medicamentos.slice(medIndex2, medIndex2 + 1);

  sessionStorage.setItem('medicamento1', JSON.stringify(medicamento1[0]));
  sessionStorage.setItem('medicamento2', JSON.stringify(medicamento2[0]));

  window.location.href = '../result/result.html';
}

function encontrarMedicamentos(event) {
  // Cancela a submissão do formulário para tratar sem fazer refresh da tela
  event.preventDefault();

  var inputMedicamento1 = document.getElementById('medicamento-1');
  var inputMedicamento2 = document.getElementById('medicamento-2');

  var medicamentoInseridoId1 = inputMedicamento1.value;
  var medicamentoInseridoId2 = inputMedicamento2.value;

  if (medicamentoInseridoId1 === medicamentoInseridoId2) {
    alert('Você não pode comparar o medicamento com ele mesmo!');
    inputMedicamento2.value = '';
    return;
  }

  inputMedicamento1.style.borderColor = COR_PADRAO;
  inputMedicamento2.style.borderColor = COR_PADRAO;

  let valido = true;

  if (!medicamentoInseridoId1) {
    inputMedicamento1.style.borderColor = 'red';
    inputMedicamento1.placeholder = 'Obrigatório';
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
      if (medicamentoInseridoId2 && medicamento.id == medicamentoInseridoId2) {
        medicamentoEncontrado2 = { ...medicamentoEncontrado2, ...medicamento };
      }
    }

    if (!medicamento) {
      for (var i = 0; i < db_medicamentos.medicamentos.length; i++) {
        var medicamento = db_medicamentos.medicamentos[i];

        // Se encontrou, carrega o primeiro medicamento no sessionStorage
        if (medicamento.id == medicamentoInseridoId1) {
          medicamentoEncontrado1 = {
            ...medicamentoEncontrado1,
            ...medicamento,
          };
        }
      }
    }

    if (medicamentoInseridoId2 && !medicamentoEncontrado2) {
      for (var i = 0; i < db_medicamentos.medicamentos.length; i++) {
        var medicamento = db_medicamentos.medicamentos[i];

        // Se encontrou, carrega o primeiro medicamento no sessionStorage
        if (medicamento.id == medicamentoInseridoId2) {
          medicamentoEncontrado2 = {
            ...medicamentoEncontrado2,
            ...medicamento,
          };
        }
      }
    }

    if (!medicamentoEncontrado1 && !medicamentoEncontrado2) {
      exibirModal();
      document.getElementById('fechar-btn').addEventListener('click', ocultarModal);
      inputMedicamento1.style.borderColor = 'red';
      inputMedicamento2.style.borderColor = 'red';
    } else {
      if (!medicamentoEncontrado1 && medicamentoEncontrado2) {
        medicamentoEncontrado1 = medicamentoEncontrado2;
        medicamentoEncontrado2 = null;
      }

      sessionStorage.setItem('medicamento1', JSON.stringify(medicamentoEncontrado1));
      sessionStorage.setItem('medicamento2', JSON.stringify(medicamentoEncontrado2));

      window.location.href = '../result/result.html';
    }
  }
}

function handleRemoverComparacao(idComp) {
  const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioAtual'));
  const dbUsuarios = JSON.parse(localStorage.getItem('db_usuarios'));

  const indexComparacao = usuarioLogado.comparacoesSalvas.findIndex(
    (med) => med.idComparacao === idComp
  );
  // remove a comparacao da sessao do usuario
  usuarioLogado.comparacoesSalvas.splice(indexComparacao, 1);

  sessionStorage.setItem('usuarioAtual', JSON.stringify(usuarioLogado));

  // remove comparação do localStorage
  const userIndex = dbUsuarios.usuarios.findIndex(
    (userIndex) => userIndex.id === usuarioLogado.id
  );
  dbUsuarios.usuarios[userIndex].comparacoesSalvas.splice(indexComparacao, 1);

  localStorage.setItem('db_usuarios', JSON.stringify(dbUsuarios));

  location.reload();
}

function atualizarPerfil() {
  window.location.href = '../user-update/user-update.html';
}

popularSeletores();

carregarUsuario();
renderizarLista();

sessionStorage.removeItem('medicamentoInseridoId1');
sessionStorage.removeItem('medicamentoInseridoId2');

document.getElementById('atualizar-perfil-btn').addEventListener('click', atualizarPerfil);
document
  .getElementById('botao-comparacao-1')
  .addEventListener('click', encontrarMedicamentos);
document
  .getElementById('botao-comparacao-2')
  .addEventListener('click', encontrarMedicamentos);
