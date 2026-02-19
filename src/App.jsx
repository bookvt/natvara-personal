import React from 'react';
import MainLayout from './components/Layout/MainLayout';
import FileUpload from './components/Dashboard/FileUpload';
import DashboardTabs from './components/Dashboard/DashboardTabs';
import { useData } from './context/DataContext';
import { Loader2, AlertCircle } from 'lucide-react';

function App() {
  const { processFiles, loading, error, data } = useData();

  const handleFilesSelected = (files) => {
    processFiles(files);
  };

  return (
    <MainLayout>
      {/* Only show header when NO data */}
      {!data.mergedData.length && (
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Upload your <strong>Catalogue.csv</strong> and <strong>Data_exchange.csv</strong> files to generate analytics.
          </p>
        </div>
      )}

      {/* Upload Screen */}
      {!loading && !data.mergedData.length && !error && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 sm:p-8">
           <div className="max-w-4xl w-full flex flex-col items-center text-center">
             <h2 className="text-4xl font-extrabold text-blue-900 mb-4 tracking-tight">
              Welcome to Analytics Pro
            </h2>
            <p className="text-lg text-gray-500 mb-10 max-w-2xl">
              Upload your data files to visualize key performance indicators, inventory health, and sales trends in seconds.
            </p>
            
            <FileUpload onFilesSelected={handleFilesSelected} />
            
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
               <span>Supported formats: CSV</span>
            </div>
           </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <Loader2 className="h-16 w-16 text-blue-600 animate-spin mb-6" />
          <h3 className="text-xl font-semibold text-blue-800">Processing Data...</h3>
          <p className="text-gray-500 mt-2">Merging datasets and calculating KPIs</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
             <h4 className="text-red-800 font-medium">Error Occurred</h4>
             <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {data.mergedData.length > 0 && <DashboardTabs />}
    </MainLayout>
  );
}

export default App;
