import React, { useState } from "react";
import FinanceCard from "../components/Finance/FinanceCard";
import FinanceTable from "../components/Finance/Financetable";
import TransactionForm from "../components/Finance/TransactionForm";
import ResumoMensalFuncionario from "../components/Finance/ResumoMensalFuncionario";

const FinanceiroFuncionario = () => {
  // Estado de transações do funcionário
  const [transacoes, setTransacoes] = useState([
    { id: 1, data: "2025-10-20", descricao: "Corte de cabelo", tipo: "Entrada", valor: 50 },
    { id: 2, data: "2025-10-19", descricao: "Venda de pomada", tipo: "Entrada", valor: 35 },
    { id: 3, data: "2025-10-18", descricao: "Compra de navalha", tipo: "Saída", valor: 25 },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);

  // Funções de cálculo
  const entradas = transacoes
    .filter((t) => t.tipo === "Entrada")
    .reduce((acc, t) => acc + t.valor, 0);

  const saidas = transacoes
    .filter((t) => t.tipo === "Saída")
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = entradas - saidas;

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
      // Editar existente
      setTransacoes((prev) =>
        prev.map((t) => (t.id === novaTransacao.id ? novaTransacao : t))
      );
    } else {
      // Adicionar nova
      novaTransacao.id = Date.now();
      setTransacoes((prev) => [...prev, novaTransacao]);
    }
    fecharModal();
  };

  const removerTransacao = (id) => {
    setTransacoes((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen p-8 space-y-10 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Financeiro do Funcionário</h1>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <FinanceCard
          title="Saldo Atual"
          value={`R$ ${saldo.toFixed(2)}`}
          color="text-green-600"
        />
        <FinanceCard
          title="Entradas"
          value={`R$ ${entradas.toFixed(2)}`}
          color="text-blue-600"
        />
        <FinanceCard
          title="Saídas"
          value={`R$ ${saidas.toFixed(2)}`}
          color="text-red-600"
        />
      </div>

      {/* Botão de adicionar */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => abrirModal()}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Adicionar Transação
        </button>
      </div>

      {/* Resumo mensal com troca de mês */}
      <ResumoMensalFuncionario />

      {/* Modal */}
      {modalAberto && (
        <TransactionForm
          onClose={fecharModal}
          onSave={salvarTransacao}
          transaction={transacaoSelecionada}
        />
      )}


      {/* Tabela */}
      <FinanceTable
        transactions={transacoes}
        onEdit={abrirModal}
        onRemove={removerTransacao}
      />

    </div>
  );
};

export default FinanceiroFuncionario;
