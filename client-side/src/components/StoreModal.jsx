import React from 'react';

export default function StoreModal({ storeId, products, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Predicted Stock for Store ID: {storeId}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-2xl">&times;</button>
        </div>
        <div className="space-y-6">
          {Object.entries(products).map(([productId, rows]) => (
            <div key={productId}>
              <div className="font-semibold text-blue-700 mb-2">Product ID: {productId}</div>
              <table className="w-full mb-4 border">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="py-2 px-3 text-left">Date</th>
                    <th className="py-2 px-3 text-left">Predicted Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-1 px-3">{row.date}</td>
                      <td className="py-1 px-3">{row.predicted_stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 