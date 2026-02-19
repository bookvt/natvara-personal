import React, { useState } from 'react';
import { DollarSign, ShoppingCart } from 'lucide-react';

import { useData } from '../../context/DataContext';

import MetricCard from './MetricCard';
import TopSellingChart from './Charts/TopSellingChart';
import SalesByBrandChart from './Charts/SalesByBrandChart';
import SalesByClassChart from './Charts/SalesByClassChart';
import StockValuePie from './Charts/StockValuePie';
import DeadStockScatter from './Charts/DeadStockScatter';
import StockByBrandStack from './Charts/StockByBrandStack';
import ProductStatusPie from './Charts/ProductStatusPie';
import AbcAnalysisBar from './Charts/AbcAnalysisBar';

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data } = useData();

  const { aggregated, kpis } = data;

  if (!aggregated || !kpis) return null;

  const tabs = [
    { label: 'Sales Performance', id: 0 },
    { label: 'Inventory & Stock Health', id: 1 },
    { label: 'Product Portfolio', id: 2 },
  ];

  return (
    <div className="w-full px-2 md:px-0">
      <div className="border-b border-gray-200 mb-6 bg-white rounded-t-lg px-4 shadow-sm">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab 1: Sales Performance */}
      {activeTab === 0 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <MetricCard 
                title="Total Sales Value" 
                value={new Intl.NumberFormat('en-TH', { style: 'currency', currency: 'THB' }).format(kpis.totalSalesValue)} 
                icon={<DollarSign size={24} />}
                colorClass="text-green-600"
                bgClass="bg-green-50"
            />
             <MetricCard 
                title="Total Sales Qty" 
                value={new Intl.NumberFormat('en-TH').format(kpis.totalSalesQty)} 
                icon={<ShoppingCart size={24} />}
                colorClass="text-blue-600"
                bgClass="bg-blue-50"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <TopSellingChart data={aggregated.topSelling} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <SalesByBrandChart data={aggregated.salesByBrand} />
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <SalesByClassChart data={aggregated.salesByClass} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Inventory & Stock Health */}
      {activeTab === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <StockValuePie data={aggregated.stockValueLocation} />
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <StockByBrandStack data={aggregated.stockByBrand} />
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <DeadStockScatter data={data.mergedData} /> 
          </div>
        </div>
      )}

      {/* Tab 3: Product Portfolio */}
      {activeTab === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <ProductStatusPie data={aggregated.productStatus} />
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <AbcAnalysisBar data={aggregated.abcAnalysis} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTabs;
