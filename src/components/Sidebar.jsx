import React, { useState, useEffect, useRef } from "react";
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
  Search,
  X,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  // Fecha a barra ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fecha com tecla Esc
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") setShowSearch(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

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
    <>
      {/* 🧭 SIDEBAR */}
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
          <h2 className="mb-6 text-2xl font-bold text-white transition-opacity duration-300">
            BarberPro
          </h2>
        )}

        {/* 🔍 Ícone de pesquisa */}
        <button
          onClick={() => setShowSearch(true)}
          className="flex items-center justify-center w-full gap-4 px-3 py-2 mb-4 transition rounded-xl bg-gray-800/70 hover:bg-gray-800"
        >
          <Search
            size={isOpen || isHover ? 22 : 26}
            className="text-gray-200"
            strokeWidth={1.8}
          />
          {(isOpen || isHover) && <span className="text-sm">Pesquisar</span>}
        </button>

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

        {/* ⚙️ Configurações */}
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

      {/* 🔎 Barra de pesquisa no topo */}
      {showSearch && (
        <div
          ref={searchRef}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-4 shadow-md  bg-gray-900/80 backdrop-blur-md"
        >
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full px-4 py-2 pl-10 text-gray-100 placeholder-gray-400 bg-gray-800 rounded-lg outline-none "
              autoFocus
            />
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-400"
              strokeWidth={1.8}
            />
            <button
              onClick={() => setShowSearch(false)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
