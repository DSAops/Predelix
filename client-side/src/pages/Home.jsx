import React, { useEffect, useState } from 'react';
import { ArrowRight, Truck, Package, Globe, BarChart2, Zap, Shield } from 'lucide-react';
import LogisticsStoryAnimation from '../../components/LogisticsStoryAnimation';

// Animated logistics-themed floating objects
const FloatingLogisticsObjects = ({ scrollY }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Floating Trucks */}
      <div 
        className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-xl animate-float1 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.3}px)` }}
      >
        <Truck className="w-8 h-8 text-cyan-500/80" />
      </div>
      
      {/* Floating Packages */}
      <div 
        className="absolute top-32 right-20 w-12 h-12 bg-gradient-to-br from-blue-400/30 to-sky-500/30 rounded-lg animate-float2 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      >
        <Package className="w-6 h-6 text-blue-500/80" />
      </div>
      
      {/* Floating Globe */}
      <div 
        className="absolute top-1/2 left-20 w-20 h-20 bg-gradient-to-br from-sky-400/30 to-cyan-500/30 rounded-2xl animate-float3 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      >
        <Globe className="w-10 h-10 text-sky-500/80 animate-spin-slow" />
      </div>
      
      {/* Floating Analytics */}
      <div 
        className="absolute top-1/3 right-10 w-14 h-14 bg-gradient-to-br from-cyan-300/30 to-blue-400/30 rounded-xl animate-float1 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.25}px)` }}
      >
        <BarChart2 className="w-7 h-7 text-cyan-500/80" />
      </div>
      
      {/* Moving Delivery Path */}
      <div 
        className="absolute bottom-40 left-1/2 w-18 h-18 bg-gradient-to-br from-blue-500/30 to-sky-600/30 rounded-lg animate-slide shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <Zap className="w-8 h-8 text-blue-500/80" />
      </div>
      
      {/* Small floating elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-br from-cyan-500/25 to-blue-500/25 rounded-md animate-float2 shadow-md flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.4}px)` }}
      >
        <Shield className="w-4 h-4 text-cyan-500/80" />
      </div>
      
      <div 
        className="absolute top-3/4 right-1/4 w-10 h-10 bg-gradient-to-br from-sky-500/25 to-cyan-500/25 rounded-lg animate-float3 shadow-md flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      >
        <Package className="w-5 h-5 text-sky-500/80" />
      </div>
      
      {/* Large animated supply chain visualization */}
      <div 
        className="absolute top-10 left-1/3 w-32 h-32 bg-gradient-to-br from-cyan-200/20 to-blue-300/20 rounded-full animate-pulse shadow-xl flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.05}px)` }}
      >
        <div className="w-16 h-16 border-2 border-cyan-400/50 rounded-full animate-spin-slow flex items-center justify-center">
          <Globe className="w-8 h-8 text-cyan-500/60" />
        </div>
      </div>
      
      <div 
        className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-sky-300/20 rounded-full animate-bounce shadow-xl flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.08}px)` }}
      >
        <Truck className="w-8 h-8 text-blue-500/60" />
      </div>
      
      {/* Animated connection lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
            </linearGradient>
          </defs>
          <path 
            d="M 100 200 Q 300 100 500 250 T 800 300" 
            stroke="url(#connectionGradient)" 
            strokeWidth="2" 
            fill="none" 
            className="animate-draw-path"
          />
          <path 
            d="M 200 400 Q 400 300 600 450 T 900 500" 
            stroke="url(#connectionGradient)" 
            strokeWidth="2" 
            fill="none" 
            className="animate-draw-path animation-delay-1000"
          />
        </svg>
      </div>
    </div>
  );
};

// Animated count up
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  
  useEffect(() => {
    if (!hasStarted) {
      setHasStarted(true);
      let start = 0;
      const increment = end / 60;
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, duration / 60);
      return () => clearInterval(timer);
    }
  }, [end, duration, hasStarted]);
  
  return count;
};

function HomePage() {
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

  // Animated stats
  const accuracy = useCountUp(99, 2000);
  const revenue = useCountUp(32, 2500);
  const efficiency = useCountUp(85, 3000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white text-slate-800 overflow-x-hidden">
      {/* Background and floating boxes */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(56,189,248,0.10),rgba(255,255,255,0.7))]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.07),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.07),transparent)]"></div>
      </div>
      <FloatingLogisticsObjects scrollY={scrollY} />

      {/* HERO WITH ANIMATED BACKGROUND */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        {/* Animated Hero Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full animate-morph-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-blue-400/10 to-sky-500/10 rounded-full animate-morph-medium"></div>
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-gradient-to-br from-sky-400/10 to-cyan-500/10 rounded-full animate-morph-fast"></div>
        </div>

        {/* Animated Central Hero Element */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div 
              className="text-center lg:text-left transform transition-all duration-1000 ease-out"
              style={{ transform: `translateY(${scrollY * -0.1}px)` }}
            >
              {/* Animated Logo/Brand */}
              <div className="mb-8 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
                <h1 className="relative text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500 bg-clip-text text-transparent drop-shadow-lg animate-slideInUp">
                  PREDELIX
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500 bg-clip-text text-transparent opacity-50 animate-ping"></div>
              </div>

              {/* Animated Tagline */}
              <div className="relative overflow-hidden">
                <h2 className="text-2xl md:text-4xl font-bold mb-6 text-sky-700 animate-slideInUp animation-delay-200">
                  <span className="inline-block animate-wave">🚀</span>
                  Next-Gen Logistics Intelligence
                  <span className="inline-block animate-wave animation-delay-500">📦</span>
                </h2>
              </div>

              {/* Animated Description */}
              <p className="text-lg md:text-xl text-sky-600 max-w-3xl lg:max-w-none leading-relaxed mb-8 animate-slideInUp animation-delay-400">
                Revolutionizing supply chain management with 
                <span className="font-semibold text-cyan-600 animate-pulse"> AI-powered predictions</span>, 
                <span className="font-semibold text-blue-600 animate-pulse animation-delay-300"> real-time optimization</span>, and 
                <span className="font-semibold text-sky-600 animate-pulse animation-delay-600"> autonomous decision-making</span> systems.
              </p>

              {/* Animated Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-slideInUp animation-delay-600">
                <button className="group relative px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500 hover:from-cyan-500 hover:via-blue-500 hover:to-sky-600 font-bold text-white shadow-xl transform hover:scale-105 transition-all duration-300 border border-cyan-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center">
                    <Zap className="w-5 h-5 mr-2 animate-pulse" />
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
                <button className="group px-10 py-4 rounded-xl bg-white/90 backdrop-blur-xl border border-sky-200 hover:border-blue-300 font-semibold text-sky-700 hover:text-blue-700 shadow-xl transform hover:scale-105 transition-all duration-300">
                  <span className="flex items-center">
                    <Globe className="w-5 h-5 mr-2 animate-spin-slow" />
                    View Demo
                  </span>
                </button>
              </div>
            </div>

            {/* Right Side - Aesthetic Video */}
            <div 
              className="relative flex justify-center lg:justify-end transform transition-all duration-1000 ease-out"
              style={{ transform: `translateY(${scrollY * -0.05}px)` }}
            >
              {/* Decorative Background Elements */}
              <div className="absolute -inset-8 opacity-60">
                {/* Floating Geometric Shapes */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full animate-float1 blur-sm"></div>
                <div className="absolute top-1/4 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/25 to-sky-500/25 rounded-lg animate-float2 blur-sm"></div>
                <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-gradient-to-br from-sky-400/35 to-cyan-500/35 rounded-full animate-float3 blur-sm"></div>
                <div className="absolute bottom-0 right-1/4 w-14 h-14 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-lg animate-float1 blur-sm"></div>
              </div>

              {/* Main Video Container */}
              <div className="relative group">
                {/* Outer Decorative Ring */}
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="absolute -inset-5 bg-gradient-to-r from-white via-sky-100 to-white rounded-3xl"></div>
                
                {/* Inner Decorative Frame */}
                <div className="absolute -inset-3 bg-gradient-to-br from-cyan-100 via-blue-100 to-sky-100 rounded-2xl shadow-xl"></div>
                <div className="absolute -inset-2 bg-gradient-to-br from-white to-cyan-50 rounded-2xl"></div>
                
                {/* Video Element */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-shadow duration-300">
                  {/* Video with Controls */}
                  <video 
                    className="w-full h-auto max-w-md lg:max-w-lg rounded-xl transform group-hover:scale-105 transition-transform duration-300"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/vite.svg"
                  >
                    <source src="/src/assets/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-blue-900/20 rounded-xl pointer-events-none"></div>
                </div>

                {/* Floating Icons Around Video */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-br from-blue-400 to-sky-500 rounded-full flex items-center justify-center text-white shadow-lg animate-float2">
                  <Package className="w-3 h-3" />
                </div>
                <div className="absolute -bottom-4 -left-6 w-7 h-7 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg animate-float3">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="absolute -bottom-2 -right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce animation-delay-500">
                  <Zap className="w-4 h-4" />
                </div>

                {/* Sparkle Effects */}
                <div className="absolute top-1/4 -left-8 text-2xl text-yellow-400 animate-pulse">✨</div>
                <div className="absolute top-3/4 -right-8 text-xl text-blue-400 animate-pulse animation-delay-300">⭐</div>
                <div className="absolute bottom-1/4 -left-10 text-lg text-cyan-400 animate-pulse animation-delay-600">💫</div>
                
                {/* Corner Decorations */}
                <div className="absolute -top-8 -left-8 w-16 h-16 border-t-4 border-l-4 border-cyan-400 rounded-tl-2xl opacity-60"></div>
                <div className="absolute -top-8 -right-8 w-16 h-16 border-t-4 border-r-4 border-blue-400 rounded-tr-2xl opacity-60"></div>
                <div className="absolute -bottom-8 -left-8 w-16 h-16 border-b-4 border-l-4 border-sky-400 rounded-bl-2xl opacity-60"></div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 border-b-4 border-r-4 border-purple-400 rounded-br-2xl opacity-60"></div>
              </div>

              {/* Video Description */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-sm text-sky-600 font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  🎬 Watch Predelix in Action
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Stats Section */}
        <div 
          className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-5xl mx-auto transform transition-all duration-1000"
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        >
          <div className="group bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-cyan-200 shadow-xl flex flex-col items-center animate-slideInUp animation-delay-800 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="relative mb-4">
              <div className="absolute -inset-2 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-full">
                <BarChart2 className="w-8 h-8 text-cyan-500 animate-bounce" />
              </div>
            </div>
            <div className="text-5xl font-bold text-cyan-500 mb-2 animate-count-up">{accuracy}%</div>
            <div className="text-sky-700 font-medium text-center">Prediction Accuracy</div>
            <div className="text-xs text-sky-500 mt-1 opacity-70">AI-Powered Insights</div>
          </div>
          
          <div className="group bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-blue-200 shadow-xl flex flex-col items-center animate-slideInUp animation-delay-1000 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="relative mb-4">
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-400/20 to-sky-500/20 rounded-full blur animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-full">
                <Zap className="w-8 h-8 text-blue-500 animate-pulse" />
              </div>
            </div>
            <div className="text-5xl font-bold text-blue-500 mb-2 animate-count-up">+{revenue}%</div>
            <div className="text-sky-700 font-medium text-center">Revenue Growth</div>
            <div className="text-xs text-sky-500 mt-1 opacity-70">Year-over-Year</div>
          </div>
          
          <div className="group bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-sky-200 shadow-xl flex flex-col items-center animate-slideInUp animation-delay-1200 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="relative mb-4">
              <div className="absolute -inset-2 bg-gradient-to-br from-sky-400/20 to-cyan-500/20 rounded-full blur animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-sky-50 to-cyan-50 p-4 rounded-full">
                <Shield className="w-8 h-8 text-sky-500 animate-spin-slow" />
              </div>
            </div>
            <div className="text-5xl font-bold text-sky-500 mb-2 animate-count-up">{efficiency}%</div>
            <div className="text-sky-700 font-medium text-center">Efficiency Boost</div>
            <div className="text-xs text-sky-500 mt-1 opacity-70">Automated Operations</div>
          </div>
        </div>
      </section>

      {/* STORY ANIMATION SECTION */}
      <section className="relative py-24 px-4 md:px-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-50">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500 bg-clip-text text-transparent">
              How Predelix Transforms Logistics
            </h2>
            <p className="text-xl text-sky-600 max-w-3xl mx-auto">
              Watch our AI-powered solution solve complex logistics challenges in real-time
            </p>
          </div>

          {/* Story Animation Container */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Animation */}
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
                <LogisticsStoryAnimation size="large" />
              </div>
            </div>

            {/* Story Steps Description */}
            <div className="flex-1 space-y-8">
              <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-red-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">The Challenge</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Traditional logistics face chaotic parcel management, inefficient routes, and wasted resources. 
                  Packages get lost, deliveries are delayed, and costs spiral out of control.
                </p>
              </div>

              <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">AI Analysis</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Our advanced AI algorithms analyze millions of data points, identifying patterns, 
                  predicting demand, and calculating optimal solutions in real-time.
                </p>
              </div>

              <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Smart Organization</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Parcels are automatically sorted and organized using intelligent algorithms, 
                  ensuring perfect categorization and streamlined workflow.
                </p>
              </div>

              <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-cyan-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">4</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Route Optimization</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Delivery routes are optimized in real-time, considering traffic, weather, and priority, 
                  ensuring maximum efficiency and minimum cost.
                </p>
              </div>

              <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">5</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Perfect Delivery</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  The result: Fast, efficient, and cost-effective logistics that delight customers 
                  and maximize your business potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED FEATURES */}
      <section className="relative py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500 bg-clip-text text-transparent">
              Revolutionary Features
            </h2>
            <p className="text-xl text-sky-600 max-w-3xl mx-auto">
              Transform your logistics operations with cutting-edge AI technology
            </p>
          </div>

          {/* Enhanced Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-cyan-100 flex flex-col items-center animate-slideInUp animation-delay-200 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 w-full">
                <div className="relative mb-6">
                  <div className="absolute -inset-3 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                    <Truck className="w-10 h-10 text-cyan-500 animate-bounce" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-sky-700 mb-3 text-center">Smart Fleet Management</h3>
                <p className="text-sky-500 text-center leading-relaxed">
                  Real-time tracking with predictive maintenance, route optimization, and autonomous dispatch systems for maximum efficiency.
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                  <span className="px-2 py-1 bg-cyan-100 text-cyan-600 rounded-full text-xs">Real-time</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">AI-Powered</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-100 flex flex-col items-center animate-slideInUp animation-delay-400 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/20 to-sky-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 w-full">
                <div className="relative mb-6">
                  <div className="absolute -inset-3 bg-gradient-to-br from-blue-400/20 to-sky-500/20 rounded-full blur animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-blue-50 to-sky-50 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                    <Package className="w-10 h-10 text-blue-500 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-sky-700 mb-3 text-center">Intelligent Inventory</h3>
                <p className="text-sky-500 text-center leading-relaxed">
                  AI-driven demand forecasting, automated restocking, and zero-waste inventory management across your entire supply chain.
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Predictive</span>
                  <span className="px-2 py-1 bg-sky-100 text-sky-600 rounded-full text-xs">Automated</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-sky-100 flex flex-col items-center animate-slideInUp animation-delay-600 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="absolute -inset-1 bg-gradient-to-br from-sky-400/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 w-full">
                <div className="relative mb-6">
                  <div className="absolute -inset-3 bg-gradient-to-br from-sky-400/20 to-cyan-500/20 rounded-full blur animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-sky-50 to-cyan-50 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                    <Globe className="w-10 h-10 text-sky-500 animate-spin-slow" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-sky-700 mb-3 text-center">Global Optimization</h3>
                <p className="text-sky-500 text-center leading-relaxed">
                  Worldwide supply chain coordination with multi-modal transport planning and automated compliance management.
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                  <span className="px-2 py-1 bg-sky-100 text-sky-600 rounded-full text-xs">Global</span>
                  <span className="px-2 py-1 bg-cyan-100 text-cyan-600 rounded-full text-xs">Smart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED CTA */}
      <section className="relative py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-white/95 to-sky-50/95 backdrop-blur-xl rounded-3xl p-12 border border-sky-100 shadow-2xl animate-slideInUp animation-delay-400 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full animate-float1"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-sky-400/10 to-cyan-500/10 rounded-full animate-float2"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500 bg-clip-text text-transparent">
                Ready to Transform Your Logistics?
              </h2>
              <p className="text-xl text-sky-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join the next generation of intelligent supply chain management. Experience the power of AI-driven logistics optimization.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group relative px-12 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500 hover:from-cyan-500 hover:via-blue-500 hover:to-sky-600 font-bold text-white shadow-2xl transform hover:scale-105 transition-all duration-300 border border-cyan-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center">
                    <Zap className="w-5 h-5 mr-2 animate-pulse" />
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
                
                <button className="group px-12 py-4 rounded-xl bg-white/90 backdrop-blur-xl border border-sky-200 hover:border-blue-300 font-semibold text-sky-700 hover:text-blue-700 shadow-xl transform hover:scale-105 transition-all duration-300">
                  <span className="flex items-center">
                    <Package className="w-5 h-5 mr-2 animate-bounce" />
                    Schedule Demo
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Custom Animations */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-5deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes slide {
          0% { transform: translateX(-20px); }
          50% { transform: translateX(20px); }
          100% { transform: translateX(-20px); }
        }
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        @keyframes morph-slow {
          0%, 100% { transform: scale(1) rotate(0deg); border-radius: 50%; }
          50% { transform: scale(1.2) rotate(180deg); border-radius: 30%; }
        }
        @keyframes morph-medium {
          0%, 100% { transform: scale(1) rotate(0deg); border-radius: 50%; }
          50% { transform: scale(0.8) rotate(-90deg); border-radius: 40%; }
        }
        @keyframes morph-fast {
          0%, 100% { transform: scale(1) rotate(0deg); border-radius: 50%; }
          50% { transform: scale(1.1) rotate(270deg); border-radius: 20%; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes draw-path {
          0% { stroke-dasharray: 0 1000; }
          100% { stroke-dasharray: 1000 0; }
        }
        @keyframes count-up {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(56, 189, 248, 0.3); }
        }
        @keyframes video-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.02); }
        }
        @keyframes sparkle-twinkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-float1 { animation: float1 6s ease-in-out infinite; }
        .animate-float2 { animation: float2 8s ease-in-out infinite; }
        .animate-float3 { animation: float3 7s ease-in-out infinite; }
        .animate-slide { animation: slide 10s ease-in-out infinite; }
        .animate-slideInUp { animation: slideInUp 1s ease-out forwards; }
        .animate-wave { animation: wave 2s ease-in-out infinite; }
        .animate-morph-slow { animation: morph-slow 20s ease-in-out infinite; }
        .animate-morph-medium { animation: morph-medium 15s ease-in-out infinite; }
        .animate-morph-fast { animation: morph-fast 12s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-draw-path { animation: draw-path 3s ease-in-out infinite; }
        .animate-count-up { animation: count-up 0.8s ease-out forwards; }
        .animate-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
        .animate-video-float { animation: video-float 4s ease-in-out infinite; }
        .animate-sparkle-twinkle { animation: sparkle-twinkle 2s ease-in-out infinite; }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1200 { animation-delay: 1.2s; }
        
        /* Custom shadow class */
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}

export default HomePage;