import React from "react";

const Home = () => {
  const cards = [
    { title: "Dashboard", value: "Visão geral do mês", color: "bg-blue-500" },
    { title: "Financeiro", value: "R$ 12.540,00", color: "bg-green-500" },
    { title: "Agenda", value: "7 horários marcados hoje", color: "bg-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} text-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-105`}
        >
          <h2 className="mb-2 text-xl font-semibold">{card.title}</h2>
          <p className="text-lg">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
