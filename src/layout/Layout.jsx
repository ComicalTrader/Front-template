import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar collapsed={collapsed} toggle={() => setCollapsed(!collapsed)} />
      <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
