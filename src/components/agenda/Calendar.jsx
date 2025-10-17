import React from "react";

const Calendar = ({ selectedDate, openDay, appointments }) => {
  const generateCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const allDays = [...blanks, ...days];

    return allDays.map((day, index) => (
      <div
        key={index}
        className={`h-16 w-16 flex items-center justify-center border rounded-lg transition-all duration-200 ${
          day
            ? "hover:bg-blue-500 hover:text-white cursor-pointer"
            : "bg-transparent border-none"
        }`}
        onClick={() => day && openDay(day)}
      >
        {day || ""}
      </div>
    ));
  };

  return (
    <div className="p-6 bg-white shadow rounded-2xl">
      <h2 className="mb-4 text-xl font-semibold">Calendário</h2>
      <div className="grid grid-cols-7 gap-3 justify-items-center">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => (
          <div key={d} className="text-sm font-semibold text-gray-500">{d}</div>
        ))}
        {generateCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
