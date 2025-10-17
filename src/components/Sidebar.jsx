import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  DollarSign,
  Users,
  Menu,
  ChevronLeft,
  Box,
  User,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Toggle via botão
  const [isHover, setIsHover] = useState(false); // Toggle via hover

  const mainItems = [
    { name: "Home", path: "/home", icon: Home },
    { name: "Agenda", path: "/agenda", icon: Calendar },
    { name: "Financeiro", path: "/financeiro", icon: DollarSign },
    { name: "Clientes", path: "/clientes", icon: Users },
    { name: "Estoque", path: "/estoque", icon: Box },
    { name: "Chatbot", path: "/chatbot", icon: User },
  ];

  const configItem = { name: "Configurações", path: "/configuracoes", icon: Settings };

  return (
    <aside
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`
        flex flex-col h-screen p-4 text-white bg-gray-900 shadow-lg
        transition-all duration-300 ease-in-out
        ${isOpen || isHover ? "w-64 items-start" : "w-20 items-center"}
      `}
    >
      {/* 🔘 Botão de abrir/fechar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 mb-8 text-white transition-colors duration-200 bg-gray-800 rounded-lg hover:bg-gray-700"
      >
        {isOpen ? <ChevronLeft size={22} /> : <Menu size={22} />}
      </button>

      {/* 🧾 Título */}
      {(isOpen || isHover) && (
        <h2 className="mb-8 text-2xl font-bold text-white transition-opacity duration-300">
          BarberPro
        </h2>
      )}

      {/* 📋 Menu principal */}
      <ul className="flex flex-col flex-1 w-full gap-2">
        {mainItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <li key={item.name} className="w-full">
              <Link
                to={item.path}
                className={`flex items-center gap-4 px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gray-800 text-white font-semibold"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Icon
                  className="transition-transform duration-300"
                  size={isOpen || isHover ? 22 : 28}
                  strokeWidth={1.8}
                />
                {(isOpen || isHover) && <span className="text-sm">{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* ⚙️ Configurações no final */}
      <ul className="flex flex-col w-full gap-2">
        <li>
          <Link
            to={configItem.path}
            className={`flex items-center gap-4 px-3 py-2 rounded-xl transition-all duration-200 ${
              location.pathname === configItem.path
                ? "bg-gray-800 text-white font-semibold"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <configItem.icon
              className="transition-transform duration-300"
              size={isOpen || isHover ? 22 : 28}
              strokeWidth={1.8}
            />
            {(isOpen || isHover) && <span className="text-sm">{configItem.name}</span>}
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
