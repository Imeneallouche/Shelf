// components/StatCard.tsx
import React from "react";
interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

const StatCard = ({ title, value, change }: StatCardProps) => {
  const isPositive = change.includes("+");

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p
          className={`mt-2 text-sm ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change} depuis dernier mois
        </p>
      </div>
    </div>
  );
};

export default StatCard;
