import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseCSV } from '../utils/csvParser';
import { joinDatasets, aggregateData, calculateKPIs } from '../utils/dataHelpers';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    rawCatalogue: [],
    rawExchange: [],
    mergedData: [],
    aggregated: null,
    kpis: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const processFiles = async (files) => {
    setLoading(true);
    setError(null);
    try {
      const [catalogueData, exchangeData] = await Promise.all([
        parseCSV(files.catalogue),
        parseCSV(files.dataExchange)
      ]);

      const merged = joinDatasets(catalogueData, exchangeData);
      const aggregated = aggregateData(merged);
      const kpis = calculateKPIs(merged);

      setData({
        rawCatalogue: catalogueData,
        rawExchange: exchangeData,
        mergedData: merged,
        aggregated,
        kpis
      });
    } catch (err) {
      console.error("Error processing files:", err);
      setError("Failed to process files. Please check the CSV format.");
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setData({
      rawCatalogue: [],
      rawExchange: [],
      mergedData: [],
      aggregated: null,
      kpis: null
    });
    setError(null);
  };

  return (
    <DataContext.Provider value={{ data, loading, error, processFiles, clearData }}>
      {children}
    </DataContext.Provider>
  );
};
