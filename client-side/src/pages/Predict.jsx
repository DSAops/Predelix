import React, { useState, useEffect } from 'react';
import { Footer } from './common/Footer';
import { UploadCloud, BarChart2, DatabaseIcon, RefreshCw, Truck, Package, Globe, Zap, Shield, TrendingUp, Target, Brain } from 'lucide-react';

// Floating elements for Predict page
const FloatingPredictElements = ({ scrollY }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Floating prediction elements */}
      <div 
        className="absolute top-16 left-8 w-10 h-10 bg-gradient-to-br from-cyan-400/25 to-blue-500/25 rounded-lg animate-float1 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      >
        <BarChart2 className="w-5 h-5 text-cyan-500/70" />
      </div>
      
      <div 
        className="absolute top-24 right-12 w-8 h-8 bg-gradient-to-br from-blue-400/25 to-sky-500/25 rounded-md animate-float2 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      >
        <TrendingUp className="w-4 h-4 text-blue-500/70" />
      </div>
      
      <div 
        className="absolute top-1/3 left-12 w-12 h-12 bg-gradient-to-br from-sky-400/25 to-cyan-500/25 rounded-xl animate-float3 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <Brain className="w-6 h-6 text-sky-500/70 animate-pulse" />
      </div>
      
      <div 
        className="absolute bottom-32 right-8 w-6 h-6 bg-gradient-to-br from-cyan-300/25 to-blue-400/25 rounded-full animate-float1 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.25}px)` }}
      >
        <Target className="w-3 h-3 text-cyan-500/70" />
      </div>
      
      <div 
        className="absolute bottom-16 left-1/4 w-14 h-14 bg-gradient-to-br from-blue-500/25 to-sky-600/25 rounded-2xl animate-float2 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.18}px)` }}
      >
        <Package className="w-7 h-7 text-blue-500/70 animate-bounce" />
      </div>
    </div>
  );
};

function Predict() {
  // Navbar height (px)
  const NAVBAR_HEIGHT = 66; // px (matches py-[13px] + 40px content)
  
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex flex-col overflow-x-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(56,189,248,0.08),rgba(255,255,255,0.9))]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.06),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.06),transparent)]"></div>
        
        {/* Animated background shapes */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-cyan-400/8 to-blue-500/8 rounded-full animate-morph-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-blue-400/8 to-sky-500/8 rounded-full animate-morph-medium"></div>
      </div>
      
      <FloatingPredictElements scrollY={scrollY} />
      
      <div 
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: NAVBAR_HEIGHT + 32, paddingBottom: 32 }}
      >
        {/* Enhanced Header */}
        <div 
          className="text-center mb-12 transform transition-all duration-1000"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        >
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <h1 className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 bg-clip-text text-transparent mb-4 animate-slideInUp">
              AI-Powered Stock Prediction
            </h1>
          </div>
          <p className="text-lg text-sky-600 max-w-3xl mx-auto leading-relaxed animate-slideInUp animation-delay-200">
            Upload your inventory data and get intelligent predictions for optimal stock levels with 
            <span className="font-semibold text-cyan-600 animate-pulse"> machine learning insights</span>
          </p>
        </div>

        {/* Enhanced Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Enhanced Upload Section */}
          <div 
            className="group bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden animate-slideInUp animation-delay-400"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          >
            {/* Animated background in card */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center animate-bounce">
                  <UploadCloud className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-sky-700">Data Upload</h2>
              </div>
              
              <div className="relative text-center p-8 border-2 border-dashed border-cyan-300/60 rounded-xl bg-gradient-to-br from-cyan-50/50 to-blue-50/50 hover:from-cyan-50 hover:to-blue-50 transition-all duration-300 cursor-pointer group-hover:border-cyan-400/80">
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <UploadCloud className="relative h-12 w-12 mx-auto text-cyan-500 mb-4 animate-float1" />
                  </div>
                  <p className="text-sky-800 font-medium mb-2">
                    {file ? (
                      <span className="flex items-center justify-center space-x-2">
                        <Package className="w-4 h-4 animate-bounce" />
                        <span>{file.name}</span>
                      </span>
                    ) : (
                      "Upload your inventory data"
                    )}
                  </p>
                  <p className="text-sm text-sky-600">
                    Drop your CSV or Excel file here or click to browse
                  </p>
                </label>
              </div>

              <button
                onClick={handlePredict}
                disabled={!file || loading}
                className={`group relative w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 overflow-hidden
                  ${!file || loading 
                    ? 'bg-gray-200 cursor-not-allowed text-gray-400' 
                    : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 hover:from-cyan-600 hover:via-blue-600 hover:to-sky-600 text-white shadow-xl hover:shadow-2xl'
                  }`}
              >
                {!file && !loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
                <div className="relative z-10 flex items-center gap-3">
                  {loading ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Processing Data...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="h-5 w-5 animate-pulse" />
                      <span>Generate AI Predictions</span>
                      <BarChart2 className="h-5 w-5 group-hover:animate-bounce" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Right Column - Enhanced Results Section */}
          <div 
            className="group bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-200/50 p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden animate-slideInUp animation-delay-600"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          >
            {/* Animated background in card */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-sky-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-sky-500 rounded-lg flex items-center justify-center animate-pulse">
                  <BarChart2 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-sky-700">Prediction Results</h2>
              </div>
              
              {predictions ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 text-center border border-cyan-200/50 transform hover:scale-105 transition-all duration-300 animate-slideInUp animation-delay-800">
                      <div className="relative mb-2">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur opacity-50"></div>
                        <Package className="relative w-6 h-6 mx-auto text-cyan-500 animate-bounce" />
                      </div>
                      <p className="text-sm text-sky-600 mb-1">Current Stock</p>
                      <p className="text-2xl font-bold text-cyan-600">{predictions.totalItems}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-4 text-center border border-blue-200/50 transform hover:scale-105 transition-all duration-300 animate-slideInUp animation-delay-1000">
                      <div className="relative mb-2">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-sky-500/20 rounded-full blur opacity-50"></div>
                        <TrendingUp className="relative w-6 h-6 mx-auto text-blue-500 animate-pulse" />
                      </div>
                      <p className="text-sm text-sky-600 mb-1">Predicted Demand</p>
                      <p className="text-2xl font-bold text-blue-600">{predictions.predictedDemand}</p>
                    </div>
                    <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-xl p-4 text-center border border-sky-200/50 transform hover:scale-105 transition-all duration-300 animate-slideInUp animation-delay-1200">
                      <div className="relative mb-2">
                        <div className="absolute -inset-1 bg-gradient-to-r from-sky-400/20 to-cyan-500/20 rounded-full blur opacity-50"></div>
                        <Target className="relative w-6 h-6 mx-auto text-sky-500 animate-spin-slow" />
                      </div>
                      <p className="text-sm text-sky-600 mb-1">Confidence</p>
                      <p className="text-2xl font-bold text-sky-600">{predictions.confidence}%</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50/50 to-blue-50/50 rounded-xl p-6 border border-cyan-200/50 animate-slideInUp animation-delay-1400">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white animate-pulse" />
                      </div>
                      <h3 className="text-lg font-semibold text-sky-800">AI Recommendations</h3>
                    </div>
                    <ul className="space-y-3">
                      {predictions.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3 text-sky-700 group">
                          <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mt-0.5 group-hover:animate-bounce">
                            <Zap className="w-3 h-3 text-white" />
                          </div>
                          <span className="flex-1">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-slideInUp animation-delay-800">
                  <div className="relative mb-6">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-sky-500/20 rounded-full blur-xl opacity-50"></div>
                    <DatabaseIcon className="relative h-16 w-16 text-blue-300 animate-float1" />
                  </div>
                  <h3 className="text-xl font-bold text-sky-700 mb-3">Ready for Analysis</h3>
                  <p className="text-sky-600 leading-relaxed">
                    Upload your inventory data and generate predictions to see intelligent insights and recommendations here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(6px) rotate(-2deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(1deg); }
        }
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes morph-slow {
          0%, 100% { transform: scale(1) rotate(0deg); border-radius: 50%; }
          50% { transform: scale(1.2) rotate(180deg); border-radius: 30%; }
        }
        @keyframes morph-medium {
          0%, 100% { transform: scale(1) rotate(0deg); border-radius: 50%; }
          50% { transform: scale(0.8) rotate(-90deg); border-radius: 40%; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-float1 { animation: float1 4s ease-in-out infinite; }
        .animate-float2 { animation: float2 5s ease-in-out infinite; }
        .animate-float3 { animation: float3 6s ease-in-out infinite; }
        .animate-slideInUp { animation: slideInUp 1s ease-out forwards; }
        .animate-morph-slow { animation: morph-slow 20s ease-in-out infinite; }
        .animate-morph-medium { animation: morph-medium 15s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1200 { animation-delay: 1.2s; }
        .animation-delay-1400 { animation-delay: 1.4s; }
      `}</style>
      
      <Footer />
    </div>
  );
}

export default Predict;
