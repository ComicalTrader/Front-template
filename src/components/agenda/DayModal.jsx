import React, { useState } from "react";

const DayModal = ({ day, appointments, addAppointment, closeModal }) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");

  const handleAdd = () => {
    if (name && time && service) {
      addAppointment(day, name, time, service);
      setName("");
      setTime("");
      setService("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="mb-4 text-xl font-semibold">Agendamentos do dia {day}</h2>
        <ul className="divide-y">
          {appointments.filter(a => a.day === day).map((a,i) => (
            <li key={i} className="py-2">
              {a.time} - {a.name} ({a.service})
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 mt-4">
          <input
            type="text"
            placeholder="Nome do cliente"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Horário (ex: 14:00)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Serviço"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="p-2 border rounded"
          />
          <button className="p-2 mt-2 text-white bg-blue-500 rounded" onClick={handleAdd}>
            Adicionar
          </button>
          <button className="mt-2 text-red-500" onClick={closeModal}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default DayModal;
