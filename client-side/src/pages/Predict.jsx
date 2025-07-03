import { useState } from 'react';
import { Footer } from './common/Footer';
import { UploadCloud, BarChart2, DatabaseIcon, RefreshCw } from 'lucide-react';

function Predict() {
  // Navbar height (px)
  const NAVBAR_HEIGHT = 66; // px (matches py-[13px] + 40px content)
  
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // TODO: Handle file processing
    }
  };

  const handlePredict = () => {
    setLoading(true);
    // TODO: Implement prediction logic
    setTimeout(() => {
      setPredictions({
        totalItems: 150,
        predictedDemand: 200,
        confidence: 85,
        recommendations: [
          "Increase stock by 25% for next month",
          "High demand expected during weekends",
          "Consider seasonal trends"
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div 
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: NAVBAR_HEIGHT + 32, paddingBottom: 32 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">Stock Prediction Dashboard</h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Upload your inventory data and get AI-powered predictions for optimal stock levels
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-6">
            <div className="space-y-6">
              <div className="text-center p-6 border-2 border-dashed border-purple-200 rounded-xl bg-purple-50/50 hover:bg-purple-50 transition cursor-pointer">
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <UploadCloud className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                  <p className="text-zinc-800 font-medium mb-1">
                    {file ? file.name : "Upload your inventory data"}
                  </p>
                  <p className="text-sm text-zinc-600">
                    Drop your file here or click to browse
                  </p>
                </label>
              </div>

              <button
                onClick={handlePredict}
                disabled={!file || loading}
                className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 
                  ${!file || loading 
                    ? 'bg-purple-200 cursor-not-allowed text-purple-400' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                  } transition-colors`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <BarChart2 className="h-5 w-5" />
                    Generate Predictions
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Results Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-6">
            {predictions ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-zinc-600 mb-1">Current Stock</p>
                    <p className="text-2xl font-bold text-purple-600">{predictions.totalItems}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-zinc-600 mb-1">Predicted Demand</p>
                    <p className="text-2xl font-bold text-purple-600">{predictions.predictedDemand}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-zinc-600 mb-1">Confidence</p>
                    <p className="text-2xl font-bold text-purple-600">{predictions.confidence}%</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-zinc-800 mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {predictions.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-zinc-600">
                        <span className="text-purple-500 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <DatabaseIcon className="h-12 w-12 text-purple-200 mb-4" />
                <h3 className="text-lg font-medium text-zinc-800 mb-2">No Data Yet</h3>
                <p className="text-zinc-600">
                  Upload your inventory data and generate predictions to see insights here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Predict;
