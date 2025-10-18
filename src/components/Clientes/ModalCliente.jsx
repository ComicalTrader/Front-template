import React from "react";
import { XCircle } from "lucide-react";

const ModalCliente = ({ selectedClient, setSelectedClient, history }) => {
  if (selectedClient === null) return null;

  const cliente = history[selectedClient];
  const clienteHistory = history.filter(h => h.name === cliente.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-6 bg-white rounded-xl w-96">
        <button
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
          onClick={() => setSelectedClient(null)}
        >
          <XCircle />
        </button>
        <h2 className="mb-4 text-xl font-semibold">{cliente.name}</h2>
        <p><strong>Último corte:</strong> {cliente.type} em {cliente.date}</p>
        <p><strong>Notas:</strong> {cliente.notes || "Nenhuma"}</p>
        <p className="mt-2 font-semibold">Histórico completo:</p>
        <ul className="list-disc list-inside">
          {clienteHistory.map((h, i) => (
            <li key={i}>{h.date} - {h.type} - R$ {h.value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModalCliente;
