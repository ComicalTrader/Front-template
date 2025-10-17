import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Agenda from "./pages/Agenda";
import Financeiro from "./pages/Financeiro";
import Clientes from "./pages/Clientes";
import Estoque from "./pages/Estoque";
import Chatbot from "./pages/Chatbot";
import Configuracoes from "./pages/Configuracoes";

// import Login from "./pages/Login"; // deixamos de fora por enquanto

const App = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <Routes>
          {/* Redireciona automaticamente para Home */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
