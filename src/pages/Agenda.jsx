import React, { useState } from "react";
import Calendar from "../components/agenda/Calendar";
import DayModal from "../components/agenda/DayModal";
import DashboardCards from "../components/agenda/DashboardCards";
import Chart from "../components/agenda/Chart";

// Dados iniciais (vai vir do backend depois)
const sampleAppointments = [];

const Agenda = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalDay, setModalDay] = useState(null);
  const [appointments, setAppointments] = useState(sampleAppointments);

  const openDay = (day) => setModalDay(day);
  const closeModal = () => setModalDay(null);
  const addAppointment = (day, name, time, service) =>
    setAppointments([...appointments, { day, name, time, service }]);

  const totalMonth = appointments.length; // exemplo
  const todayAppointments = appointments.filter(
    a => a.day === new Date().getDate()
  ).length;
  const servicesTotal = appointments.length;
  const pending = 2;

  const chartData = []; // mesmo cálculo do layout atual

  return (
    <div className="flex flex-col min-h-screen gap-8 p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* botões mudar mês */}
      </div>

      <DashboardCards
        todayAppointments={todayAppointments}
        totalMonth={totalMonth}
        servicesTotal={servicesTotal}
        pending={pending}
      />

      <Chart chartData={chartData} />

      <Calendar
        selectedDate={selectedDate}
        openDay={openDay}
        appointments={appointments}
      />

      {modalDay && (
        <DayModal
          day={modalDay}
          appointments={appointments}
          addAppointment={addAppointment}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Agenda;
