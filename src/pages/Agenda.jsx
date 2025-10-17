import React, { useState } from "react";

// Função para gerar dias do mês
const generateDays = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push({
      day: date.getDate(),
      appointments: [],
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
};

// Dados simulados
const sampleAppointments = [
  { day: 5, name: "João", time: "10:00", service: "Corte" },
  { day: 5, name: "Maria", time: "14:00", service: "Barba" },
  { day: 12, name: "Carlos", time: "09:30", service: "Corte + Barba" },
  { day: 20, name: "Ana", time: "13:00", service: "Barba" },
  { day: 20, name: "Lucas", time: "15:00", service: "Corte" },
];

const Agenda = () => {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const [days, setDays] = useState(generateDays(month, year));

  // Inserindo agendamentos nos dias
  days.forEach((d) => {
    d.appointments = sampleAppointments.filter((a) => a.day === d.day);
  });

  // Estatísticas do Dashboard
  const totalAppointments = sampleAppointments.length;
  const todayAppointments = sampleAppointments.filter(
    (a) => a.day === new Date().getDate()
  ).length;
  const completed = 2; // só exemplo
  const pending = totalAppointments - completed;

  return (
    <div className="flex flex-col gap-6">
      {/* Dashboard resumido */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="p-6 text-white bg-blue-500 shadow-lg rounded-2xl">
          <h2 className="mb-2 text-lg font-semibold">Cortes no mês</h2>
          <p className="text-3xl">{totalAppointments}</p>
        </div>
        <div className="p-6 text-white bg-green-500 shadow-lg rounded-2xl">
          <h2 className="mb-2 text-lg font-semibold">Cortes hoje</h2>
          <p className="text-3xl">{todayAppointments}</p>
        </div>
        <div className="p-6 text-white bg-yellow-500 shadow-lg rounded-2xl">
          <h2 className="mb-2 text-lg font-semibold">Completos</h2>
          <p className="text-3xl">{completed}</p>
        </div>
        <div className="p-6 text-white bg-red-500 shadow-lg rounded-2xl">
          <h2 className="mb-2 text-lg font-semibold">Pendentes</h2>
          <p className="text-3xl">{pending}</p>
        </div>
      </div>

      {/* Calendário do mês */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => (
          <div
            key={d.day}
            className={`p-2 border rounded-lg min-h-[100px] flex flex-col ${
              d.day === new Date().getDate() ? "bg-gray-200" : "bg-white"
            }`}
          >
            <div className="mb-1 font-semibold text-center">Dia {d.day}</div>
            <div className="flex flex-col flex-1 gap-1 overflow-y-auto">
              {d.appointments.map((a, i) => (
                <div
                  key={i}
                  className="px-2 py-1 text-xs text-indigo-800 truncate bg-indigo-200 rounded"
                  title={`${a.name} - ${a.service} - ${a.time}`}
                >
                  {a.time} - {a.name} ({a.service})
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agenda;
