/**
 * Joins Catalogue and Data Exchange datasets based on ITEM or BARCODE.
 * @param {Array} catalogueData 
 * @param {Array} exchangeData 
 * @returns {Array} - Merged dataset.
 */
export const joinDatasets = (catalogueData, exchangeData) => {
  // Create a map for quick lookup from Catalogue
  // Key could be ITEM or BARCODE. Since BARCODE might be more unique or ITEM might be, 
  // we need a reliable way. Requirement says "based on ITEM or BARCODE".
  // Let's index by ITEM first, then BARCODE if ITEM fails, or try to match both.
  
  // Strategy: Index Catalogue by ITEM and BARCODE for O(1) lookup.
  const catalogueMap = new Map();

  catalogueData.forEach(item => {
    if (item.ITEM) catalogueMap.set(`ITEM:${item.ITEM}`, item);
    if (item.BARCODE) catalogueMap.set(`BARCODE:${item.BARCODE}`, item);
  });

  const mergedData = exchangeData.map(exchangeBase => {
    let match = null;

    if (exchangeBase.ITEM) {
      match = catalogueMap.get(`ITEM:${exchangeBase.ITEM}`);
    }
    
    if (!match && exchangeBase.BARCODE) {
      match = catalogueMap.get(`BARCODE:${exchangeBase.BARCODE}`);
    }

    // Merge logic: Exchange data + Catalogue data
    // If no match found in Catalogue, we still keep Exchange data but with empty Catalogue fields
    return {
      ...exchangeBase,
      ...(match || {}),
      // Ensure key IDs from Exchange are preserved if they differ or are needed
      ITEM: exchangeBase.ITEM || match?.ITEM,
      BARCODE: exchangeBase.BARCODE || match?.BARCODE
    };
  });

  return mergedData;
};

/**
 * Aggregates data for charts.
 * @param {Array} data - The merged dataset.
 */
export const aggregateData = (data) => {
  // Top 10 Selling Products
  const topSelling = [...data]
    .sort((a, b) => (b.Actual_Total_sell_out_store_Value || 0) - (a.Actual_Total_sell_out_store_Value || 0))
    .slice(0, 10);

  // Sales by Brand
  const salesByBrand = data.reduce((acc, curr) => {
    const brand = curr.BRAND || 'Unknown';
    const value = curr.Actual_Total_sell_out_store_Value || 0;
    acc[brand] = (acc[brand] || 0) + value;
    return acc;
  }, {});

  // Sales by Item Class (Split by Brand: Loreal vs Watson)
  const salesByClass = data.reduce((acc, curr) => {
    const itemClass = curr.Item_class__A_B_C_Watson || 'Unknown';
    const value = parseFloat(curr.Actual_Total_sell_out_store_Value || 0);
    const brand = (curr.BRAND || '').toUpperCase();

    if (!acc[itemClass]) {
      acc[itemClass] = { name: itemClass, Loreal: 0, Watson: 0, value: 0 };
    }

    if (brand.includes('LOREAL')) {
      acc[itemClass].Loreal += value;
    } else {
      // Assuming non-Loreal are "Watson" as per user request context, or general "Others" labeled as Watson
      acc[itemClass].Watson += value;
    }
    acc[itemClass].value += value;

    return acc;
  }, {});

  // Stock Value Location
  const totalStockDC = data.reduce((sum, item) => sum + parseFloat(item.Total_stock_valueTHB_DC || 0), 0);
  const totalStockAllStores = data.reduce((sum, item) => sum + parseFloat(item.Total_stock_value_THB_All_Stores || 0), 0);

  // Stock Level by Brand (Stacked)
  const stockByBrand = data.reduce((acc, curr) => {
    const brand = curr.BRAND || 'Unknown';
    if (!acc[brand]) acc[brand] = { name: brand, DC: 0, Store: 0 };
    
    const dcStock = parseFloat(curr.Total_stock_qty_DC || 0);
    // console.log(`Brand: ${brand}, DC Raw: ${curr.Total_stock_qty_DC}, DC Parsed: ${dcStock}`);

    // Ensure we parse as specific number type to avoid string concatenation or NaN
    acc[brand].DC += dcStock; 
    acc[brand].Store += parseFloat(curr.Total_stock_Qty_All_Stores || 0);
    return acc;
  }, {});

  // Product Status Overview (Count)
  const productStatus = data.reduce((acc, curr) => {
    const status = curr.Item_status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // ABC Analysis (Count)
  const abcAnalysis = data.reduce((acc, curr) => {
    const itemClass = curr.Item_class__A_B_C_Watson || 'Unknown';
    acc[itemClass] = (acc[itemClass] || 0) + 1;
    return acc;
  }, {});

  return {
    topSelling,
    salesByBrand: Object.entries(salesByBrand).map(([name, value]) => ({ name, value })),
    salesByClass: Object.values(salesByClass), // Now returning the object values directly which contain { name, Loreal, Watson }
    stockValueLocation: [
      { name: 'DC Stock Value', value: totalStockDC },
      { name: 'All Stores Stock Value', value: totalStockAllStores }
    ],
    stockByBrand: Object.values(stockByBrand),
    productStatus: Object.entries(productStatus).map(([name, value]) => ({ name, value })),
    abcAnalysis: Object.entries(abcAnalysis).map(([name, value]) => ({ name, value }))
  };
};

export const calculateKPIs = (data) => {
  const totalSalesValue = data.reduce((sum, item) => sum + (item.Actual_Total_sell_out_store_Value || 0), 0);
  const totalSalesQty = data.reduce((sum, item) => sum + (item.Actual_Total_sell_out_store_qty || 0), 0);
  
  return {
    totalSalesValue,
    totalSalesQty
  };
};
