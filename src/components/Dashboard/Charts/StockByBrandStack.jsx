import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StockByBrandStack = ({ data }) => {
  return (
    <div className="h-[400px] w-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Stock Level by Brand
      </h3>
      <div className="flex-grow min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={40}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} />
            <YAxis 
                tick={{ fill: '#6b7280' }} 
                axisLine={{ stroke: '#e5e7eb' }} 
                width={80}
                tickFormatter={(value) => {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                    return value;
                }}
            />
            <Tooltip 
                cursor={{ fill: 'transparent' }} 
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend verticalAlign="top" iconType="circle" />
            <Bar dataKey="DC" name="DC Stock" stackId="a" fill="#3b82f6" />
            <Bar dataKey="Store" name="Store Stock" stackId="a" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockByBrandStack;
