// =======================================================
//  ADMIN.JS — Painel Administrativo dos Plantões
// =======================================================

let editIndex = -1;

// ELEMENTOS
const tabela = document.querySelector("#tabela tbody");
const modalBg = document.getElementById("modalBg");
const modalImportBg = document.getElementById("modalImportBg");
const importTextarea = document.getElementById("importTextarea");
const filtroMes = document.getElementById("filtroMes");

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

modalBg.addEventListener("click", e => {
  if (e.target === modalBg) modalBg.style.display = "none";
});

// =======================================================
//  MODAL IMPORTAÇÃO
// =======================================================
window.openImportModal = function () {
  importTextarea.value = "";
  modalImportBg.style.display = "flex";
};

modalImportBg.addEventListener("click", e => {
  if (e.target === modalImportBg) modalImportBg.style.display = "none";
});

window.importarLista = function () {
  const texto = importTextarea.value.trim();
  if (!texto) return alert("Cole o JSON da lista.");

  try {
    const json = JSON.parse(texto);
    if (!Array.isArray(json)) throw "";

    const atuais = PlantoesStore.get() || [];
    const mapa = {};

    atuais.forEach(p => mapa[p.date] = p);

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
    atualizarFiltroMes();
    renderTabela();
    alert("Lista importada com sucesso!");
  } catch {
    alert("JSON inválido.");
  }
};

// =======================================================
//  FILTRO POR MÊS
// =======================================================
function atualizarFiltroMes() {
  const lista = PlantoesStore.get() || [];
  const meses = [...new Set(lista.map(p => p.date.slice(0, 7)))].sort();

  filtroMes.innerHTML = `<option value="">Todos</option>` +
    meses.map(m => `<option value="${m}">${m}</option>`).join("");
}

filtroMes.addEventListener("change", renderTabela);

// =======================================================
//  RENDER TABELA (COM FILTRO)
// =======================================================
function renderTabela() {
  let lista = PlantoesStore.get() || [];
  const mes = filtroMes.value;

  if (mes) {
    lista = lista.filter(p => p.date.startsWith(mes));
  }

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
    `)
    .join("");
}

// =======================================================
//  EXCLUIR
// =======================================================
window.excluir = function (index) {
  if (!confirm("Tem certeza que deseja excluir este plantão?")) return;

  const lista = PlantoesStore.get();
  lista.splice(index, 1);
  PlantoesStore.set(lista);

  atualizarFiltroMes();
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
    area: inpArea.value.trim().toUpperCase()
  };

  if (!novo.date || !novo.farmacia || !novo.area) {
    alert("Preencha data, farmácia e área.");
    return;
  }

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
  atualizarFiltroMes();
  renderTabela();
};

// =======================================================
//  INIT
// =======================================================
atualizarFiltroMes();
renderTabela();
