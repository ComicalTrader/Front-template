import React, { useState } from "react";

const Estoque = () => {
  const [items, setItems] = useState([
    { name: "Pomada", quantity: 10, price: 15 },
    { name: "Shampoo", quantity: 5, price: 25 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", quantity: 0, price: 0 });

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    setItems([...items, newItem]);
    setNewItem({ name: "", quantity: 0, price: 0 });
  };

  const totalItems = items.reduce((acc, i) => acc + Number(i.quantity), 0);
  const totalValue = items.reduce((acc, i) => acc + i.quantity * i.price, 0);

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Dashboard */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center justify-center p-5 text-white bg-blue-600 shadow-md rounded-2xl">
          <h2 className="text-lg font-semibold">Total de Itens</h2>
          <p className="mt-2 text-4xl font-bold">{totalItems}</p>
        </div>

        <div className="flex flex-col items-center justify-center p-5 text-white bg-green-600 shadow-md rounded-2xl">
          <h2 className="text-lg font-semibold">Valor Total</h2>
          <p className="mt-2 text-4xl font-bold">R$ {totalValue.toFixed(2)}</p>
        </div>

        <div className="flex flex-col items-center justify-center p-5 text-white bg-gray-800 shadow-md rounded-2xl">
          <h2 className="text-lg font-semibold">Produtos Cadastrados</h2>
          <p className="mt-2 text-4xl font-bold">{items.length}</p>
        </div>
      </div>

      {/* Formulário de Adição */}
      <form
        onSubmit={addItem}
        className="grid gap-4 p-6 bg-white shadow-md rounded-2xl sm:grid-cols-2 lg:grid-cols-4"
      >
        <input
          type="text"
          placeholder="Nome do item"
          className="p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          className="p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem({ ...newItem, quantity: Number(e.target.value) })
          }
          required
        />
        <input
          type="number"
          placeholder="Preço unitário"
          className="p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          value={newItem.price}
          onChange={(e) =>
            setNewItem({ ...newItem, price: Number(e.target.value) })
          }
          required
        />
        <button
          type="submit"
          className="p-3 font-medium text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Adicionar
        </button>
      </form>

      {/* Lista de Produtos */}
      <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 font-semibold text-left text-gray-600">
                Produto
              </th>
              <th className="px-4 py-3 font-semibold text-left text-gray-600">
                Quantidade
              </th>
              <th className="px-4 py-3 font-semibold text-left text-gray-600">
                Preço (R$)
              </th>
              <th className="px-4 py-3 font-semibold text-center text-gray-600">
                Total (R$)
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr
                key={i}
                className="transition-colors border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">R$ {item.price.toFixed(2)}</td>
                <td className="px-4 py-3 font-medium text-center">
                  R$ {(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estoque;
