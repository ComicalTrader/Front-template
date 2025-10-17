import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 p-6 text-white bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold">BarberPro</h2>
      <ul>
        <li className="mb-3 cursor-pointer hover:text-gray-300">Home</li>
        <li className="mb-3 cursor-pointer hover:text-gray-300">Agenda</li>
        <li className="mb-3 cursor-pointer hover:text-gray-300">Financeiro</li>
        <li className="mb-3 cursor-pointer hover:text-gray-300">Clientes</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
