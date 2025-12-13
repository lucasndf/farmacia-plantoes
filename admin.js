// =======================================================
//  ADMIN.JS — Painel Administrativo dos Plantões
// =======================================================

let editIndex = -1;

// ELEMENTOS
const tabela = document.querySelector("#tabela tbody");
const modalBg = document.getElementById("modalBg");

const inpDate = document.getElementById("inpDate");
const inpFarm = document.getElementById("inpFarm");
const inpEnd = document.getElementById("inpEnd");
const inpTel = document.getElementById("inpTel");
const inpArea = document.getElementById("inpArea");

const modalTitle = document.getElementById("modalTitle");

// =======================================================
//  ABRIR MODAL
// =======================================================
window.openModal = function (index = -1) {
  editIndex = index;

  if (index >= 0) {
    const lista = PlantoesStore.get();
    const p = lista[index];

    modalTitle.textContent = "Editar Plantão";

    inpDate.value = p.date || "";
    inpFarm.value = p.farmacia || "";
    inpEnd.value = p.endereco || "";
    inpTel.value = p.telefone || "";
    inpArea.value = p.area || "";
  } else {
    modalTitle.textContent = "Novo Plantão";

    inpDate.value = "";
    inpFarm.value = "";
    inpEnd.value = "";
    inpTel.value = "";
    inpArea.value = "";
  }

  modalBg.style.display = "flex";
};

// FECHAR MODAL
modalBg.addEventListener("click", e => {
  if (e.target === modalBg) modalBg.style.display = "none";
});

// =======================================================
//  RENDERIZAR TABELA  ✅ AGORA GLOBAL
// =======================================================
function renderTabela() {
  const lista = PlantoesStore.get() || [];

  tabela.innerHTML = lista
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((p, i) => `
      <tr>
        <td>${p.date}</td>
        <td>${p.farmacia}</td>
        <td>${p.area}</td>
        <td>${p.telefone || "-"}</td>
        <td>
          <button class="btn-small" onclick="openModal(${i})">Editar</button>
          <button class="btn-small" onclick="excluir(${i})">Excluir</button>
        </td>
      </tr>
    `)
    .join("");
}

// 🔑 EXPÕE PARA O HTML
window.renderTabela = renderTabela;

// =======================================================
//  EXCLUIR
// =======================================================
window.excluir = function (index) {
  if (!confirm("Tem certeza que deseja excluir este plantão?")) return;

  const lista = PlantoesStore.get();
  lista.splice(index, 1);

  PlantoesStore.set(lista);
  renderTabela();
};

// =======================================================
//  SALVAR
// =======================================================
window.savePlantao = function () {
  const novo = {
    date: inpDate.value,
    farmacia: inpFarm.value.trim(),
    endereco: inpEnd.value.trim(),
    telefone: inpTel.value.trim(),
    area: inpArea.value.trim().toUpperCase(),
  };

  if (!novo.date || !novo.farmacia || !novo.area) {
    alert("Preencha data, farmácia e área.");
    return;
  }

  const lista = PlantoesStore.get();

  if (editIndex >= 0) {
    lista[editIndex] = novo;
  } else {
    const existe = lista.find(p => p.date === novo.date);
    if (existe) {
      if (!confirm("Já existe plantão nessa data. Deseja substituir?")) return;
      lista[lista.findIndex(p => p.date === novo.date)] = novo;
    } else {
      lista.push(novo);
    }
  }

  PlantoesStore.set(lista);
  modalBg.style.display = "none";
  renderTabela();
};

// =======================================================
//  INIT
// =======================================================
renderTabela();

// =======================================================
//  IMPORTAÇÃO DE LISTA
// =======================================================

const modalImportBg = document.getElementById("modalImportBg");
const importTextarea = document.getElementById("importTextarea");

// ABRIR MODAL DE IMPORTAÇÃO
window.openImportModal = function () {
  importTextarea.value = "";
  modalImportBg.style.display = "flex";
};

// FECHAR MODAL AO CLICAR FORA
modalImportBg.addEventListener("click", e => {
  if (e.target === modalImportBg) {
    modalImportBg.style.display = "none";
  }
});

// IMPORTAR LISTA
window.importarLista = function () {
  const texto = importTextarea.value.trim();
  if (!texto) {
    alert("Cole o JSON da lista.");
    return;
  }

  try {
    const json = JSON.parse(texto);
    if (!Array.isArray(json)) throw new Error();

    const atuais = PlantoesStore.get() || [];
    const mapa = {};

    // mantém os existentes
    atuais.forEach(p => mapa[p.date] = p);

    // substitui ou adiciona os novos
    json.forEach(p => {
      mapa[p.date] = {
        date: p.date,
        farmacia: p.farmacia,
        endereco: p.endereco,
        telefone: p.telefone,
        area: p.area.toUpperCase()
      };
    });

    PlantoesStore.set(Object.values(mapa));
    modalImportBg.style.display = "none";
    renderTabela();
    alert("Lista importada com sucesso!");

  } catch (e) {
    alert("JSON inválido.");
  }
};


