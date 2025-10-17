import React from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Home />
    </div>
  );
};

export default App;
