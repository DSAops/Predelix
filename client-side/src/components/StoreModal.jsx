import React from 'react';
import { X, Store, Package, Calendar, TrendingUp, BarChart3 } from 'lucide-react';

export default function StoreModal({ storeId, products, onClose }) {
  const totalProducts = Object.keys(products).length;
  const totalPredictions = Object.values(products).reduce((sum, rows) => sum + rows.length, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideInUp">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Store Predictions</h2>
                <p className="text-cyan-100">Store ID: {storeId}</p>
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing all predictions for Store {storeId}
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
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slideInUp { 
          animation: slideInUp 0.4s ease-out forwards; 
        }
      `}</style>
    </div>
  );
} 