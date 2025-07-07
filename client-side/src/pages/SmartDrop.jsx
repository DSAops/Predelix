import React, { useState } from 'react';
import { UploadCloud, PhoneCall, FileSpreadsheet, Loader2, CheckCircle, AlertCircle, Users, ArrowLeft, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://predelix-1.onrender.com/api';

function SmartDrop() {
  const [csvFile, setCsvFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [calling, setCalling] = useState(false);
  const [callDone, setCallDone] = useState(false);
  const [callError, setCallError] = useState(null);
  const [responses, setResponses] = useState(null);
  const [loadingResponses, setLoadingResponses] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [showResponses, setShowResponses] = useState(false);
  const navigate = useNavigate();

  // Handlers
  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
    setUploaded(false);
    setUploadError(null);
    setCallDone(false);
    setResponses(null);
    setShowResponses(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) return;
    setUploading(true);
    setUploadError(null);
    setUploaded(false);
    setCallDone(false);
    setResponses(null);
    setShowResponses(false);
    try {
      const formData = new FormData();
      formData.append('file', csvFile);
      const res = await fetch(`${API_BASE}/upload_customers`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      setUploaded(true);
    } catch (err) {
      setUploadError('Failed to upload CSV. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleMakeCalls = async () => {
    setCalling(true);
    setCallError(null);
    setCallDone(false);
    setResponses(null);
    setShowResponses(false);
    try {
      const res = await fetch(`${API_BASE}/trigger_calls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhook_base_url: window.location.origin }),
      });
      if (!res.ok) throw new Error('Call trigger failed');
      setCallDone(true);
    } catch (err) {
      setCallError('Failed to trigger calls. Please try again.');
    } finally {
      setCalling(false);
    }
  };

  const handleViewResponses = async () => {
    setLoadingResponses(true);
    setResponseError(null);
    setResponses(null);
    setShowResponses(false);
    try {
      const res = await fetch(`${API_BASE}/results`);
      if (!res.ok) throw new Error('Failed to fetch responses');
      const data = await res.json();
      if (!data || data.length === 0) {
        setResponses([]);
      } else {
        setResponses(data);
      }
      setShowResponses(true);
    } catch (err) {
      setResponseError('Failed to fetch responses. Please try again.');
    } finally {
      setLoadingResponses(false);
    }
  };

  // UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-cyan-100 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute -inset-8 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-3xl blur-2xl animate-pulse -z-10"></div>
        {/* Title */}
        <div className="flex items-center gap-3 mb-2">
          <Package className="w-8 h-8 text-cyan-500 animate-bounce" />
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 bg-clip-text text-transparent drop-shadow-lg">SmartDrop – Automated Delivery Calls</h1>
        </div>
        <p className="text-lg text-sky-700 mb-8">Upload your customer list and let us handle the delivery confirmation calls automatically.</p>

        {/* Step 1: CSV Upload */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-cyan-700 mb-2 flex items-center gap-2"><UploadCloud className="w-5 h-5" /> Upload Customer CSV</h2>
          <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full sm:w-auto border border-cyan-200 rounded-lg px-3 py-2 text-sky-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white/80 shadow"
              disabled={uploading || calling}
            />
            <button
              type="submit"
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 border border-cyan-200 bg-gradient-to-r from-cyan-400 to-blue-400 text-white hover:from-cyan-500 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed ${uploading ? 'animate-pulse' : ''}`}
              disabled={!csvFile || uploading || calling}
            >
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
          {uploaded && <div className="mt-2 text-green-600 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> CSV uploaded successfully!</div>}
          {uploadError && <div className="mt-2 text-red-600 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> {uploadError}</div>}
        </div>

        {/* Step 2: Make Calls */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-cyan-700 mb-2 flex items-center gap-2"><PhoneCall className="w-5 h-5" /> Make Calls</h2>
          <button
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-xl transition-all duration-300 border border-blue-200 bg-gradient-to-r from-blue-400 to-sky-500 text-white hover:from-blue-500 hover:to-sky-600 disabled:opacity-60 disabled:cursor-not-allowed ${calling ? 'animate-pulse' : ''}`}
            disabled={!uploaded || calling || uploading}
            onClick={handleMakeCalls}
          >
            {calling ? <Loader2 className="w-5 h-5 animate-spin" /> : <PhoneCall className="w-5 h-5" />}
            {calling ? 'Making Calls...' : 'Make Calls'}
          </button>
          {callDone && <div className="mt-2 text-green-600 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Calls completed! You can now check user responses.</div>}
          {callError && <div className="mt-2 text-red-600 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> {callError}</div>}
          {calling && <div className="mt-2 text-sky-700 flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> 📞 Making calls to your customers... Please wait while we build the results.</div>}
        </div>

        {/* Step 3: View Responses */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-cyan-700 mb-2 flex items-center gap-2"><FileSpreadsheet className="w-5 h-5" /> User Responses</h2>
          <button
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-xl transition-all duration-300 border border-sky-200 bg-gradient-to-r from-sky-400 to-cyan-500 text-white hover:from-sky-500 hover:to-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed ${loadingResponses ? 'animate-pulse' : ''}`}
            disabled={!callDone || loadingResponses || calling}
            onClick={handleViewResponses}
          >
            {loadingResponses ? <Loader2 className="w-5 h-5 animate-spin" /> : <Users className="w-5 h-5" />}
            {loadingResponses ? 'Loading...' : 'View User Responses'}
          </button>
          {responseError && <div className="mt-2 text-red-600 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> {responseError}</div>}
          {showResponses && responses && responses.length === 0 && (
            <div className="mt-4 text-sky-700 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> 📭 No responses yet. Please make the calls first.</div>
          )}
        </div>

        {/* Step 4: Response Table */}
        {showResponses && responses && responses.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-sky-700 mb-4 flex items-center gap-2"><FileSpreadsheet className="w-5 h-5" /> Call Results</h3>
            <div className="overflow-x-auto rounded-lg shadow border border-cyan-100 bg-white/80">
              <table className="min-w-full text-sm text-sky-800">
                <thead>
                  <tr className="bg-cyan-50">
                    {Object.keys(responses[0]).map((key) => (
                      <th key={key} className="px-4 py-2 font-semibold text-left border-b border-cyan-100">{key.replace(/_/g, ' ').toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {responses.map((row, idx) => (
                    <tr key={idx} className="even:bg-cyan-50/50">
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-4 py-2 border-b border-cyan-50">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="mt-6 flex items-center gap-2 px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 border border-cyan-200 bg-gradient-to-r from-cyan-400 to-blue-400 text-white hover:from-cyan-500 hover:to-blue-500"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5" /> Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SmartDrop; 