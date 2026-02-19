import Papa from 'papaparse';

/**
 * Parses a CSV file and returns a Promise resolving to the data array.
 * @param {File} file - The CSV file object.
 * @returns {Promise<Array>} - Parsed data objects.
 */
export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true, // Automatically converts numbers
      complete: (results) => {
        if (results.errors.length > 0) {
          console.warn("CSV Parsing warning:", results.errors);
        }
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};
