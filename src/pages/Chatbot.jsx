import React, { useState } from "react";

const Chatbot = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, client: "João", time: "14:00", status: "Pendente" },
    { id: 2, client: "Maria", time: "15:30", status: "Pendente" },
  ]);

  const handleAccept = (id) => {
    setAppointments(
      appointments.map(a => a.id === id ? { ...a, status: "Aceito" } : a)
    );
  };

  const handleReject = (id) => {
    setAppointments(
      appointments.map(a => a.id === id ? { ...a, status: "Rejeitado" } : a)
    );
  };

  const handleChat = (client) => {
    const numeroDoCliente = "5511999999999"; // colocar dinamicamente depois
    window.open(`https://web.whatsapp.com/send?phone=${numeroDoCliente}`, "_blank");
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="mb-4 text-2xl font-bold">Chatbot de Agendamentos</h1>
      <div className="flex flex-col gap-4">
        {appointments.map(a => (
          <div key={a.id} className="flex items-center justify-between p-4 bg-gray-100 rounded shadow">
            <div>
              <p><strong>{a.client}</strong> - {a.time}</p>
              <p>Status: {a.status}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleAccept(a.id)} className="px-2 py-1 text-white bg-green-500 rounded">Aceitar</button>
              <button onClick={() => handleReject(a.id)} className="px-2 py-1 text-white bg-red-500 rounded">Rejeitar</button>
              <button onClick={() => handleChat(a.client)} className="px-2 py-1 text-white bg-blue-600 rounded">Conversar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
