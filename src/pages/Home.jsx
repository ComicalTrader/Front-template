import React from "react";
import Card from "../components/Card.jsx";

const Home = () => {
  const cards = [
    { title: "Dashboard", value: "Visão geral do mês", color: "#3b82f6" },
    { title: "Financeiro", value: "R$ 12.540,00", color: "#10b981" },
    { title: "Agenda", value: "7 horários marcados hoje", color: "#f59e0b" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
      {cards.map((c) => <Card key={c.title} {...c} />)}
    </div>
  );
};

export default Home;
