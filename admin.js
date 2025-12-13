// =======================================================
//  ADMIN.JS — Painel Administrativo dos Plantões
// =======================================================

// Índice usado quando clicar em editar
let editIndex = -1;

// ELEMENTOS DO PAINEL
const tabela = document.querySelector("#tabela tbody");
const modalBg = document.getElementById("modalBg");

const inpDate = document.getElementById("inpDate");
const inpFarm = document.getElementById("inpFarm");
const inpEnd = document.getElementById("inpEnd");
const inpTel = document.getElementById("inpTel");
const inpArea = document.getElementById("inpArea");

const modalTitle = document.getElementById("modalTitle");

// IMPORTAÇÃO
const modalImportBg = document.getElementById("modalImportBg");
const importTextarea = document.getElementById("importTextarea");

// =======================================================
//  ABRIR MODAL (NOVO OU EDITAR)
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

// Fechar modal clicando fora
modalBg.addEventListener("click", (e) => {
  if (e.target === modalBg) modalBg.style.display = "none";
});

// =======================================================
//  RENDERIZAR TABELA (ORDENADA POR DATA)
// =======================================================
function renderTabela() {
  const lista = PlantoesStore.get() || [];

  tabela.innerHTML = lista
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(
      (p, i) => `
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
    `
    )
    .join("");
}

// =======================================================
//  EXCLUIR PLANTÃO (CONFIRMAÇÃO CLARA)
// =======================================================
window.excluir = function (index) {
  const lista = PlantoesStore.get();
  const p = lista[index];

  const ok = confirm(
    `Deseja realmente excluir o plantão?\n\n📅 ${p.date}\n🏥 ${p.farmacia}`
  );

  if (!ok) return;

  lista.splice(index, 1);
  PlantoesStore.set(lista);
  renderTabela();

  alert("Plantão excluído com sucesso.");
};

// =======================================================
//  SALVAR (ADICIONAR OU EDITAR)
// =======================================================
window.savePlantao = function () {
  const novo = {
    date: inpDate.value,
    farmacia: inpFarm.value.trim(),
    endereco: inpEnd.value.trim(),
    telefone: inpTel.value.trim(),
    area: inpArea.value.trim().toUpperCase(),
  };

  // VALIDAÇÃO MÍNIMA
  if (!novo.date || !novo.farmacia || !novo.area) {
    alert("Preencha pelo menos Data, Farmácia e Área.");
    return;
  }

  const lista = PlantoesStore.get();

  if (editIndex >= 0) {
    lista[editIndex] = novo;
  } else {
    // Evita duplicar mesma data
    const existe = lista.find(p => p.date === novo.date);

    if (existe) {
      const ok = confirm(
        "Já existe um plantão nesta data.\nDeseja substituir?"
      );
      if (!ok) return;

      const idx = lista.findIndex(p => p.date === novo.date);
      lista[idx] = novo;
    } else {
      lista.push(novo);
    }
  }

  PlantoesStore.set(lista);
  modalBg.style.display = "none";
  renderTabela();

  alert("Plantão salvo com sucesso.");
};

// =======================================================
//  IMPORTAR LISTA (JSON)
// =======================================================
window.openImportModal = function () {
  importTextarea.value = "";
  modalImportBg.style.display = "flex";
};

modalImportBg.addEventListener("click", (e) => {
  if (e.target === modalImportBg) modalImportBg.style.display = "none";
});

window.importarLista = function () {
  const texto = importTextarea.value.trim();

  if (!texto) {
    alert("Cole o JSON da lista de plantões.");
    return;
  }

  try {
    const json = JSON.parse(texto);

    if (!Array.isArray(json)) throw new Error();

    const atuais = PlantoesStore.get();
    const mapa = {};

    // mantém os atuais
    atuais.forEach(p => mapa[p.date] = p);

    // sobrescreve com os importados
    json.forEach(p => {
      if (p.date && p.farmacia && p.area) {
        mapa[p.date] = p;
      }
    });

    PlantoesStore.set(Object.values(mapa));
    modalImportBg.style.display = "none";
    renderTabela();

    alert("Lista importada com sucesso!");
  } catch {
    alert("JSON inválido. Verifique o formato.");
  }
};

// =======================================================
//  INICIALIZAÇÃO
// =======================================================
renderTabela();
