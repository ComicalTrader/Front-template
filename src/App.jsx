import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Agenda from "./pages/Agenda.jsx";
import Financeiro from "./pages/Financeiro.jsx";
import Clientes from "./pages/Clientes.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login onLogin={() => setLoggedIn(true)} />}
        />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="financeiro" element={<Financeiro />} />
          <Route path="clientes" element={<Clientes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
