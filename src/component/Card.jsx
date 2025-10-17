import React from "react";

const Card = ({ title, value, color }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: "12px",
        padding: "20px",
        color: "white",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
};

export default Card;
