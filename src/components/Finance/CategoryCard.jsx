import React from "react";

const CategoryCard = ({ title, value, color }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <p className="text-sm font-medium">{title}</p>
      <p className={`mt-2 text-xl font-bold ${color}`}>R$ {value.toFixed(2)}</p>
    </div>
  );
};

export default CategoryCard;
