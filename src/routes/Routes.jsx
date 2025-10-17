import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // << cuidado com o caminho!
import Home from "../pages/Home";
import Agenda from "../pages/Agenda";
import Financeiro from "../pages/Financeiro";
import Clientes from "../pages/Clientes";

const AppRoutes = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 p-6 bg-gray-100">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </main>
  </div>
);

export default AppRoutes;
