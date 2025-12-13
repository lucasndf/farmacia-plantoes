// =======================================================
//  ADMIN.JS — Painel Administrativo dos Plantões
// =======================================================

// Índice usado quando clicar em editar
let editIndex = -1;

// ELEMENTOS DO PAINEL
const tabela = document.getElementById("tabela").querySelector("tbody");
const modalBg = document.getElementById("modalBg");

const inpDate = document.getElementById("inpDate");
const inpFarm = document.getElementById("inpFarm");
const inpEnd = document.getElementById("inpEnd");
const inpTel = document.getElementById("inpTel");
const inpArea = document.getElementById("inpArea");

const modalTitle = document.getElementById("modalTitle");

// =======================================================
//  ABRIR MODAL (NOVO OU EDITAR)
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

// Fechar modal clicando no fundo
modalBg.addEventListener("click", (e) => {
  if (e.target === modalBg) modalBg.style.display = "none";
});

// =======================================================
//  RENDERIZAR TABELA
// =======================================================
function renderTabela() {
  const lista = PlantoesStore.get();

  tabela.innerHTML = lista
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(
      (p, i) => `
      <tr>
        <td>${p.date}</td>
        <td>${p.farmacia}</td>
        <td>${p.area}</td>
        <td>${p.telefone}</td>
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
//  EXCLUIR PLANTÃO
// =======================================================
window.excluir = function (index) {
  if (!confirm("Tem certeza que deseja excluir este plantão?")) return;

  const lista = PlantoesStore.get();
  lista.splice(index, 1);

  PlantoesStore.set(lista);
  renderTabela();
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

  if (!novo.date || !novo.farmacia || !novo.area) {
    alert("Preencha data, farmácia e área.");
    return;
  }

  const lista = PlantoesStore.get();

  if (editIndex >= 0) {
    lista[editIndex] = novo;
  } else {
    lista.push(novo);
  }

  PlantoesStore.set(lista);
  modalBg.style.display = "none";
  renderTabela();
};

// =======================================================
//  INICIALIZAÇÃO
// =======================================================
renderTabela();
