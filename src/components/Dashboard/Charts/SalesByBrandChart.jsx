import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#775DD0', '#00E396', 
  '#FEB019', '#1B998B', '#2E294E', '#F46036', '#E2C044', '#5B5F97', '#FF6B6B', '#4ECDC4', 
  '#C7F464', '#81D4FA', '#546E7A'
];

const SalesByBrandChart = ({ data }) => {
  // Process data to group small values into "Others"
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // items with < 2% share
    const threshold = 0.02;
    
    let largeItems = [];
    let smallItemsTotal = 0;
    
    data.forEach(item => {
      if (item.value / total >= threshold) {
        largeItems.push(item);
      } else {
        smallItemsTotal += item.value;
      }
    });
    
    // Sort large items
    largeItems.sort((a, b) => b.value - a.value);
    
    // Add Others if exists
    if (smallItemsTotal > 0) {
      largeItems.push({ name: 'Others', value: smallItemsTotal });
    }
    
    return largeItems;
  }, [data]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
     // Only show label if percent is significant (though we already grouped, this is a double check or for really small charts)
     if (percent < 0.01) return null;

     const RADIAN = Math.PI / 180;
     // Calculate label position - push it out a bit further
     const radius = outerRadius * 1.2; 
     const x = cx + radius * Math.cos(-midAngle * RADIAN);
     const y = cy + radius * Math.sin(-midAngle * RADIAN);
     
     // Determine text anchor based on position
     const textAnchor = x > cx ? 'start' : 'end';
     
     return (
       <text x={x} y={y} fill="#374151" textAnchor={textAnchor} dominantBaseline="central" fontSize={12}>
         <tspan x={x} dy="-0.6em" fontWeight="bold">{name}</tspan>
         <tspan x={x} dy="1.2em" fill="#6b7280">{`${new Intl.NumberFormat('en-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(value)} (${(percent * 100).toFixed(0)}%)`}</tspan>
       </text>
     );
  };

  return (
    <div className="h-[600px] w-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Sales by Brand
      </h3>
      <div className="flex-grow min-h-0 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="45%"
              innerRadius={80}
              outerRadius={140}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label={renderCustomizedLabel}
              labelLine={true}
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
                formatter={(value) => new Intl.NumberFormat('en-TH', { style: 'currency', currency: 'THB' }).format(value)} 
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
            />
            <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center" 
                iconType="circle" 
                wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesByBrandChart;
