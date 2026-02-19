import React from 'react';

const MetricCard = ({ title, value, icon, colorClass = 'text-blue-600', bgClass = 'bg-blue-50' }) => {
  return (
    <div className="h-full flex items-center p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className={`mr-4 p-3 rounded-lg ${bgClass} ${colorClass}`}>
        {icon}
      </div>
      <div>
          <p className="text-sm font-medium text-gray-500 mb-1">
          {title}
          </p>
          <div className="text-2xl font-bold text-gray-900">
          {value}
          </div>
      </div>
    </div>
  );
};

export default MetricCard;
