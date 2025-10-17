import React, { useState } from "react";
import FinanceCard from "../components/Finance/FinanceCard";
import CategoryCard from "../components/Finance/CategoryCard";
import FinanceTable from "../components/Finance/Financetable";
import FinanceCalendar from "../components/Finance/FinanceCalendar";
import TransactionForm from "../components/Finance/TransactionForm";
import MonthlySummary from "../components/Finance/MonthlySummary";

const Financeiro = () => {
  // Estado de transações
  const [transacoes, setTransacoes] = useState([
    { id: 1, data: "2025-10-17", descricao: "Corte de cabelo", tipo: "Entrada", categoria: "Variável", valor: 50 },
    { id: 2, data: "2025-10-16", descricao: "Compra de produtos", tipo: "Saída", categoria: "Variável", valor: 120 },
    { id: 3, data: "2025-10-15", descricao: "Venda de pomada", tipo: "Entrada", categoria: "Variável", valor: 35 },
    { id: 4, data: "2025-10-14", descricao: "Conta de energia", tipo: "Saída", categoria: "Fixo", valor: 280 },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);

  // Funções de cálculo
  const entradas = transacoes
    .filter(t => t.tipo === "Entrada")
    .reduce((acc, t) => acc + t.valor, 0);

  const saidas = transacoes
    .filter(t => t.tipo === "Saída")
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = entradas - saidas;

  const custosFixos = transacoes
    .filter(t => t.tipo === "Saída" && t.categoria === "Fixo")
    .reduce((acc, t) => acc + t.valor, 0);

  const custosVariaveis = transacoes
    .filter(t => t.tipo === "Saída" && t.categoria === "Variável")
    .reduce((acc, t) => acc + t.valor, 0);

  // Modal
  const abrirModalEdicao = (transacao = null) => {
    setTransacaoSelecionada(transacao);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setTransacaoSelecionada(null);
    setModalAberto(false);
  };

  const salvarTransacao = (novaTransacao) => {
    if (novaTransacao.id) {
      // Editar
      setTransacoes(prev =>
        prev.map(t => (t.id === novaTransacao.id ? novaTransacao : t))
      );
    } else {
      // Adicionar
      novaTransacao.id = Date.now();
      setTransacoes(prev => [...prev, novaTransacao]);
    }
    fecharModal();
  };

  const removerTransacao = (id) => {
    setTransacoes(prev => prev.filter(t => t.id !== id));
  };

  // Data atual para calendário
  const mesAtual = new Date().getMonth() + 1; // 1-12

  return (
    <div className="min-h-screen p-8 space-y-10 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Painel Financeiro</h1>

      {/* 1️⃣ Resumo Financeiro */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <FinanceCard title="Saldo Atual" value={`R$ ${saldo.toFixed(2)}`} color="text-green-600" />
        <FinanceCard title="Entradas" value={`R$ ${entradas.toFixed(2)}`} color="text-blue-600" />
        <FinanceCard title="Saídas" value={`R$ ${saidas.toFixed(2)}`} color="text-red-600" />
        <FinanceCard title="Lucro do Mês" value={`R$ ${(entradas - saidas).toFixed(2)}`} color="text-purple-600" />
      </div>

      {/* 2️⃣ Custos Fixos x Variáveis */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <CategoryCard title="Custos Fixos" value={custosFixos} color="text-yellow-500" />
        <CategoryCard title="Custos Variáveis" value={custosVariaveis} color="text-orange-500" />
      </div>

      {/* 3️⃣ Calendário */}
      <FinanceCalendar
        month={mesAtual}
        transactions={transacoes}
        onEdit={abrirModalEdicao}
      />

      {/* 4️⃣ Tabela de Transações */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => abrirModalEdicao()}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Adicionar Transação
        </button>
      </div>
      <FinanceTable
        transactions={transacoes}
        onEdit={abrirModalEdicao}
        onRemove={removerTransacao}
      />

      {/* 5️⃣ Resumo Mensal */}
      <MonthlySummary
        entradas={entradas}
        saidasFixas={custosFixos}
        saidasVariaveis={custosVariaveis}
        lucro={entradas - (custosFixos + custosVariaveis)}
      />

      {/* Modal de Adicionar / Editar */}
      {modalAberto && (
        <TransactionForm
          onClose={fecharModal}
          onSave={salvarTransacao}
          transaction={transacaoSelecionada}
        />
      )}
    </div>
  );
};

export default Financeiro;
