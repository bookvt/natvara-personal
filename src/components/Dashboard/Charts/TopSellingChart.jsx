import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TopSellingChart = ({ data }) => {
  return (
    <div className="h-[500px] w-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Top 10 Selling Products
      </h3>
      <div className="flex-grow min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            barSize={24}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
            <XAxis 
                type="number" 
                tick={{ fill: '#6b7280' }} 
                axisLine={{ stroke: '#e5e7eb' }} 
                tickFormatter={(value) => {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                    return value;
                }}
            />
            <YAxis 
              dataKey="ITEM_DESC" 
              type="category" 
              width={180} 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              interval={0}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip 
               formatter={(value) => new Intl.NumberFormat('en-TH', { style: 'currency', currency: 'THB' }).format(value)}
               cursor={{ fill: '#f9fafb' }}
               contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Bar dataKey="Actual_Total_sell_out_store_Value" name="Sales Value (THB)" fill="#3b82f6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopSellingChart;
