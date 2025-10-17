import React, { useState } from "react";

// Dados simulados
const sampleHistory = [
  { name: "João Silva", type: "Corte clássico", value: 50, date: "2025-10-17" },
  { name: "Maria Souza", type: "Degradê", value: 60, date: "2025-10-17" },
  { name: "Carlos Pereira", type: "Barba", value: 30, date: "2025-10-16" },
];

const Clientes = () => {
  const [history, setHistory] = useState(sampleHistory);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    name: "",
    type: "",
    value: "",
    date: new Date().toISOString().slice(0, 10),
    lastCut: "",
  });

  // Estatísticas
  const today = new Date().toISOString().slice(0, 10);
  const totalToday = history.filter(h => h.date === today).length;
  const totalMonth = history.filter(h => h.date.slice(0, 7) === today.slice(0, 7)).length;
  const revenueMonth = history
    .filter(h => h.date.slice(0, 7) === today.slice(0, 7))
    .reduce((acc, h) => acc + Number(h.value), 0);

  // Função para adicionar novo atendimento
  const addEntry = (e) => {
    e.preventDefault();
    setHistory([...history, newEntry]);
    setNewEntry({
      name: "",
      type: "",
      value: "",
      date: new Date().toISOString().slice(0, 10),
      lastCut: "",
    });
    setShowForm(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Dashboard resumido */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-6 text-white bg-blue-500 shadow-lg rounded-2xl">
          <h2 className="mb-2 text-lg font-semibold">Cortes hoje</h2>
          <p className="text-3xl">{totalToday}</p>
        </div>
        <div className="p-6 text-white bg-green-500 shadow-lg rounded-2xl">
          <h2 className="mb-2 text-lg font-semibold">Cortes no mês</h2>
          <p className="text-3xl">{totalMonth}</p>
        </div>
        <div className="p-6 text-white bg-yellow-500 shadow-lg rounded-2xl">
          <h2 className="mb-2 text-lg font-semibold">Receita mês</h2>
          <p className="text-3xl">R$ {revenueMonth}</p>
        </div>
      </div>

      {/* Botão adicionar */}
      <div className="flex justify-end">
        <button
          className="px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancelar" : "Adicionar Atendimento"}
        </button>
      </div>

      {/* Formulário de adicionar atendimento */}
      {showForm && (
        <form onSubmit={addEntry} className="flex flex-col gap-4 p-6 bg-white rounded shadow-md">
          <input
            type="text"
            placeholder="Nome do cliente"
            className="p-2 border rounded"
            value={newEntry.name}
            onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Tipo de corte"
            className="p-2 border rounded"
            value={newEntry.type}
            onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Valor"
            className="p-2 border rounded"
            value={newEntry.value}
            onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
            required
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
            required
          />
          
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500">
            Salvar
          </button>
        </form>
      )}

      {/* Tabela de histórico */}
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse border-gray-300 table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left border border-gray-300">Nome</th>
              <th className="px-4 py-2 text-left border border-gray-300">Corte</th>
              <th className="px-4 py-2 text-left border border-gray-300">Valor</th>
              <th className="px-4 py-2 text-left border border-gray-300">Data</th>
              
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{h.name}</td>
                <td className="px-4 py-2 border border-gray-300">{h.type}</td>
                <td className="px-4 py-2 border border-gray-300">R$ {h.value}</td>
                <td className="px-4 py-2 border border-gray-300">{h.date}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
