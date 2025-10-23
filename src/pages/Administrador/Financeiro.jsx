import React from "react";
import FinanceCard from "../../components/Finance/FinanceCard";
import CategoryCard from "../../components/Finance/CategoryCard";
import FinanceTable from "../../components/Finance/Financetable";
import FinanceCalendar from "../../components/Finance/FinanceCalendar";
import TransactionForm from "../../components/Finance/TransactionForm";
import MonthlySummary from "../../components/Finance/MonthlySummary";
import { useFinanceiro } from "../../hooks/useFinanceiro";


const Financeiro = () => {
  const {
    transacoesFiltradas,
    entradas,
    saidas,
    saldo,
    custosFixos,
    custosVariaveis,
    ticketMedio,
    maiorTransacao,
    numTransacoes,
    resumoPorFuncionario,
    modalAberto,
    transacaoSelecionada,
    abrirModal,
    fecharModal,
    salvarTransacao,
    removerTransacao,
    filtro,
    setFiltro,
  } = useFinanceiro();

  const mesAtual = new Date().getMonth() + 1;

  return (
    <div className="min-h-screen p-8 space-y-10 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Painel Financeiro Administrativo</h1>

      {/* 1️⃣ Cards de resumo */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
        <FinanceCard title="Saldo Atual" value={`R$ ${saldo.toFixed(2)}`} color="text-green-600" />
        <FinanceCard title="Entradas" value={`R$ ${entradas.toFixed(2)}`} color="text-blue-600" />
        <FinanceCard title="Saídas" value={`R$ ${saidas.toFixed(2)}`} color="text-red-600" />
        <FinanceCard title="Lucro do Mês" value={`R$ ${(entradas - saidas).toFixed(2)}`} color="text-purple-600" />
        <FinanceCard title="Ticket Médio" value={`R$ ${ticketMedio.toFixed(2)}`} color="text-indigo-600" />
        <FinanceCard title="Maior Transação" value={`R$ ${maiorTransacao.toFixed(2)}`} color="text-pink-600" />
      </div>

      {/* 2️⃣ Custos Fixos x Variáveis */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <CategoryCard title="Custos Fixos" value={custosFixos} color="text-yellow-500" />
        <CategoryCard title="Custos Variáveis" value={custosVariaveis} color="text-orange-500" />
      </div>

      {/* 3️⃣ Tabela de Transações com filtros */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-x-2">
          <select value={filtro.tipo} onChange={e => setFiltro({...filtro, tipo: e.target.value})} className="px-2 py-1 border rounded">
            <option value="Todos">Todos os tipos</option>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </select>
          <select value={filtro.categoria} onChange={e => setFiltro({...filtro, categoria: e.target.value})} className="px-2 py-1 border rounded">
            <option value="Todos">Todas categorias</option>
            <option value="Fixo">Fixo</option>
            <option value="Variável">Variável</option>
          </select>
          <select value={filtro.funcionario} onChange={e => setFiltro({...filtro, funcionario: e.target.value})} className="px-2 py-1 border rounded">
            <option value="Todos">Todos funcionários</option>
            {Object.keys(resumoPorFuncionario).map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        <button onClick={() => abrirModal()} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Adicionar Transação
        </button>
      </div>

      <FinanceTable transactions={transacoesFiltradas} onEdit={abrirModal} onRemove={removerTransacao} />

      {/* 4️⃣ Calendário compacto */}
      <FinanceCalendar month={mesAtual} transactions={transacoesFiltradas} compact onEdit={abrirModal} />

      {/* 5️⃣ Resumo Mensal */}
      <MonthlySummary
        entradas={entradas}
        saidasFixas={custosFixos}
        saidasVariaveis={custosVariaveis}
        lucro={entradas - (custosFixos + custosVariaveis)}
      />

      {/* Modal */}
      {modalAberto && <TransactionForm onClose={fecharModal} onSave={salvarTransacao} transaction={transacaoSelecionada} />}
    </div>
  );
};

export default Financeiro;
