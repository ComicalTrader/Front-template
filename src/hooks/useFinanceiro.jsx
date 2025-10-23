import React from "react";
import { useState, useEffect } from "react";

// Hook unificado com role do usuário e KPIs
export function useFinanceiro({ tipoUsuario = "dono" } = {}) {
  const [transacoes, setTransacoes] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);
  const [filtro, setFiltro] = useState({
    tipo: "Todos",
    categoria: "Todos",
    funcionario: "Todos",
    cliente: "Todos",
  });

  // Mock de dados iniciais
  useEffect(() => {
    // Transações gerais
    if (tipoUsuario === "dono") {
      setTransacoes([
        { id: 1, data: "2025-10-20", descricao: "Venda X", tipo: "Entrada", categoria: "Serviço", valor: 150, cliente: "João", funcionario: "Maria" },
        { id: 2, data: "2025-10-19", descricao: "Compra Y", tipo: "Saída", categoria: "Fixo", valor: 80 },
      ]);
    } else {
      setTransacoes([
        { id: 1, data: "2025-10-20", descricao: "Corte de cabelo", tipo: "Entrada", categoria: "Serviço", valor: 50, cliente: "Carlos", funcionario: "Funcionario1" },
        { id: 2, data: "2025-10-19", descricao: "Venda de pomada", tipo: "Entrada", categoria: "Produto", valor: 35, cliente: "Carlos", funcionario: "Funcionario1" },
        { id: 3, data: "2025-10-18", descricao: "Compra de navalha", tipo: "Saída", categoria: "Variável", valor: 25 },
      ]);
    }

    // Despesas
    setDespesas([
      { id: 1, descricao: "Aluguel", categoria: "Fixo", valor: 1200, vencimento: "2025-10-05" },
      { id: 2, descricao: "Energia", categoria: "Fixo", valor: 300, vencimento: "2025-10-10" },
      { id: 3, descricao: "Compra de shampoo", categoria: "Variável", valor: 150, vencimento: "2025-10-15" },
    ]);

    // Vendas (serviço, produto, combo)
    setVendas([
      { id: 1, tipo: "Serviço", valor: 100, cliente: "João", data: "2025-10-20", funcionario: "Maria" },
      { id: 2, tipo: "Produto", valor: 50, cliente: "Carlos", data: "2025-10-19", funcionario: "Maria" },
      { id: 3, tipo: "Combo", valor: 200, cliente: "Ana", data: "2025-10-18", funcionario: "Maria" },
    ]);
  }, [tipoUsuario]);

  // Filtragem de transações
  const transacoesFiltradas = transacoes.filter(t => 
    (filtro.tipo === "Todos" || t.tipo === filtro.tipo) &&
    (filtro.categoria === "Todos" || t.categoria === filtro.categoria) &&
    (filtro.funcionario === "Todos" || t.funcionario === filtro.funcionario) &&
    (filtro.cliente === "Todos" || t.cliente === filtro.cliente)
  );

  // Cálculos
  const entradas = transacoesFiltradas.filter(t => t.tipo === "Entrada").reduce((acc, t) => acc + t.valor, 0);
  const saidas = transacoesFiltradas.filter(t => t.tipo === "Saída").reduce((acc, t) => acc + t.valor, 0);
  const saldo = entradas - saidas;

  const custosFixos = despesas.filter(d => d.categoria === "Fixo").reduce((acc, d) => acc + d.valor, 0);
  const custosVariaveis = despesas.filter(d => d.categoria === "Variável").reduce((acc, d) => acc + d.valor, 0);

  const ticketMedio = transacoesFiltradas.filter(t => t.tipo === "Entrada").length
    ? entradas / transacoesFiltradas.filter(t => t.tipo === "Entrada").length
    : 0;

  const maiorTransacao = transacoesFiltradas.length
    ? Math.max(...transacoesFiltradas.map(t => t.valor))
    : 0;

  const numTransacoes = transacoesFiltradas.length;

  // KPIs por funcionário
  const resumoPorFuncionario = {};
  transacoesFiltradas.forEach(t => {
    if (t.funcionario) {
      resumoPorFuncionario[t.funcionario] = resumoPorFuncionario[t.funcionario] || { entradas: 0, saidas: 0 };
      if (t.tipo === "Entrada") resumoPorFuncionario[t.funcionario].entradas += t.valor;
      if (t.tipo === "Saída") resumoPorFuncionario[t.funcionario].saidas += t.valor;
    }
  });

  // Modal handlers
  const abrirModal = (transacao = null) => {
    setTransacaoSelecionada(transacao);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setTransacaoSelecionada(null);
    setModalAberto(false);
  };

  const salvarTransacao = (novaTransacao) => {
    if (novaTransacao.id) {
      setTransacoes(prev => prev.map(t => (t.id === novaTransacao.id ? novaTransacao : t)));
    } else {
      novaTransacao.id = Date.now();
      setTransacoes(prev => [...prev, novaTransacao]);
    }
    fecharModal();
  };

  const removerTransacao = (id) => {
    setTransacoes(prev => prev.filter(t => t.id !== id));
  };

  // Funções adicionais para alertas e previsões
  const contasVencidas = () => {
    const hoje = new Date();
    return despesas.filter(d => new Date(d.vencimento) < hoje);
  };

  const receitaMeses = () => {
    const meses = Array.from({ length: 12 }, (_, i) => 0);
    transacoes.filter(t => t.tipo === "Entrada").forEach(t => {
      const mes = new Date(t.data).getMonth();
      meses[mes] += t.valor;
    });
    return meses;
  };

  const vendasPorCategoria = () => {
    const categorias = { Serviço: 0, Produto: 0, Combo: 0 };
    transacoes.filter(t => t.tipo === "Entrada").forEach(t => {
      if (categorias[t.categoria] !== undefined) categorias[t.categoria] += t.valor;
    });
    return categorias;
  };

  return {
    transacoes,
    transacoesFiltradas,
    vendas,
    despesas,
    entradas,
    saidas,
    saldo,
    custosFixos,
    custosVariaveis,
    ticketMedio,
    maiorTransacao,
    numTransacoes,
    resumoPorFuncionario,
    contasVencidas,
    receitaMeses,
    vendasPorCategoria,
    modalAberto,
    transacaoSelecionada,
    abrirModal,
    fecharModal,
    salvarTransacao,
    removerTransacao,
    filtro,
    setFiltro,
  };
}
