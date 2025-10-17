import React, { useState } from "react";

/**
 * Estoque.jsx
 * - adicionar item (já existente)
 * - editar quantidade inline (toggle edit por linha)
 * - incrementar / decrementar quantidade rapidamente
 * - remover item com confirmação
 *
 * Integração futura com backend: substituir setItems por fetch/axios nas funções add/edit/remove.
 */

const initialItems = [
  { id: 1, name: "Pomada", quantity: 10, price: 15 },
  { id: 2, name: "Shampoo", quantity: 5, price: 25 },
];

const Estoque = () => {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({ name: "", quantity: 0, price: 0 });
  const [editingId, setEditingId] = useState(null); // id em edição
  const [editingValues, setEditingValues] = useState({ quantity: 0 });

  // util pra gerar id simples (substituir por id do backend depois)
  const nextId = () => (items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1);

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    const itemToAdd = { id: nextId(), ...newItem };
    setItems((s) => [...s, itemToAdd]);
    setNewItem({ name: "", quantity: 0, price: 0 });
    // TODO: POST para API aqui
  };

  const removeItem = (id) => {
    const ok = window.confirm("Remover este item do estoque?");
    if (!ok) return;
    setItems((s) => s.filter((it) => it.id !== id));
    // TODO: DELETE para API aqui
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditingValues({ quantity: item.quantity });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingValues({ quantity: 0 });
  };

  const saveEdit = (id) => {
    setItems((s) =>
      s.map((it) => (it.id === id ? { ...it, quantity: Number(editingValues.quantity) } : it))
    );
    setEditingId(null);
    // TODO: PUT/PATCH para API aqui
  };

  const changeEditingQuantity = (val) => {
    setEditingValues((prev) => ({ ...prev, quantity: val }));
  };

  const incr = (id, delta = 1) => {
    setItems((s) => s.map((it) => (it.id === id ? { ...it, quantity: Math.max(0, it.quantity + delta) } : it)));
    // TODO: PATCH para API aqui
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
          <thead className="sticky top-0 bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 font-semibold text-left text-gray-600">Produto</th>
              <th className="px-4 py-3 font-semibold text-left text-gray-600">Quantidade</th>
              <th className="px-4 py-3 font-semibold text-left text-gray-600">Preço (R$)</th>
              <th className="px-4 py-3 font-semibold text-center text-gray-600">Total (R$)</th>
              <th className="px-4 py-3 font-semibold text-center text-gray-600">Ações</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const isEditing = editingId === item.id;
              return (
                <tr key={item.id} className="transition-colors border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.name}</td>

                  {/* quantidade - se editando mostra input, senão mostra controles */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => changeEditingQuantity(Math.max(0, Number(editingValues.quantity) - 1))}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          className="w-20 p-1 text-center border rounded"
                          value={editingValues.quantity}
                          onChange={(e) => changeEditingQuantity(Number(e.target.value))}
                        />
                        <button
                          type="button"
                          onClick={() => changeEditingQuantity(Number(editingValues.quantity) + 1)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => incr(item.id, -1)}
                          className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                          title="Diminuir"
                        >
                          −
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => incr(item.id, +1)}
                          className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                          title="Aumentar"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3">R$ {item.price.toFixed(2)}</td>
                  <td className="px-4 py-3 font-medium text-center">
                    R$ {(item.quantity * item.price).toFixed(2)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {isEditing ? (
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => saveEdit(item.id)}
                          className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-500"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="inline-flex justify-center gap-2">
                        <button
                          onClick={() => startEdit(item)}
                          className="px-3 py-1 text-black bg-yellow-400 rounded hover:bg-yellow-300"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-400"
                        >
                          Remover
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estoque;
