import React, { useState, useMemo, useEffect } from "react";
import { Pencil, Trash, PlusCircle, XCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

// Dados simulados iniciais
const initialHistory = [
  { name: "João Silva", type: "Corte clássico", value: 50, date: "2025-11-17", notes: "Prefere máquina 3" },
  { name: "Maria Souza", type: "Degradê", value: 60, date: "2025-10-17", notes: "" },
  { name: "João Silva", type: "Corte clássico", value: 50, date: "2025-07-17", notes: "Prefere máquina 3" },
  { name: "Maria Souza", type: "Degradê", value: 60, date: "2025-10-17", notes: "" },
  { name: "João Silva", type: "Corte clássico", value: 50, date: "2025-12-17", notes: "Prefere máquina 3" },
  { name: "Maria Souza", type: "Degradê", value: 60, date: "2025-01-17", notes: "" },
  { name: "Carlos Pereira", type: "Barba", value: 30, date: "2025-09-16", notes: "Alergia a produtos fortes" },
];

const Clientes = () => {
  const [history, setHistory] = useState(initialHistory);
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newEntry, setNewEntry] = useState({
    name: "",
    type: "",
    value: "",
    date: new Date().toISOString().slice(0, 10),
    notes: "",
  });
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const location = useLocation();

  // Aplica filtro vindo via navegação (ex.: do dashboard)
  useEffect(() => {
    if (location.state?.filterMonth) {
      setFilterDate(location.state.filterMonth);
    }
  }, [location.state]);

  // Estatísticas
  const today = new Date().toISOString().slice(0, 10);
  const totalToday = history.filter(h => h.date === today).length;
  const totalMonth = history.filter(h => h.date.slice(0, 7) === today.slice(0, 7)).length;
  const revenueMonth = history
    .filter(h => h.date.slice(0, 7) === today.slice(0, 7))
    .reduce((acc, h) => acc + Number(h.value), 0);

  // Adicionar novo atendimento
  const addEntry = (e) => {
    e.preventDefault();
    setHistory([...history, newEntry]);
    setNewEntry({ name: "", type: "", value: "", date: new Date().toISOString().slice(0, 10), notes: "" });
    setShowForm(false);
  };

  // Editar atendimento
  const editEntry = (index, updated) => {
    const newHistory = [...history];
    newHistory[index] = updated;
    setHistory(newHistory);
  };

  // Remover atendimento
  const removeEntry = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
    if (selectedClient === index) setSelectedClient(null);
  };

  // Histórico filtrado
  const filteredHistory = useMemo(() => {
    return history
      .filter(h => h.name.toLowerCase().includes(search.toLowerCase()))
      .filter(h => (filterDate ? h.date.startsWith(filterDate) : true))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [history, search, filterDate]);

  return (
    <div className="flex flex-col gap-6 p-6">
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

      {/* Barra de filtros */}
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        {/* Buscar por nome */}
        <input
          type="text"
          placeholder="Buscar cliente..."
          className="flex-1 p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filtrar por data */}
        <input
          type="date"
          className="p-2 border rounded"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        {/* Botão limpar filtros */}
        <button
          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500"
          onClick={() => {
            setSearch("");
            setFilterDate("");
          }}
        >
          Limpar filtros
        </button>

        {/* Botão adicionar atendimento */}
        <button
          className="flex items-center gap-2 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancelar" : <><PlusCircle /> Adicionar Atendimento</>}
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <form onSubmit={addEntry} className="flex flex-col gap-4 p-6 mt-2 bg-white rounded shadow-md">
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
          <textarea
            placeholder="Notas do cliente"
            className="p-2 border rounded"
            value={newEntry.notes}
            onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
          />
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500">
            Salvar
          </button>
        </form>
      )}

      {/* Tabela de histórico */}
      <div className="mt-4 overflow-x-auto bg-white rounded shadow-md">
        <table className="w-full border-collapse table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Corte</th>
              <th className="px-4 py-2 text-left">Valor</th>
              <th className="px-4 py-2 text-left">Data</th>
              <th className="px-4 py-2 text-left">Notas</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((h, i) => (
              <tr key={i} className="cursor-pointer hover:bg-gray-100">
                <td className="px-4 py-2">{h.name}</td>
                <td className="px-4 py-2">{h.type}</td>
                <td className="px-4 py-2">R$ {h.value}</td>
                <td className="px-4 py-2">{h.date}</td>
                <td className="px-4 py-2">{h.notes}</td>
                <td className="flex gap-2 px-4 py-2">
                  <button onClick={() => setSelectedClient(i)} className="text-blue-600"><Pencil /></button>
                  <button onClick={() => removeEntry(i)} className="text-red-600"><Trash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal do cliente */}
      {selectedClient !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-6 bg-white rounded-xl w-96">
            <button
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
              onClick={() => setSelectedClient(null)}
            >
              <XCircle />
            </button>
            <h2 className="mb-4 text-xl font-semibold">{history[selectedClient].name}</h2>
            <p><strong>Último corte:</strong> {history[selectedClient].type} em {history[selectedClient].date}</p>
            <p><strong>Notas:</strong> {history[selectedClient].notes || "Nenhuma"}</p>
            <p className="mt-2 font-semibold">Histórico completo:</p>
            <ul className="list-disc list-inside">
              {history.filter(h => h.name === history[selectedClient].name)
                .map((h, i) => (
                  <li key={i}>{h.date} - {h.type} - R$ {h.value}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
