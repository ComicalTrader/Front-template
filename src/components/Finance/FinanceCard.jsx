import React from "react";

const FinanceCard = ({ title, value, color }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <p className="text-sm font-medium">{title}</p>
      <p className={`mt-2 text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
};

export default FinanceCard;
