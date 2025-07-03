
import { TextEffect } from '../../components/motion-primitives/text-effect';
import videoPreview from '../assets/video.mp4';
import { ArrowRight, BarChart2, Brain, Clock, Database, Store, TrendingUp } from 'lucide-react';


import { Footer } from './common/Footer';

function HomePage() {
  // Navbar height (px)
  const NAVBAR_HEIGHT = 66; // px (matches py-[13px] + 40px content)
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div
        className="flex-1 relative w-full flex flex-col items-center overflow-x-hidden px-2 md:px-8 pt-4 pb-8"
        style={{ paddingTop: NAVBAR_HEIGHT + 12 }}
    >
      {/* Purple Background Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(167,139,250,0.15) 0%, rgba(255,255,255,1) 70%)',
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className={`absolute rounded-full bg-purple-300/10 animate-float${i % 3 + 1}`}
            style={{
              width: `${12 + Math.random() * 24}px`,
              height: `${12 + Math.random() * 24}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <main
        className="flex-1 flex flex-col items-center justify-center w-full z-20 mt-4 mb-8 px-4"
        style={{ minHeight: `calc(100vh - ${NAVBAR_HEIGHT + 32}px)` }}
      >
        <div className="bg-white backdrop-blur-2xl rounded-2xl shadow-lg p-8 md:p-12 border border-purple-200 relative mx-2 md:mx-0 mt-4 mb-4 w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-left space-y-6">
              <TextEffect per="char" preset="fade" className="text-4xl lg:text-5xl font-extrabold text-purple-600 mb-2 drop-shadow-lg leading-tight">
                Intelligent Stock Prediction for Modern Retail
              </TextEffect>
              <h2 className="text-2xl font-semibold text-zinc-800 tracking-wide">
                Revolutionize Your Order Replenishment System
              </h2>
              <div className="space-y-4 text-zinc-600">
                <p className="text-lg leading-relaxed">
                  Predelix is an end-to-end solution that transforms how retailers manage their inventory. Our advanced AI-driven system predicts optimal stock levels for each store, ensuring you have the right products at the right time.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-300 text-xl mt-1">•</span>
                    <p><span className="text-purple-300 font-semibold">Smart Predictions:</span> Leverage machine learning to forecast stock requirements based on historical data, seasonality, and local events.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-300 text-xl mt-1">•</span>
                    <p><span className="text-purple-300 font-semibold">Real-time Analytics:</span> Monitor inventory levels, sales patterns, and prediction accuracy across all your locations.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-300 text-xl mt-1">•</span>
                    <p><span className="text-purple-300 font-semibold">Automated Ordering:</span> Set up intelligent reorder points and let the system handle routine replenishment tasks.</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-700 via-purple-600 to-purple-300 text-white font-bold shadow-lg border border-purple-700/60 transition hover:scale-105 hover:from-purple-800 hover:to-purple-400">
                  Get Started
                </button>
                <button className="px-6 py-3 rounded-lg bg-white text-purple-600 font-semibold border border-purple-200 transition hover:bg-purple-50">
                  View Demo
                </button>
              </div>
            </div>
            
            {/* Right Video */}
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-purple-200 bg-white backdrop-blur-lg transition-transform hover:scale-102 hover:shadow-purple-300/30">
                <video
                  src={videoPreview}
                  controls
                  className="w-full aspect-video object-cover bg-white"
                  poster="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
                  style={{ boxShadow: '0 0 32px 0 rgba(167,139,250,0.25)' }}
                >
                  Sorry, your browser does not support embedded videos.
                </video>
                <div className="absolute top-3 left-3 bg-purple-100 text-xs text-purple-600 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
                  Product Demo
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white backdrop-blur-xl rounded-lg p-4 border border-purple-200 shadow-lg">
                <div className="text-purple-600 font-semibold text-sm">Average Improvement</div>
                <div className="text-zinc-800 text-2xl font-bold">+42%</div>
                <div className="text-zinc-500 text-xs">Stock Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-7xl mt-16 space-y-16">
          {/* How It Works */}
          <section className="bg-white backdrop-blur-2xl rounded-2xl shadow-lg p-8 md:p-12 border border-purple-200">
            <h2 className="text-3xl font-bold text-purple-600 mb-8">How Predelix Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Database className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-800">1. Data Collection</h3>
                <p className="text-zinc-600">
                  Automatically gather historical sales data, inventory levels, and external factors like seasonality and local events.
                </p>
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-800">2. AI Analysis</h3>
                <p className="text-zinc-600">
                  Our machine learning models analyze patterns and predict future stock requirements with high accuracy.
                </p>
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Store className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-800">3. Smart Ordering</h3>
                <p className="text-zinc-600">
                  Automated order generation ensures optimal stock levels while minimizing excess inventory.
                </p>
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="bg-white backdrop-blur-2xl rounded-2xl shadow-lg p-8 md:p-12 border border-purple-200">
            <h2 className="text-3xl font-bold text-purple-600 mb-8">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <TrendingUp className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-zinc-800 mb-2">Increased Sales</h3>
                <p className="text-zinc-600">Reduce stockouts and maximize sales opportunities with optimal inventory levels.</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <Clock className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-zinc-800 mb-2">Time Savings</h3>
                <p className="text-zinc-600">Automate routine ordering tasks and focus on strategic decisions.</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <BarChart2 className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-zinc-800 mb-2">Data Insights</h3>
                <p className="text-zinc-600">Gain valuable insights into sales patterns and inventory performance.</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-purple-100 to-white backdrop-blur-2xl rounded-2xl shadow-lg p-8 md:p-12 border border-purple-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold text-purple-600 mb-4">Ready to Transform Your Inventory Management?</h2>
                <p className="text-lg text-zinc-600">Join leading retailers who have improved their stock accuracy by up to 42%.</p>
              </div>
              <button className="flex items-center space-x-2 px-8 py-4 rounded-lg bg-purple-500 text-white font-bold shadow-lg transition hover:bg-purple-600 hover:scale-105">
                <span>Schedule a Demo</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Creative CSS Animations */}
      <style>{`
        @keyframes float1 { 0% { transform: translateY(0); } 50% { transform: translateY(-18px); } 100% { transform: translateY(0); } }
        @keyframes float2 { 0% { transform: translateY(0); } 50% { transform: translateY(12px); } 100% { transform: translateY(0); } }
        @keyframes float3 { 0% { transform: translateY(0); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0); } }
        .animate-float1 { animation: float1 6s ease-in-out infinite; }
        .animate-float2 { animation: float2 8s ease-in-out infinite; }
        .animate-float3 { animation: float3 7s ease-in-out infinite; }
        
        /* Make navbar overlay only after scroll */
        body:not(.scrolled) .navbar-overlay {
          box-shadow: none !important;
          background: transparent !important;
        }
      `}</style>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;