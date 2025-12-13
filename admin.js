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

// =======================================================
//  FEEDBACK SIMPLES (UX LIMPO)
// =======================================================
function feedback(msg) {
  alert(msg);
}

// =======================================================
//  ABRIR MODAL (NOVO OU EDITAR)
// =======================================================
window.openModal = function (index = -1) {
  editIndex = index;
  const lista = PlantoesStore.get();

  if (index >= 0) {
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

// Fechar modal clicando no fundo
modalBg.addEventListener("click", (e) => {
  if (e.target === modalBg) modalBg.style.display = "none";
});

// =======================================================
//  RENDERIZAR TABELA (ordenada por data)
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
//  EXCLUIR (CONFIRMAÇÃO MAIS CLARA)
// =======================================================
window.excluir = function (index) {
  const lista = PlantoesStore.get();
  const p = lista[index];

  const ok = confirm(
    `Confirma a exclusão do plantão?\n\n${p.farmacia}\nData: ${p.date}`
  );
  if (!ok) return;

  lista.splice(index, 1);
  PlantoesStore.set(lista);
  renderTabela();
  feedback("Plantão excluído com sucesso.");
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

  // Validação mínima (sem burocracia)
  if (!novo.date || !novo.farmacia || !novo.area) {
    feedback("Preencha pelo menos: Data, Farmácia e Área.");
    return;
  }

  const lista = PlantoesStore.get();

  if (editIndex >= 0) {
    lista[editIndex] = novo;
    feedback("Plantão atualizado com sucesso.");
  } else {
    const existe = lista.find(p => p.date === novo.date);

    if (existe) {
      const substituir = confirm(
        "Já existe um plantão cadastrado nessa data.\nDeseja substituir?"
      );
      if (!substituir) return;

      const idx = lista.findIndex(p => p.date === novo.date);
      lista[idx] = novo;
      feedback("Plantão substituído com sucesso.");
    } else {
      lista.push(novo);
      feedback("Plantão adicionado com sucesso.");
    }
  }

  PlantoesStore.set(lista);
  modalBg.style.display = "none";
  renderTabela();
};

// =======================================================
//  BASE PARA FUTUROS FILTROS (PRONTO)
// =======================================================
// Exemplo futuro:
// function filtrarPorArea(area) { ... }
// function filtrarPorMes(mes) { ... }

// =======================================================
//  INICIALIZAÇÃO
// =======================================================
renderTabela();
