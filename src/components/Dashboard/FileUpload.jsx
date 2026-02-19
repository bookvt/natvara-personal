import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, Trash2 } from 'lucide-react';

const FileUpload = ({ onFilesSelected }) => {
  const [files, setFiles] = useState({ catalogue: null, dataExchange: null });
  
  const catalogueInputRef = useRef(null);
  const dataExchangeInputRef = useRef(null);

  const handleFileChange = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      const newFiles = { ...files, [type]: file };
      setFiles(newFiles);
      
      // Check if both files are uploaded to auto-submit
      if (newFiles.catalogue && newFiles.dataExchange) {
        onFilesSelected(newFiles);
      }
    }
  };

  const handleClear = (type) => {
    setFiles(prev => ({ ...prev, [type]: null }));
    if (type === 'catalogue' && catalogueInputRef.current) catalogueInputRef.current.value = '';
    if (type === 'dataExchange' && dataExchangeInputRef.current) dataExchangeInputRef.current.value = '';
  };

  const UploadCard = ({ title, type, file, inputRef }) => (
    <div className={`
      relative flex flex-col items-center justify-center p-8 rounded-xl border-2 transition-all duration-300 h-full min-h-[280px] w-full
      ${file 
        ? 'border-green-500 bg-green-50/50' 
        : 'border-gray-200 bg-white hover:border-blue-400 hover:shadow-md'
      }
    `}>
      <input
        type="file"
        accept=".csv"
        ref={inputRef}
        className="hidden"
        onChange={(e) => handleFileChange(type, e)}
      />

      {file ? (
        <>
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title} Ready</h3>
          <div className="bg-white px-4 py-2 rounded-full border border-green-200 text-sm font-medium text-gray-700 mb-6 shadow-sm max-w-[90%] truncate">
            {file.name}
          </div>
          <button
            onClick={() => handleClear(type)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-100 rounded-lg hover:bg-red-50 transition-colors shadow-sm"
          >
            <Trash2 size={16} />
            Remove
          </button>
        </>
      ) : (
        <>
          <div className="p-4 bg-blue-50 rounded-full text-blue-600 mb-4">
            <FileText size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-8">
            Upload <strong>{type === 'catalogue' ? 'Catalogue.csv' : 'Data_exchange.csv'}</strong>
          </p>
          <button
            onClick={() => inputRef.current.click()}
            className="mt-auto flex items-center gap-2 px-6 py-2.5 text-blue-700 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all font-medium shadow-sm"
          >
            <Upload size={18} />
            Select File
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="h-full">
          <UploadCard 
            title="Catalogue File" 
            type="catalogue" 
            file={files.catalogue} 
            inputRef={catalogueInputRef} 
          />
        </div>
        <div className="h-full">
          <UploadCard 
            title="Data Exchange File" 
            type="dataExchange" 
            file={files.dataExchange} 
            inputRef={dataExchangeInputRef} 
          />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
