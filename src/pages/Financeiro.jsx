import React from "react";
import FinanceCard from "../components/FinanceCard";
import FinanceTable from "../components/Financetable";

const Financeiro = () => {
  // Simulação de dados (mock)
  const transacoes = [
    { data: "17/10/2025", descricao: "Corte de cabelo", tipo: "Entrada", valor: 50 },
    { data: "16/10/2025", descricao: "Compra de produtos", tipo: "Saída", valor: 120 },
    { data: "15/10/2025", descricao: "Venda de pomada", tipo: "Entrada", valor: 35 },
    { data: "14/10/2025", descricao: "Conta de energia", tipo: "Saída", valor: 280 },
  ];

  const saldo = 4200;
  const entradas = 7800;
  const saidas = 3600;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Painel Financeiro</h1>

      {/* Cards resumo */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <FinanceCard title="Saldo Atual" value={`R$ ${saldo.toFixed(2)}`} color="text-green-600" />
        <FinanceCard title="Entradas" value={`R$ ${entradas.toFixed(2)}`} color="text-blue-600" />
        <FinanceCard title="Saídas" value={`R$ ${saidas.toFixed(2)}`} color="text-red-600" />
      </div>

      {/* Tabela de transações */}
      <FinanceTable transactions={transacoes} />
    </div>
  );
};

export default Financeiro;
