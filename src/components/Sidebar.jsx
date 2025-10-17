import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "Agenda", path: "/agenda" },
    { name: "Financeiro", path: "/financeiro" },
    { name: "Clientes", path: "/clientes" },
    { name: "Estoque", path: "/estoque" }
  ];

  return (
    <aside
      className="flex flex-col items-center w-16 h-screen p-4 text-white transition-all duration-300 ease-in-out bg-gray-800 hover:w-64 hover:items-start"
    >
      <h2 className="hidden mb-8 text-xl font-bold hover:block">BarberPro</h2>

      <ul className="flex flex-col w-full gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.name} className="w-full">
              <Link
                to={item.path}
                className={`flex items-center w-full gap-4 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gray-700 font-semibold"
                    : "hover:bg-gray-700 hover:pl-4"
                }`}
              >
                <span className="text-sm material-icons">+</span>
                <span className="hidden text-sm md:block">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
