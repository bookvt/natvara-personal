import React from 'react';
import { useData } from '../../context/DataContext';
import { Trash2 } from 'lucide-react';

export default function MainLayout({ children }) {
  const { data, clearData } = useData();
  const hasData = data && data.mergedData && data.mergedData.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Minimalist Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold tracking-tight text-blue-700">
              Analytics Pro
            </h1>
          </div>

          <div>
            {hasData && (
              <button 
                onClick={clearData}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                title="Clear Data & Upload New"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Clear Data</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-6 w-full max-w-[1920px] mx-auto">
        {children}
      </main>
    </div>
  );
}
