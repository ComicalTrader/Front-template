import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";

const Calendar = ({ selectedDate, openDay, appointments }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [showSelector, setShowSelector] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleSelectChange = (e, type) => {
    const value = parseInt(e.target.value, 10);
    if (type === "month") setCurrentDate(new Date(year, value, 1));
    if (type === "year") setCurrentDate(new Date(value, month, 1));
  };

  const generateCalendar = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const allDays = [...blanks, ...days];

    return allDays.map((day, index) => {
      const isToday =
        day &&
        new Date().getDate() === day &&
        new Date().getMonth() === month &&
        new Date().getFullYear() === year;

      return (
        <div
          key={index}
          className={`h-16 w-16 flex items-center justify-center border rounded-lg transition-all duration-200 ${
            day
              ? `cursor-pointer hover:bg-blue-500 hover:text-white ${
                  isToday ? "border-blue-500 text-blue-600 font-semibold" : ""
                }`
              : "bg-transparent border-none"
          }`}
          onClick={() => day && openDay(day)}
        >
          {day || ""}
        </div>
      );
    });
  };

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  const years = Array.from({ length: 30 }, (_, i) => 2010 + i);

  return (
    <div className="relative p-6 bg-white shadow rounded-2xl">
      {/* 🔹 Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevMonth}
            className="p-2 transition rounded-lg hover:bg-gray-200"
          >
            <ChevronLeft size={20} />
          </button>

          <h2 className="text-lg font-semibold text-gray-800">
            {months[month]} {year}
          </h2>

          <button
            onClick={handleNextMonth}
            className="p-2 transition rounded-lg hover:bg-gray-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* ⋮ Botão de menu */}
        <div className="relative">
          <button
            onClick={() => setShowSelector(!showSelector)}
            className="p-2 transition rounded-lg hover:bg-gray-200"
          >
            <MoreVertical size={20} />
          </button>

          {showSelector && (
            <div className="absolute right-0 z-10 w-48 p-4 mt-2 bg-white border rounded-lg shadow-lg">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block mb-1 text-xs text-gray-500">Mês</label>
                  <select
                    value={month}
                    onChange={(e) => handleSelectChange(e, "month")}
                    className="w-full px-2 py-1 text-sm bg-gray-100 rounded-md focus:outline-none"
                  >
                    {months.map((m, i) => (
                      <option key={i} value={i}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-xs text-gray-500">Ano</label>
                  <select
                    value={year}
                    onChange={(e) => handleSelectChange(e, "year")}
                    className="w-full px-2 py-1 text-sm bg-gray-100 rounded-md focus:outline-none"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setShowSelector(false)}
                  className="self-end mt-2 text-sm text-blue-600 hover:underline"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🗓️ Cabeçalho de dias */}
      <div className="grid grid-cols-7 gap-3 mb-2 justify-items-center">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
          <div key={d} className="text-sm font-semibold text-gray-500">
            {d}
          </div>
        ))}
      </div>

      {/* 📅 Dias do mês */}
      <div className="grid grid-cols-7 gap-3 justify-items-center">
        {generateCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
