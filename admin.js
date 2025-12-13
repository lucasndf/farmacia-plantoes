// =======================================================
//  ADMIN.JS — Painel Administrativo dos Plantões
// =======================================================

let editIndex = -1;

// ELEMENTOS
const tabela = document.querySelector("#tabela tbody");
const modalBg = document.getElementById("modalBg");
const modalImportBg = document.getElementById("modalImportBg");

const inpDate = document.getElementById("inpDate");
const inpFarm = document.getElementById("inpFarm");
const inpEnd = document.getElementById("inpEnd");
const inpTel = document.getElementById("inpTel");
const inpArea = document.getElementById("inpArea");

const modalTitle = document.getElementById("modalTitle");

// =======================================================
//  MODAL NOVO / EDITAR
// =======================================================
window.openModal = function (index = -1) {
  editIndex = index;

  if (index >= 0) {
    const lista = PlantoesStore.get();
    const p = lista[index];
    modalTitle.textContent = "Editar Plantão";
    inpDate.value = p.date;
    inpFarm.value = p.farmacia;
    inpEnd.value = p.endereco;
    inpTel.value = p.telefone;
    inpArea.value = p.area;
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

// =======================================================
//  MODAL IMPORTAR (🔥 ESTAVA FALTANDO)
// =======================================================
window.openImportModal = function () {
  document.getElementById("importTextarea").value = "";
  modalImportBg.style.display = "flex";
};

// =======================================================
//  FECHAR MODAIS AO CLICAR FORA
// =======================================================
modalBg.addEventListener("click", e => {
  if (e.target === modalBg) modalBg.style.display = "none";
});

modalImportBg.addEventListener("click", e => {
  if (e.target === modalImportBg) modalImportBg.style.display = "none";
});

// =======================================================
//  RENDER TABELA
// =======================================================
function renderTabela() {
  const lista = PlantoesStore.get();

  tabela.innerHTML = lista
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
    `).join("");
}

// =======================================================
//  EXCLUIR (CONFIRMAÇÃO CLARA)
// =======================================================
window.excluir = function (index) {
  const lista = PlantoesStore.get();
  const p = lista[index];

  if (!confirm(`Excluir o plantão de ${p.farmacia} em ${p.date}?`)) return;

  lista.splice(index, 1);
  PlantoesStore.set(lista);
  renderTabela();
};

// =======================================================
//  SALVAR
// =======================================================
window.savePlantao = function () {
  if (!inpDate.value || !inpFarm.value || !inpArea.value) {
    alert("Preencha data, farmácia e área.");
    return;
  }

  const novo = {
    date: inpDate.value,
    farmacia: inpFarm.value.trim(),
    endereco: inpEnd.value.trim(),
    telefone: inpTel.value.trim(),
    area: inpArea.value.trim().toUpperCase(),
  };

  const lista = PlantoesStore.get();

  if (editIndex >= 0) {
    lista[editIndex] = novo;
  } else {
    const idx = lista.findIndex(p => p.date === novo.date);
    if (idx >= 0) {
      if (!confirm("Já existe plantão nessa data. Substituir?")) return;
      lista[idx] = novo;
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
