// ======================================================
//  DATA.JS — Banco de dados local dos plantões
//  Compartilhado entre o site e o painel administrativo
// ======================================================

// Chave usada no localStorage
const PLANTOES_STORAGE_KEY = "patosPlantoesData";

// ======================================================
//  DADOS OFICIAIS BASE (PROCON — DEZEMBRO 2025)
// ======================================================
const dadosPlantoesBase = [
  {
    date: "2025-12-01",
    farmacia: "DROGARIA (+ FARMA)",
    endereco: "Av. Solon de Lucena, nº 38 - Centro",
    telefone: "(83) 99884-3827",
    area: "CENTRO"
  },
  {
    date: "2025-12-02",
    farmacia: "FARMASS",
    endereco: "R. Horácio Nóbrega, 825 - Belo Horizonte",
    telefone: "(83) 3421-6390",
    area: "NORTE"
  },
  {
    date: "2025-12-03",
    farmacia: "FARMÁCIA MAIS POPULAR",
    endereco: "Rua Doutor Romero Nóbrega S/N - Maternidade",
    telefone: "(83) 99145-8081",
    area: "OESTE"
  },
  {
    date: "2025-12-04",
    farmacia: "LINDA FARMA",
    endereco: "R. Horácio Nóbrega, 820 - Belo Horizonte",
    telefone: "(83) 3421-4433 / (83) 99809-1954",
    area: "NORTE"
  },
  {
    date: "2025-12-05",
    farmacia: "DROGARIA MIX POPULAR",
    endereco: "R. Dr. José Jeunino, nº 272 - Centro",
    telefone: "(83) 99615-7930 / (83) 3400-0086",
    area: "CENTRO"
  },
  {
    date: "2025-12-06",
    farmacia: "FARMÁCIA SANTA MARIA (ZEFINHA)",
    endereco: "R. Bossuet Wanderley, 207 - Centro",
    telefone: "(83) 3421-1198 / (83) 98825-3147",
    area: "CENTRO"
  },
  {
    date: "2025-12-07",
    farmacia: "PAGUE MENOS",
    endereco: "R. Horácio Nóbrega, 409 - Belo Horizonte",
    telefone: "(83) 4002-8282 / (83) 99683-7803",
    area: "NORTE"
  },
  {
    date: "2025-12-08",
    farmacia: "MEGAFARMA",
    endereco: "Av. Epitácio Pessoa, 227 - Centro",
    telefone: "(83) 99357-3030",
    area: "CENTRO"
  },
  {
    date: "2025-12-09",
    farmacia: "DROGARIA (+ FARMA)",
    endereco: "Av. Solon de Lucena, nº 38 - Centro",
    telefone: "(83) 99884-3827",
    area: "CENTRO"
  },
  {
    date: "2025-12-10",
    farmacia: "FARMASS",
    endereco: "R. Horácio Nóbrega, 825 - Belo Horizonte",
    telefone: "(83) 3421-6390",
    area: "NORTE"
  },
  {
    date: "2025-12-11",
    farmacia: "FARMÁCIA MEGA POPULAR",
    endereco: "R. do Prado, 1287 - SALA B - Liberdade",
    telefone: "(83) 98190-3523",
    area: "OESTE"
  },
  {
    date: "2025-12-12",
    farmacia: "DROGASIL",
    endereco: "Pç. Pres. Getúlio Vargas, 16 - Centro",
    telefone: "(83) 98178-6099",
    area: "CENTRO"
  },
  {
    date: "2025-12-13",
    farmacia: "DROGARIA (+ FARMA)",
    endereco: "Av. Solon de Lucena, nº 38 - Centro",
    telefone: "(83) 99884-3827",
    area: "CENTRO"
  },
  {
    date: "2025-12-14",
    farmacia: "MEGAFARMA",
    endereco: "Av. Epitácio Pessoa, 227 - Centro",
    telefone: "(83) 99357-3030",
    area: "CENTRO"
  },
  {
    date: "2025-12-15",
    farmacia: "DROGARIA (+ FARMA)",
    endereco: "Av. Solon de Lucena, nº 38 - Centro",
    telefone: "(83) 99884-3827",
    area: "CENTRO"
  },
  {
    date: "2025-12-16",
    farmacia: "DROGARIA (+ FARMA)",
    endereco: "Av. Solon de Lucena, nº 38 - Centro",
    telefone: "(83) 99884-3827",
    area: "CENTRO"
  },
  {
    date: "2025-12-17",
    farmacia: "FARMÁCIA LACERDA",
    endereco: "R. Horácio Nóbrega, 1716 - Belo Horizonte",
    telefone: "(83) 99895-4854",
    area: "NORTE"
  },
  {
    date: "2025-12-18",
    farmacia: "MEGAFARMA",
    endereco: "Av. Epitácio Pessoa, 227 - Centro",
    telefone: "(83) 99357-3030",
    area: "CENTRO"
  },
  {
    date: "2025-12-19",
    farmacia: "DROGARIA (+ FARMA)",
    endereco: "Av. Solon de Lucena, nº 38 - Centro",
    telefone: "(83) 99884-3827",
    area: "CENTRO"
  },
  {
    date: "2025-12-20",
    farmacia: "DROGARIA (+ FARMA)",
    endereco: "Av. Solon de Lucena, nº 38 - Centro",
    telefone: "(83) 99884-3827",
    area: "CENTRO"
  },
  {
    date: "2025-12-21",
    farmacia: "FARMÁCIA MAIS POPULAR",
    endereco: "Rua Doutor Romero Nóbrega S/N - Maternidade",
    telefone: "(83) 99145-8081",
    area: "OESTE"
  },
  {
    date: "2025-12-22",
    farmacia: "FARMA LIFE",
    endereco: "R. Manoel Fernandes Motta, nº 688 - Monte Castelo",
    telefone: "(83) 98606-0595 / (83) 3727-0595",
    area: "SUL"
  },
  {
    date: "2025-12-23",
    farmacia: "FARMASS",
    endereco: "R. Horácio Nóbrega, 825 - Belo Horizonte",
    telefone: "(83) 3421-6390",
    area: "NORTE"
  },
  {
    date: "2025-12-24",
    farmacia: "FARMÁCIA MAIS POPULAR",
    endereco: "Rua Doutor Romero Nóbrega S/N - Maternidade",
    telefone: "(83) 99145-8081",
    area: "OESTE"
  },
  {
    date: "2025-12-25",
    farmacia: "MEGAFARMA",
    endereco: "Av. Epitácio Pessoa, 227 - Centro",
    telefone: "(83) 99357-3030",
    area: "CENTRO"
  },
  {
    date: "2025-12-26",
    farmacia: "SAÚDE FARMA",
    endereco: "R. Horácio Nóbrega, 172 - Belo Horizonte",
    telefone: "(83) 99125-7088",
    area: "NORTE"
  },
  {
    date: "2025-12-27",
    farmacia: "DROGARIA (+ FARMA)",
    endereco: "Av. Solon de Lucena, nº 38 - Centro",
    telefone: "(83) 99884-3827",
    area: "CENTRO"
  },
  {
    date: "2025-12-28",
    farmacia: "FARMED",
    endereco: "R. do Prado, nº 1433 - Maternidade",
    telefone: "(83) 98639-7570 / (83) 99652-5805",
    area: "OESTE"
  },
  {
    date: "2025-12-29",
    farmacia: "SUPERPHARMA SÃO VICENTE",
    endereco: "R. Manoel Motta, 184 - Jatobá",
    telefone: "(83) 99159-8378",
    area: "SUL"
  },
  {
    date: "2025-12-30",
    farmacia: "CRUZ VERMELHA PHARMA",
    endereco: "R. Epitácio Pessoa, 382 - Centro",
    telefone: "(83) 99128-6474",
    area: "CENTRO"
  }
];

// ======================================================
//  STORE GLOBAL — CONTROLE COMPLETO DO BANCO LOCAL
// ======================================================
window.PlantoesStore = {
  get() {
    const raw = localStorage.getItem(PLANTOES_STORAGE_KEY);

    if (!raw) {
      return dadosPlantoesBase
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date));
    }

    try {
      const list = JSON.parse(raw);

      if (Array.isArray(list)) {
        return list
          .filter(p => p.date && p.farmacia)
          .sort((a, b) => a.date.localeCompare(b.date));
      }

      return dadosPlantoesBase.slice();
    } catch (e) {
      console.warn("⚠ Erro ao carregar dados. Resetando base.");
      return dadosPlantoesBase.slice();
    }
  },

  set(list) {
    localStorage.setItem(
      PLANTOES_STORAGE_KEY,
      JSON.stringify(
        list.sort((a, b) => a.date.localeCompare(b.date))
      )
    );
  },

  reset() {
    localStorage.removeItem(PLANTOES_STORAGE_KEY);
  }
};
