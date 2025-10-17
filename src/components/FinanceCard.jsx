import React from "react";

const FinanceCard = ({ title, value, color }) => {
  return (
    <div className="p-5 transition-all duration-300 bg-white shadow rounded-2xl hover:shadow-lg">
      <h2 className="text-sm font-medium text-gray-500">{title}</h2>
      <p className={`text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  );
};

export default FinanceCard;
