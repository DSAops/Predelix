import React, { useEffect, useState, useCallback } from 'react';
import { X, Store, Package, Calendar, TrendingUp, BarChart3, Upload, Database, RefreshCw } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function StoreModal({ storeId, products, onClose }) {
  const totalProducts = Object.keys(products).length;
  const totalPredictions = Object.values(products).reduce((sum, rows) => sum + rows.length, 0);
  
  const [uploadMode, setUploadMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [actualStockValue, setActualStockValue] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const { updateActualStockData } = useModal();

  // Lock body scroll when modal opens
  useEffect(() => {
    // Save current body overflow style and scroll position
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const scrollPosition = window.scrollY;
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    
    // Clean up function to restore original body style
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollPosition);
    };
  }, []);
  
  // Reset form when upload mode changes
  useEffect(() => {
    if (!uploadMode) {
      setSelectedProduct(null);
      setSelectedDate(null);
      setActualStockValue('');
      setUploadSuccess(false);
    }
  }, [uploadMode]);
  
  // Handle CSV file upload for actual stock data
  const handleActualDataUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Parse the CSV file
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split('\n');
      const headers = rows[0].split(',');
      
      // Find column indices
      const productIdIndex = headers.findIndex(h => 
        h.toLowerCase().includes('product') || h.toLowerCase().includes('item'));
      const dateIndex = headers.findIndex(h => 
        h.toLowerCase().includes('date'));
      const actualStockIndex = headers.findIndex(h => 
        h.toLowerCase().includes('actual') || h.toLowerCase().includes('stock'));
      
      if (productIdIndex === -1 || dateIndex === -1 || actualStockIndex === -1) {
        alert('CSV format not recognized. Please ensure your file has product_id, date, and actual_stock columns.');
        return;
      }
      
      // Process each row
      let updatesCount = 0;
      for (let i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue;
        
        const columns = rows[i].split(',');
        const productId = columns[productIdIndex].trim();
        const date = columns[dateIndex].trim();
        const actualStock = parseInt(columns[actualStockIndex].trim());
        
        if (products[productId]) {
          const productRows = products[productId];
          const rowToUpdate = productRows.find(row => row.date === date);
          
          if (rowToUpdate && !isNaN(actualStock)) {
            updateActualStockData(storeId, productId, date, actualStock);
            updatesCount++;
          }
        }
      }
      
      setUploadSuccess(true);
      alert(`Successfully updated ${updatesCount} records with actual stock data.`);
    };
    
    reader.readAsText(file);
  }, [products, storeId, updateActualStockData]);
  
  // Handle manual entry of actual stock data
  const handleActualStockUpdate = useCallback(() => {
    if (!selectedProduct || !selectedDate || actualStockValue === '') {
      alert('Please fill in all fields to update actual stock data.');
      return;
    }
    
    const actualStock = parseInt(actualStockValue);
    if (isNaN(actualStock) || actualStock < 0) {
      alert('Please enter a valid non-negative number for actual stock.');
      return;
    }
    
    updateActualStockData(storeId, selectedProduct, selectedDate, actualStock);
    setUploadSuccess(true);
    
    // Reset form after short delay
    setTimeout(() => {
      setSelectedProduct(null);
      setSelectedDate(null);
      setActualStockValue('');
    }, 1000);
  }, [selectedProduct, selectedDate, actualStockValue, storeId, updateActualStockData]);
  
  // Handle demo data generation
  const handleGenerateDemoData = useCallback(() => {
    // For each product with null actual_stock, generate a random actual stock value
    Object.entries(products).forEach(([productId, rows]) => {
      rows.forEach(row => {
        if (row.actual_stock === null) {
          // Generate more interesting variations for demo data
          let actualStock;
          const variationType = Math.random();
          
          if (variationType > 0.8) {
            // Significant outlier (20% chance)
            const outlierDirection = Math.random() > 0.5 ? 1 : -1;
            const outlierFactor = Math.random() * 0.3 + 0.15; // 15-45% variance
            actualStock = Math.max(0, Math.round(row.predicted_stock * (1 + (outlierDirection * outlierFactor))));
          } 
          else if (variationType > 0.5) {
            // Moderate variance (30% chance)
            const varianceDirection = Math.random() > 0.5 ? 1 : -1;
            const variance = Math.floor(row.predicted_stock * (Math.random() * 0.15 + 0.05) * varianceDirection);
            actualStock = Math.max(0, row.predicted_stock + variance);
          }
          else {
            // Close to prediction (50% chance)
            const variance = Math.floor(row.predicted_stock * (Math.random() * 0.1 - 0.05));
            actualStock = Math.max(0, row.predicted_stock + variance);
          }
          
          // Update the actual stock in both the modal and the main predictions array
          updateActualStockData(storeId, productId, row.date, actualStock);
        }
      });
    });
    
    setUploadSuccess(true);
    
    // Show meaningful feedback
    setTimeout(() => {
      setUploadSuccess(false);
    }, 3000);
  }, [products, storeId, updateActualStockData]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-all duration-300" style={{ position: 'fixed' }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-slideInUp" style={{ maxHeight: '80vh' }} onClick={(e) => e.stopPropagation()}>
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Store Predictions</h2>
                <p className="text-cyan-100">Store ID: {storeId}</p>
              </div>
            </div>
            
            {/* Prediction vs Actual Stats */}
            <div className="flex items-center px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <div className="flex flex-col items-center mr-4">
                <span className="text-xs font-semibold text-cyan-100">PREDICTED</span>
                <span className="text-lg font-bold text-white">
                  {Object.values(products).reduce((total, rows) => 
                    total + rows.reduce((sum, row) => sum + row.predicted_stock, 0), 0)}
                </span>
              </div>
              <div className="h-10 w-px bg-white/30"></div>
              <div className="flex flex-col items-center ml-4">
                <span className="text-xs font-semibold text-cyan-100">ACTUAL</span>
                <span className="text-lg font-bold text-white">
                  {Object.values(products).reduce((total, rows) => 
                    total + rows.reduce((sum, row) => row.actual_stock !== null ? sum + row.actual_stock : sum, 0), 0)}
                </span>
              </div>
            </div>
            
            {/* Enhanced Close Button */}
            <button 
              onClick={onClose}
              className="group w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
          
          {/* Stats Row */}
          <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-cyan-200" />
              <span className="text-sm text-cyan-100">{totalProducts} Products</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-200" />
              <span className="text-sm text-blue-100">{totalPredictions} Predictions</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-sky-200" />
              <span className="text-sm text-sky-100">AI Analysis</span>
            </div>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 200px)' }}>
          <div className="grid gap-6">
            {Object.entries(products).map(([productId, rows], index) => (
              <div 
                key={productId} 
                className="bg-gradient-to-br from-gray-50 to-cyan-50/30 rounded-xl border border-cyan-200/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Product Header */}
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-4 border-b border-cyan-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Package className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Product ID: {productId}</h3>
                        <p className="text-sm text-gray-600">{rows.length} predictions available</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 px-3 py-1 bg-cyan-100 rounded-full">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-cyan-700">Active</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100/50">
                        <th className="py-3 px-6 text-left font-semibold text-gray-700 flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-cyan-600" />
                          <span>Date</span>
                        </th>
                        <th className="py-3 px-6 text-left font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                            <span>Predicted Stock</span>
                          </div>
                        </th>
                        <th className="py-3 px-6 text-left font-semibold text-gray-700">
                          <div className="flex items-center space-x-2">
                            <BarChart3 className="w-4 h-4 text-green-600" />
                            <span>Actual Stock</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, idx) => (
                        <tr 
                          key={idx} 
                          className="border-t border-gray-200 hover:bg-cyan-50/50 transition-colors duration-200"
                        >
                          <td className="py-4 px-6 text-gray-800 font-medium">
                            {row.date}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-cyan-600 text-lg">
                                {row.predicted_stock}
                              </span>
                              <span className="text-sm text-gray-500">units</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            {row.actual_stock !== null ? (
                              <div className="flex items-center space-x-2">
                                <span className={`font-bold text-lg ${
                                  row.actual_stock < row.predicted_stock * 0.95 
                                    ? 'text-red-600' 
                                    : row.actual_stock > row.predicted_stock * 1.05 
                                      ? 'text-green-600' 
                                      : 'text-blue-600'
                                }`}>
                                  {row.actual_stock}
                                </span>
                                <span className="text-sm text-gray-500">units</span>
                                {row.actual_stock !== row.predicted_stock && (
                                  <div className="flex items-center">
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                      row.actual_stock < row.predicted_stock * 0.95
                                        ? 'bg-red-50 text-red-600' 
                                        : row.actual_stock > row.predicted_stock * 1.05
                                          ? 'bg-green-50 text-green-600' 
                                          : 'bg-blue-50 text-blue-600'
                                    }`}>
                                      {Math.abs(row.actual_stock - row.predicted_stock)} {row.actual_stock < row.predicted_stock ? 'less' : 'more'}
                                    </span>
                                    <div className="ml-1 w-12 h-3 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full ${
                                          row.actual_stock < row.predicted_stock * 0.95 
                                            ? 'bg-red-500' 
                                            : row.actual_stock > row.predicted_stock * 1.05 
                                              ? 'bg-green-500' 
                                              : 'bg-blue-500'
                                        }`}
                                        style={{
                                          width: `${Math.min(100, Math.abs(row.actual_stock - row.predicted_stock) / row.predicted_stock * 100)}%`
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400 italic">No data yet</span>
                                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Pending</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actual Stock Data Upload Section */}
        {uploadMode && (
          <div className="bg-blue-50/80 px-6 py-5 border-t border-blue-200">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-800">Update Actual Stock Data</h3>
                <button 
                  onClick={() => setUploadMode(false)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* File Upload Option */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-200">
                  <h4 className="font-medium text-blue-700 mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload CSV File
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload a CSV file with product_id, date, and actual_stock columns to update multiple records at once.
                  </p>
                  <label className="flex flex-col items-center px-4 py-6 bg-blue-50 text-blue hover:bg-blue-100 rounded-lg border-2 border-dashed border-blue-300 cursor-pointer">
                    <Database className="w-8 h-8 text-blue-500 mb-2" />
                    <span className="text-sm font-medium text-blue-700">Click to select a CSV file</span>
                    <span className="text-xs text-blue-500 mt-1">CSV files only</span>
                    <input 
                      type="file" 
                      accept=".csv" 
                      className="hidden" 
                      onChange={handleActualDataUpload} 
                    />
                  </label>
                </div>
                
                {/* Manual Entry Option */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-200">
                  <h4 className="font-medium text-blue-700 mb-3">Manual Entry</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                      <select 
                        className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedProduct || ''}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                      >
                        <option value="">Select a product...</option>
                        {Object.keys(products).map(productId => (
                          <option key={productId} value={productId}>
                            Product ID: {productId}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {selectedProduct && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <select 
                          className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={selectedDate || ''}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        >
                          <option value="">Select a date...</option>
                          {products[selectedProduct].map((row, index) => (
                            <option key={index} value={row.date} disabled={row.actual_stock !== null}>
                              {row.date} {row.actual_stock !== null ? '(Already has data)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    {selectedDate && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Actual Stock</label>
                        <input 
                          type="number" 
                          min="0"
                          className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={actualStockValue}
                          onChange={(e) => setActualStockValue(e.target.value)}
                          placeholder="Enter actual stock value"
                        />
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <button
                        onClick={handleActualStockUpdate}
                        disabled={!selectedProduct || !selectedDate || actualStockValue === ''}
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-md shadow-sm transition-colors"
                      >
                        Update Actual Stock
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sample CSV Template */}
              <div className="mt-4 bg-white p-4 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">CSV Template Example</h4>
                <div className="overflow-x-auto">
                  <pre className="text-xs bg-gray-50 p-3 rounded border border-gray-200">
                    product_id,date,actual_stock
                    {Object.entries(products).flatMap(([productId, rows]) => 
                      rows.filter(row => row.actual_stock === null)
                         .slice(0, 2)
                         .map(row => `\n${productId},${row.date},0`)
                    ).join('')}
                  </pre>
                </div>
              </div>

              {/* Demo Data Option */}
              <div className="mt-4 bg-gradient-to-r from-sky-50 to-indigo-50 p-4 rounded-xl border border-sky-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sky-700">Need quick demo data?</h4>
                    <p className="text-sm text-sky-600">
                      Generate realistic actual stock data for all missing entries instantly.
                    </p>
                  </div>
                  <button
                    onClick={handleGenerateDemoData}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Generate Demo Data</span>
                  </button>
                </div>
              </div>
              
              {/* Success Notification */}
              {uploadSuccess && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span>Actual stock data successfully updated! Charts and statistics will now show comparison between predicted and actual values.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Enhanced Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                Showing all predictions for Store {storeId}
              </div>
              
              {!uploadMode && (
                <button 
                  onClick={() => setUploadMode(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-100 hover:bg-cyan-200 text-cyan-800 text-sm font-medium rounded-md transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Actual Data</span>
                </button>
              )}
            </div>
            
            <button
              onClick={onClose}
              className="group inline-flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span>Close</span>
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes slideInUp {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-slideInUp { 
          animation: slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
        
        /* Style scrollbars for better UX */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 157, 224, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 157, 224, 0.5);
        }
      `}</style>
    </div>
  );
} 