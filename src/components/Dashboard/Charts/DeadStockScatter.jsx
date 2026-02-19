import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ZAxis } from 'recharts';

const DeadStockScatter = ({ data }) => {
  return (
    <div className="h-[500px] w-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Dead Stock Analysis
        </h3>
        <p className="text-sm text-gray-500">
          High Stock Qty vs Low Sales Qty
        </p>
      </div>
      <div className="flex-grow min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis 
                type="number" 
                dataKey="Total__stock_qty_DC" 
                name="Stock Qty" 
                unit="" 
                tick={{ fill: '#6b7280' }} 
                axisLine={{ stroke: '#e5e7eb' }}
                label={{ value: 'Stock Qty', position: 'insideBottom', offset: -10, fill: '#374151' }}
            />
            <YAxis 
                type="number" 
                dataKey="Actual_Total_sell_out_store_qty" 
                name="Sales Qty" 
                unit="" 
                tick={{ fill: '#6b7280' }} 
                axisLine={{ stroke: '#e5e7eb' }}
                label={{ value: 'Sales Qty', angle: -90, position: 'insideLeft', fill: '#374151' }}
                width={60}
            />
            <ZAxis type="category" dataKey="ITEM_DESC" name="Item" />
            <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend verticalAlign="top" iconType="circle" />
            <Scatter name="Products" data={data} fill="#ef4444" shape="circle" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeadStockScatter;
