import React, { useState } from "react";

const Estoque = () => {
  const [items, setItems] = useState([
    { name: "Pomada", quantity: 10, price: 15 },
    { name: "Shampoo", quantity: 5, price: 25 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", quantity: 0, price: 0 });

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, newItem]);
    setNewItem({ name: "", quantity: 0, price: 0 });
  };

  const totalItems = items.reduce((acc, i) => acc + Number(i.quantity), 0);
  const totalValue = items.reduce((acc, i) => acc + i.quantity * i.price, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Dashboard */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="p-6 text-white bg-blue-500 shadow-lg rounded-2xl">
          <h2 className="mb-2 text-lg font-semibold">Total de itens</h2>
          <p className="text-3xl">{totalItems}</p>
        </div>
        <div className="p-6 text-white bg-green-500 shadow-lg rounded-2xl">
          <h2 className="mb-2 text-lg font-semibold">Valor total</h2>
          <p className="text-3xl">R$ {totalValue}</p>
        </div>
      </div>

      {/* Formulário adicionar */}
      <form onSubmit={addItem} className="flex flex-col gap-4 p-6 bg-white rounded shadow-md">
        <input
          type="text"
          placeholder="Nome do item"
          className="p-2 border rounded"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          className="p-2 border rounded"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Preço unitário"
          className="p-2 border rounded"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
          required
        />
        <button type="submit" className="p-2 text-white bg-blue-600 rounded hover:bg-blue-500">
          Adicionar
        </button>
      </form>

      {/* Lista de produtos */}
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse border-gray-300 table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left border border-gray-300">Produto</th>
              <th className="px-4 py-2 text-left border border-gray-300">Quantidade</th>
              <th className="px-4 py-2 text-left border border-gray-300">Preço</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{item.name}</td>
                <td className="px-4 py-2 border border-gray-300">{item.quantity}</td>
                <td className="px-4 py-2 border border-gray-300">R$ {item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estoque;
