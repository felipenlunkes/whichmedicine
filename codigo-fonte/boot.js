// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = {};
var db_noticias = {};

const dadosIniciaisNoticias = {
  noticias: [
    {
      id: 1,
      timestamp: 1732478460,
      titulo: 'Lançamento!',
      resumo: 'Estamos felizes em anunciar o lançamento da versão 1.0 do Which Medicine!',
      conteudo: 'Estamos felizes em compartilhar que a primeira versão do Which Medicine está online! A partir de agora, você tem um novo portal de informações sobre medicamentos, para manter você e sua família em segurança!',
      imagem: 'assets/logo.png'
    },
    {
      id: 2,
      timestamp: 1732478460,
      titulo: 'Paracetamol? Proibido?',
      resumo: 'Você sabia que o Paracetamol é um medicamento que foi proibido nos Estados Unidos?',
      conteudo: 'Você sabia que o Paracetamol é um medicamento que foi proibido nos Estados Unidos? Sabe por quê? Pesquisas indicam que ele apresenta ação tóxica para o fígado.',
      imagem: 'assets/paracetamol.png'
    },
    {
      id: 3,
      timestamp: 1732478460,
      titulo: 'WM & WhatsApp',
      resumo: 'Você sabia que pode compartilhar informações sobre medicamentos com seus amigos e familiares pelo WhstApp?',
      conteudo: 'Você sabia que pode compartilhar informações sobre medicamentos com seus amigos e familiares pelo WhstApp? Com essa função, você pode informar sobre interações que possam ocorrer entre medicamentos e dar mais informações sobre eles a quem precisa!',
      imagem: 'assets/icon-whatsapp.png'
    }
  ]
};

const dadosIniciaisUsuarios = {
  usuarios: [
    {
      id: 1,
      nome: 'Ísis',
      sobrenome: 'Kanitar',
      dia: 1,
      mes: 2,
      ano: 2000,
      genero: 'FEMININO',
      email: 'isis@gmail.com',
      senha: 'senha',
      eAdmin: true,
    },
    {
      id: 2,
      nome: 'Felipe',
      sobrenome: 'Lunkes',
      dia: 29,
      mes: 2,
      ano: 1996,
      genero: 'MASCULINO',
      email: 'felipe@gmail.com',
      senha: 'senha',
      eAdmin: true,
    },
    {
      id: 3,
      nome: 'Gabriel',
      sobrenome: 'Corrêa',
      dia: 11,
      mes: 11,
      ano: 1998,
      genero: 'MASCULINO',
      email: 'gabriel@gmail.com',
      senha: 'senha',
      eAdmin: false,
      comparacoesSalvas: [
        {
          idComparacao: 1,
          medicamento1: {
            idMedicamento: 2,
            nomeComercial: 'Dorflex, Royflex',
            nomeFarmacologico: 'Dipirona Sódica + Cafeina Anidra + Citrato de Orfenadrina',
          },
          medicamento2: {
            idMedicamento: 5,
            nomeComercial: 'Zoloft',
            nomeFarmacologico: 'Cloridrato de Sertralina',
          },
        },
        {
          idComparacao: 2,
          medicamento1: {
            idMedicamento: 1,
            nomeComercial: 'Dipirona',
            nomeFarmacologico: 'Dipirona Monidratada',
          },
          medicamento2: {
            idMedicamento: 5,
            nomeComercial: 'Zoloft',
            nomeFarmacologico: 'Cloridrato de Sertralina',
          },
        },
      ],
    },
    {
      id: 4,
      nome: 'Diovane',
      sobrenome: 'Marcelino',
      dia: 10,
      mes: 9,
      ano: 2004,
      genero: 'MASCULINO',
      email: 'diovane@gmail.com',
      senha: 'senha',
      eAdmin: true,
    },
    {
      id: 5,
      nome: 'João Paulo',
      sobrenome: 'Salviano',
      dia: 4,
      mes: 5,
      ano: 1999,
      genero: 'MASCULINO',
      email: 'joao@gmail.com',
      senha: 'senha',
      eAdmin: true,
    },
    {
      id: 6,
      nome: 'Fernanda',
      sobrenome: 'Novais',
      dia: 1,
      mes: 1,
      ano: 1996,
      genero: 'FEMININO',
      email: 'fernanda@gmail.com',
      senha: 'senha',
      eAdmin: true,
    },
  ],
};

const dadosIniciaisMedicamentos = {
  medicamentos: [
    {
      id: 1,
      classe: 'Analgésico',
      nomeComercial: 'Dipirona',
      nomeFarmacologico: 'Dipirona Monidratada',
      descricao:
        'Analgésico (contra dor), antipirético (contra enjoo), antitérmico (contra febre)',
      posologia:
        'Crianças: 1 gota por Kg de peso, de 6 em 6 horas. Adultos ( acima de 15 anos): 500mg por dose, de 6 em 6 horas',
      apresentacao: 'Gotas: 100mg/ml, Comprimido: 500mg e 1g',
      interacoes: [
        {
          id: 5,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Sedação',
          efeitoSevero: 'Sedação',
        },

        {
          id: 6,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Sedação',
          efeitoSevero: 'Sedação',
        },
      ],
    },

    {
      id: 2,
      classe: 'Analgésico',
      nomeComercial: 'Dorflex, Royflex',
      nomeFarmacologico: 'Dipirona Sódica + Cafeina Anidra + Citrato de Orfenadrina',
      descricao:
        'Aliavia a dor causada por contraturas musculares causadas por processos traumaticos ou inflamatórios, e em cefalécias (dor de cabeça) tensionais',
      posologia: 'Adulto: 1 a 2 comprimidos de 6 em 6 horas',
      apresentacao: 'Comprimido: 35mg/ 50mg/ 300mg',
      interacoes: [
        {
          id: 5,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Sedação',
          efeitoSevero: 'Sedação',
        },

        {
          id: 6,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Sedação',
          efeitoSevero: 'Sedação',
        },
      ],
    },

    {
      id: 3,
      classe: 'Antipirético',
      nomeComercial: 'Plasil',
      nomeFarmacologico: 'Metoclopramida',
      descricao:
        'Trata náuseas, vômitos e facilita a movimentação do estômago aliviando o enjoo',
      posologia: 'Adulto: 1 comprimido de 8 em 8 horas',
      apresentacao: 'Comprimido 10mg',
      interacoes: [
        {
          id: 6,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Sedação',
          efeitoSevero: 'Sedação',
        },

        {
          id: 5,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Não se aplica',
          efeitoSevero: 'Síndrome serotoninérgica',
        },
      ],
    },

    {
      id: 4,
      classe: 'Anti-inflamatório',
      nomeComercial: 'Ibuprofeno',
      nomeFarmacologico: 'Ibuprofeno',
      descricao: 'Indicado para redução da febre e alívio das dores',
      posologia:
        'Criança: 1 gota por kg de peso de 8 em 8 horas, Adulto: 1 comprimido de 8 em 8 horas',
      apresentacao: 'Gotas: 200mg/ml, Comprimido: 400mg/ 600mg, Cápsulas: 400mg',
      interacoes: [
        {
          id: 7,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Reduz o efeito do controle da pressão',
          efeitoSevero: 'Aumenta o risco de problemas renais',
        },

        {
          id: 9,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Risco a toxicidade renal aumentada',
          efeitoSevero: 'Risco de lesão renal',
        },
      ],
    },

    {
      id: 5,
      classe: 'Antidepressivo',
      nomeComercial: 'Zoloft',
      nomeFarmacologico: 'Cloridrato de Sertralina',
      descricao:
        'Age diretamente no cérebro aumentando os níveis de serotonina, um neurotransmissor essencial para o humor',
      posologia: 'Indefinido',
      apresentacao: 'Comprimido: 50mg/ 100mg',
      interacoes: [
        {
          id: 6,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Sedação, sonolência',
          efeitoSevero: 'Sedação intensa',
        },
      ],
    },

    {
      id: 6,
      classe: 'Anseolítico',
      nomeComercial: 'Rivotril',
      nomeFarmacologico: 'Clonazepam',
      descricao:
        'Indicado para transtorno de ansiedade, transtorno de humor, síndromes psicóticas, síndrome das pernas inquietas',
      posologia:
        'Gotas: tomar 2 a 3 gotas de 12 em 12 horas, Comprimido: 1 comprimido ao dia por 3 dias',
      apresentacao:
        'Gotas: 2,5mg/20ml , Comprimido Sublingual: 0,25mg, Comprimido: 0,5mg/ 2mg',
      interacoes: [
        {
          id: 1,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Sedação',
          efeitoSevero: 'Sedação',
        },

        {
          id: 2,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Sedação',
          efeitoSevero: 'Sedação',
        },
        {
          id: 5,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Sedação, sonolência',
          efeitoSevero: 'Sedação intensa',
        },
        {
          id: 3,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Sedação',
          efeitoSevero: 'Sedação',
        },
      ],
    },

    {
      id: 7,
      classe: 'Anti-Hipertensivo',
      nomeComercial: 'Captopril',
      nomeFarmacologico: 'Captopril',
      descricao: 'Recomendado no tratamento da pressão alta. Apresenta ação diurética',
      posologia: 'Adulto: 0,5mg a 2mg por dia em dose única',
      apresentacao: 'Comprimido: 12,5mg/ 25mg/ 50mg',
      interacoes: [
        {
          id: 4,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Reduz o efeito do controle da pressão',
          efeitoSevero: 'Aumenta o risco de problemas renais',
        },
        {
          id: 10,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Não se aplica',
          efeitoSevero: 'Risco de Hepatotoxicidade (toxicidade o fígado)',
        },
      ],
    },

    {
      id: 8,
      classe: ' Antilipêmico',
      nomeComercial: 'Sinvastatina',
      nomeFarmacologico: 'Sinvastatina',
      descricao:
        'Reduz os riscos de doenças cardiovasculares, controlando os níveis de colesterol no sangue',
      posologia: 'Adulto: 5 a 80mg por dia em dose única, à noite',
      apresentacao: 'Comprimido: 5mg/ 10mg/ 20mg/ 40mg/ 80mg',
      interacoes: [
        {
          id: 10,
          efeitoLeve: 'Alterar a função hepática',
          efeitoModerado: 'Não se aplica',
          efeitoSevero: 'Não se aplica',
        },
      ],
    },

    {
      id: 9,
      classe: 'Antidiabético',
      nomeComercial: 'Glifage',
      nomeFarmacologico: 'Metformina',
      descricao:
        'Associado a um dieta apropriada, é utilizado para o tratamento de Diabetes do tipo 2',
      posologia: 'Adulto: 1 comprimido ao dia',
      apresentacao: 'Comprimido: 500mg/ 850mg/ 1g',
      interacoes: [
        {
          id: 4,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Risco a toxicidade renal aumentada',
          efeitoSevero: 'Risco de lesão renal',
        },
      ],
    },

    {
      id: 10,
      classe: 'Antibiótico',
      nomeComercial: 'Clavulim',
      nomeFarmacologico: 'Amoxicilina + Clavulanato de Potássio',
      descricao:
        'Indicado ara tratamento de infecções em diferentes partes do corpo, causadas por determinados tipos de bactérias',
      posologia:
        'Adulto e crianças acima dos 12 anos: 1 comprimido de 8 em 8 horas por 7 dias',
      apresentacao:
        'Comprimido: Amoxicilina 500mg + Clavulanato de Potássio 125mg/ Amoxicilina 875mg + Clavulanato de Potássio 125mg',
      interacoes: [
        {
          id: 7,
          efeitoLeve: 'Não se aplica',
          efeitoModerado: 'Não se aplica',
          efeitoSevero: 'Risco de Hepatotoxicidade (toxicidade o fígado)',
        },
        {
          id: 10,
          efeitoLeve: 'Alterar a função hepática',
          efeitoModerado: 'Não se aplica',
          efeitoSevero: 'Não se aplica',
        },
      ],
    },
  ],
};

const dadosIniciaisUserSugestions = {
  sugestoes: [
    {
      id: 1,
      nomeFarmacologico: 'Fluoxetina',
      nomeComercial: 'Prozac',
      dataSolicitacao: '1731639134',
    },
    {
      id: 2,
      nomeFarmacologico: 'Sertralina',
      nomeComercial: 'Zoloft',
      dataSolicitacao: '1731639267',
    },
    {
      id: 3,
      nomeFarmacologico: 'Risperidona',
      nomeComercial: 'Risperdal',
      dataSolicitacao: '1731639348',
    },
    {
      id: 4,
      nomeFarmacologico: 'Amitriptilina',
      nomeComercial: 'Amitriptilina',
      dataSolicitacao: '1731639423',
    },
    {
      id: 5,
      nomeFarmacologico: 'Topiramato',
      nomeComercial: 'Topamax',
      dataSolicitacao: '1731639521',
    },
    {
      id: 6,
      nomeFarmacologico: 'Clonidina',
      nomeComercial: 'Catapres',
      dataSolicitacao: '1731639620',
    },
    {
      id: 7,
      nomeFarmacologico: 'Montelukaste',
      nomeComercial: 'Singulair',
      dataSolicitacao: '1731639742',
    },
    {
      id: 8,
      nomeFarmacologico: 'Loratadina',
      nomeComercial: 'Claritin',
      dataSolicitacao: '1731639816',
    },
    {
      id: 9,
      nomeFarmacologico: 'Esomeprazol',
      nomeComercial: 'Nexium',
      dataSolicitacao: '1731639919',
    },
    {
      id: 10,
      nomeFarmacologico: 'Citrato de Sildenafila',
      nomeComercial: 'Viagra',
      dataSolicitacao: '1731640003',
    },
  ],
};

// Popula a base de usuários
// Entrada: nada
// Saída: nada
function initBaseUsuarios() {
  // Obtem a string JSON com os dados de usuários a partir do localStorage
  var usuariosJSON = localStorage.getItem('db_usuarios');

  // Verifica se existem dados já armazenados no localStorage
  if (!usuariosJSON) {
    // Copia os dados iniciais para o banco de dados, caso não exista uma chave no localStorage
    db_usuarios = dadosIniciaisUsuarios;

    // Salva os dados iniciais no localStorage convertendo-os para string
    localStorage.setItem('db_usuarios', JSON.stringify(dadosIniciaisUsuarios));
  } else {
    // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
    db_usuarios = JSON.parse(usuariosJSON);
  }
}

// Popula a base de medicamentos
// Entrada: nada
// Saída: nada

async function initBaseMedicamentos() {
  try {
    var medicamentosJSON = localStorage.getItem('db_medicamentos');
    if (!medicamentosJSON) {
      db_medicamentos = dadosIniciaisMedicamentos;
  
      localStorage.setItem('db_medicamentos', JSON.stringify(dadosIniciaisMedicamentos));
    } else {
      db_medicamentos = JSON.parse(medicamentosJSON);
    }
    const isInitialized = await verificaDbJaFoiInicializada();
    if (!isInitialized) {
      const loadPromises = [];
      for (let id = 1; id <= 10; id++) {
        loadPromises.push(carregarImagensAssets(id));
      }
      await Promise.all(loadPromises);
    }
  } catch (error) {
    console.error('Erro ao carregar as imagens de medicamentos:', error);
  } finally {
    fecharDB();
  }
}

// Abre e inicializa o IndexedDB
let dbConnection = null;
async function abrirImageDB() {
  if (dbConnection) {
    return dbConnection;
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MedicationImages');

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbConnection = request.result;
      resolve(dbConnection);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id' });
      }
    };
  });
}

async function verificaDbJaFoiInicializada() {
  try {
    const db = await abrirImageDB();
    const transaction = db.transaction(['images'], 'readonly');
    const store = transaction.objectStore('images');
    
    const checks = [];
    for (let id = 1; id <= 10; id++) {
      checks.push(new Promise((resolve) => {
        const request = store.get(id);
        request.onsuccess = () => resolve(!!request.result);
      }));
    }
    
    const results = await Promise.all(checks);
    return results.every(exists => exists);
  } catch (error) {
    console.error('Erro em verificaDbJaFoiInicializada:', error);
    return false;
  }
}

async function carregarImagensAssets(id) {
  try {
    const response = await fetch(`assets/med-${id}.png`);
    const blob = await response.blob();
    
    const db = await abrirImageDB();
    const transaction = db.transaction(['images'], 'readwrite');
    const store = transaction.objectStore('images');
    
    return new Promise((resolve, reject) => {
      const request = store.put({
        id: id,
        image: blob
      });
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`Erro ao carregar imagem do medicamento id ${id}:`, error);
  } finally {
    fecharDB();
  }
}

function fecharDB() {
  if (dbConnection) {
    dbConnection.close();
    dbConnection = null;
  }
}

// Popula a base de sugestões
// Entrada: nada
// Saida: nada
function initBaseSugestoes() {
  let sugestoesJSON = localStorage.getItem('db_sugestoes');

  if (!sugestoesJSON) {
    db_sugestoes = dadosIniciaisUserSugestions;

    localStorage.setItem('db_sugestoes', JSON.stringify(dadosIniciaisUserSugestions));
  } else {
    db_sugestoes = JSON.parse(sugestoesJSON);
  }
}

// Popula a base de notícias
// Entrada: nada
// Saída: nada
async function initBaseNoticias() {
  var noticiasJSON = localStorage.getItem('db_noticias');

  if (!noticiasJSON) {
    db_noticias = dadosIniciaisNoticias;

    localStorage.setItem('db_noticias', JSON.stringify(dadosIniciaisNoticias));
  } else {
    db_noticias = JSON.parse(noticiasJSON);
  }
};


// Popular a base inicial de dados, caso ela não exista
initBaseUsuarios();

initBaseMedicamentos().catch((error) => {
  console.error('Error ao inicializar a base de medicamentos:', error);
});
initBaseSugestoes();
initBaseNoticias();
