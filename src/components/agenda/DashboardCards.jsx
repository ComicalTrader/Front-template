import React from "react";
import { Clock, Users, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardCards = ({ todayAppointments, totalMonth, servicesTotal, pending }) => {
  const navigate = useNavigate();

  const handleGoToClients = () => {
    const currentMonth = new Date().toISOString().slice(0, 7); // ex: "2025-10"
    navigate("/clientes", { state: { filterMonth: currentMonth } });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex items-center justify-between p-5 bg-white shadow rounded-2xl">
        <div>
          <p className="text-sm text-gray-500">Cortes hoje</p>
          <h2 className="text-3xl font-bold">{todayAppointments}</h2>
        </div>
        <Clock className="w-10 h-10 text-blue-500" />
      </div>

      {/* 🔗 Card que leva para Clientes filtrado */}
      <div
        onClick={handleGoToClients}
        className="flex items-center justify-between p-5 transition-all bg-white shadow cursor-pointer rounded-2xl hover:bg-green-50"
      >
        <div>
          <p className="text-sm text-gray-500">Clientes no mês</p>
          <h2 className="text-3xl font-bold">{totalMonth}</h2>
        </div>
        <Users className="w-10 h-10 text-green-500" />
      </div>

      <div className="flex items-center justify-between p-5 bg-white shadow rounded-2xl">
        <div>
          <p className="text-sm text-gray-500">Serviços prestados</p>
          <h2 className="text-3xl font-bold">{servicesTotal}</h2>
        </div>
        <BarChart3 className="w-10 h-10 text-purple-500" />
      </div>

      <div className="flex items-center justify-between p-5 bg-white shadow rounded-2xl">
        <div>
          <p className="text-sm text-gray-500">Pendentes</p>
          <h2 className="text-3xl font-bold">{pending}</h2>
        </div>
        <Clock className="w-10 h-10 text-yellow-500" />
      </div>
    </div>
  );
};

export default DashboardCards;
