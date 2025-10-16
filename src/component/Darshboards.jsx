export default function DashboardCards() {
  const cards = [
    {
      title: "Total de Cortes",
      value: 128,
      icon: "💈",
    },
    {
      title: "Lucro do Mês",
      value: "R$ 3.240,00",
      icon: "💰",
    },
    {
      title: "Clientes Ativos",
      value: 56,
      icon: "👥",
    },
    {
      title: "Agendamentos Hoje",
      value: 12,
      icon: "📅",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-gray-800 p-5 rounded-xl shadow hover:scale-105 duration-200"
        >
          <div className="text-4xl">{card.icon}</div>
          <h2 className="text-lg font-semibold mt-3">{card.title}</h2>
          <p className="text-2xl font-bold text-blue-400 mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
