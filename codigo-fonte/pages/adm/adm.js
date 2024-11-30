const COR_PADRAO = "#DDDDDD";

const medicamentosJSON = localStorage.getItem("db_medicamentos");
const db_medicamentos = JSON.parse(medicamentosJSON);

function carregarUsuario() {
  var usuarioJSON = sessionStorage.getItem("usuarioAtual");
  var usuario = JSON.parse(usuarioJSON);

  var username = document.getElementById("user-name");
  username.innerHTML = usuario.nome + " " + usuario.sobrenome;
};

function logout() {
  event.preventDefault();

  sessionStorage.removeItem("usuarioAtual");
  window.location.href = "../../index.html";
};

function atualizarPerfil() {
  window.location.href = "../user-update/user-update.html";
};

function exibirModal() {
  var modal = new bootstrap.Modal(document.getElementById("modal-erro"));
  modal.show();
};

function ocultarModal() {
  var modal = new bootstrap.Modal(document.getElementById("modal-erro"));
  modal.hide();
};

function popularSeletores() {
  const seletor1 = document.getElementById("medicamento-1");
  const seletor2 = document.getElementById("medicamento-2");

  seletor1.innerHTML = '<option value="">Selecione um medicamento</option>';
  seletor2.innerHTML = '<option value="">Selecione um medicamento</option>';

  const medicamentosOrdenados = [...db_medicamentos.medicamentos].sort((a, b) =>
    a.nomeComercial.localeCompare(b.nomeComercial, "pt-BR")
  );

  medicamentosOrdenados.forEach((med) => {
    const opcao1 = new Option(
      `${med.nomeComercial} - ${med.nomeFarmacologico}`,
      med.id
    );
    const opcao2 = new Option(
      `${med.nomeComercial} - ${med.nomeFarmacologico}`,
      med.id
    );

    seletor1.add(opcao1);
    seletor2.add(opcao2);
  });
};

function encontrarMedicamentos(event) {
  // Cancela a submissão do formulário para tratar sem fazer refresh da tela
  event.preventDefault();

  var inputMedicamento1 = document.getElementById("medicamento-1");
  var inputMedicamento2 = document.getElementById("medicamento-2");

  var medicamentoInseridoId1 = inputMedicamento1.value;
  var medicamentoInseridoId2 = inputMedicamento2.value;

  if (medicamentoInseridoId1 === medicamentoInseridoId2) {
    alert("Você não pode comparar o medicamento com ele mesmo!");
    inputMedicamento2.value = "";
    return;
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
      document
        .getElementById("fechar-btn")
        .addEventListener("click", ocultarModal);
      inputMedicamento1.style.borderColor = "red";
      inputMedicamento2.style.borderColor = "red";
    } else {
      if (!medicamentoEncontrado1 && medicamentoEncontrado2) {
        medicamentoEncontrado1 = medicamentoEncontrado2;
        medicamentoEncontrado2 = null;
      }

      sessionStorage.setItem(
        "medicamento1",
        JSON.stringify(medicamentoEncontrado1)
      );
      sessionStorage.setItem(
        "medicamento2",
        JSON.stringify(medicamentoEncontrado2)
      );

      window.location.href = "../result/result.html";
    }
  }
};

popularSeletores();
carregarUsuario();

sessionStorage.removeItem("medicamentoInseridoId1");
sessionStorage.removeItem("medicamentoInseridoId2");
  
document.getElementById("atualizar-perfil-btn").addEventListener("click", atualizarPerfil);
document.getElementById("botao-comparacao-1").addEventListener("click", encontrarMedicamentos);
document.getElementById("botao-comparacao-2").addEventListener("click", encontrarMedicamentos);
