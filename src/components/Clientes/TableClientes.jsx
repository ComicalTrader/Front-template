import React from "react";
import { Pencil, Trash } from "lucide-react";

const TableClientes = ({ filteredHistory, setSelectedClient, removeEntry }) => (
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
);

export default TableClientes;
