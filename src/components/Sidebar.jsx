import React from "react";

const Sidebar = () => {
  const menuItems = ["Home", "Agenda", "Financeiro", "Clientes"];

  return (
    <aside
      className="flex flex-col items-center w-16 h-screen p-4 text-white transition-all duration-300 ease-in-out bg-gray-800  hover:w-64 hover:items-start"
    >
      <h2 className="hidden mb-8 text-xl font-bold hover:block">BarberPro</h2>

      <ul className="flex flex-col w-full gap-4">
        {menuItems.map((item) => (
          <li
            key={item}
            className="flex items-center w-full gap-4 px-2 py-2 rounded cursor-pointer hover:bg-gray-700"
          >
            <span className="material-icons">circle</span>
            <span className="hidden hover:block">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
