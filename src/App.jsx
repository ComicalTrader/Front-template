import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <Home />
      </main>
    </div>
  );
};

export default App;
