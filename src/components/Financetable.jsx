import React from "react";

const FinanceTable = ({ transactions }) => {
  return (
    <div className="p-6 mt-6 bg-white shadow rounded-2xl">
      <h2 className="mb-4 text-lg font-semibold">Transações recentes</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-left">Data</th>
            <th className="p-3 text-left">Descrição</th>
            <th className="p-3 text-left">Tipo</th>
            <th className="p-3 text-left">Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={i} className="transition-all border-b hover:bg-gray-50">
              <td className="p-3">{t.data}</td>
              <td className="p-3">{t.descricao}</td>
              <td className={`p-3 font-medium ${t.tipo === "Entrada" ? "text-green-600" : "text-red-600"}`}>
                {t.tipo}
              </td>
              <td className="p-3">R$ {t.valor.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinanceTable;
