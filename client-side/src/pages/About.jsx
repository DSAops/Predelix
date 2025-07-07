import React, { useEffect, useState, useMemo } from 'react';
import { Footer } from './common/Footer';
import { Truck, Package, Globe, BarChart2, Zap, Shield, Users, Target, Award } from 'lucide-react';

// Floating elements for About page
const FloatingAboutElements = ({ scrollY }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Floating logistics elements */}
      <div 
        className="absolute top-20 left-10 w-12 h-12 bg-gradient-to-br from-cyan-400/25 to-blue-500/25 rounded-xl animate-float1 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      >
        <Truck className="w-6 h-6 text-cyan-500/70" />
      </div>
      
      <div 
        className="absolute top-32 right-16 w-10 h-10 bg-gradient-to-br from-blue-400/25 to-sky-500/25 rounded-lg animate-float2 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      >
        <Package className="w-5 h-5 text-blue-500/70" />
      </div>
      
      <div 
        className="absolute top-1/2 left-16 w-14 h-14 bg-gradient-to-br from-sky-400/25 to-cyan-500/25 rounded-2xl animate-float3 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <Globe className="w-7 h-7 text-sky-500/70 animate-spin-slow" />
      </div>
      
      <div 
        className="absolute bottom-32 right-12 w-8 h-8 bg-gradient-to-br from-cyan-300/25 to-blue-400/25 rounded-full animate-float1 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.25}px)` }}
      >
        <BarChart2 className="w-4 h-4 text-cyan-500/70" />
      </div>
      
      <div 
        className="absolute bottom-20 left-1/4 w-6 h-6 bg-gradient-to-br from-blue-500/25 to-sky-600/25 rounded-md animate-float2 shadow-lg flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.18}px)` }}
      >
        <Zap className="w-3 h-3 text-blue-500/70" />
      </div>
    </div>
  );
};

function About() {
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

  // Memoized content data
  const aboutContent = useMemo(() => ({
    title: "About Predelix",
    description: "Predelix is revolutionizing logistics with cutting-edge AI technology. Our mission is to optimize supply chain operations, reduce costs, and enhance delivery efficiency for businesses worldwide.",
    features: [
      {
        icon: Target,
        title: "Our Mission",
        description: "To transform global logistics through intelligent automation and predictive analytics."
      },
      {
        icon: Users,
        title: "Our Team",
        description: "Expert engineers and logistics professionals working together to build the future of delivery."
      },
      {
        icon: Award,
        title: "Our Vision",
        description: "A world where every package reaches its destination efficiently, sustainably, and on time."
      }
    ]
  }), []);

  // Memoized background styles
  const backgroundStyles = useMemo(() => ({
    main: "bg-gradient-to-br from-blue-50 via-cyan-50 to-white",
    radialGlow: "radial-gradient(circle at 50% 40%, rgba(56,189,248,0.12) 0%, rgba(255,255,255,1) 70%)",
    morphElements: [
      "absolute top-1/4 left-1/3 w-48 h-48 bg-gradient-to-br from-cyan-400/8 to-blue-500/8 rounded-full animate-morph-slow",
      "absolute bottom-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-blue-400/8 to-sky-500/8 rounded-full animate-morph-medium"
    ]
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex flex-col overflow-x-hidden">
      {/* Enhanced Background */}
      <div className="flex-1 w-full flex items-center justify-center py-16 relative">
        {/* Animated Background Glow */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(56,189,248,0.12) 0%, rgba(255,255,255,1) 70%)',
          }}
        />
        
        {/* Additional animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-gradient-to-br from-cyan-400/8 to-blue-500/8 rounded-full animate-morph-slow"></div>
          <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-blue-400/8 to-sky-500/8 rounded-full animate-morph-medium"></div>
        </div>
        
        <FloatingAboutElements scrollY={scrollY} />
        
        {/* Enhanced Main Content */}
        <div 
          className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-2xl w-full mx-4 border border-cyan-200/50 overflow-hidden"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        >
          {/* Animated background in card */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 to-blue-50/30"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Enhanced Avatar Section */}
            <div className="mb-6 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative">
                <img
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=about"
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-cyan-400 shadow-lg animate-float1"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-bounce">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            
            {/* Enhanced Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 bg-clip-text text-transparent mb-4 drop-shadow-lg animate-slideInUp">
              About Predelix
            </h1>
            
            {/* Enhanced Description */}
            <p className="text-lg text-sky-700 mb-6 text-center leading-relaxed animate-slideInUp animation-delay-200">
              Welcome to <span className="font-bold text-cyan-600 animate-pulse">Predelix</span>!<br />
              We are revolutionizing the logistics industry with cutting-edge AI technology, 
              creating intelligent supply chain solutions that transform how businesses operate globally.
            </p>
            
            {/* New Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200/50 flex flex-col items-center animate-slideInUp animation-delay-400">
                <Users className="w-8 h-8 text-cyan-500 mb-2 animate-bounce" />
                <h3 className="font-bold text-sky-700 mb-1">Expert Team</h3>
                <p className="text-xs text-sky-600 text-center">Logistics & AI specialists</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-xl border border-blue-200/50 flex flex-col items-center animate-slideInUp animation-delay-600">
                <Target className="w-8 h-8 text-blue-500 mb-2 animate-pulse" />
                <h3 className="font-bold text-sky-700 mb-1">Innovation</h3>
                <p className="text-xs text-sky-600 text-center">Cutting-edge solutions</p>
              </div>
              
              <div className="bg-gradient-to-br from-sky-50 to-cyan-50 p-4 rounded-xl border border-sky-200/50 flex flex-col items-center animate-slideInUp animation-delay-800">
                <Award className="w-8 h-8 text-sky-500 mb-2 animate-spin-slow" />
                <h3 className="font-bold text-sky-700 mb-1">Excellence</h3>
                <p className="text-xs text-sky-600 text-center">Industry recognition</p>
              </div>
            </div>
            
            {/* Enhanced Action Buttons */}
            <div className="flex gap-4 mt-4 animate-slideInUp animation-delay-1000">
              <a
                href="https://github.com/DSAops"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  <Globe className="w-5 h-5 mr-2 animate-spin-slow" />
                  GitHub
                </span>
              </a>
              <a
                href="mailto:contact@predelix.com"
                className="group px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  <Package className="w-5 h-5 mr-2 animate-bounce" />
                  Contact
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(8px) rotate(-3deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
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
      `}</style>
      
    </div>
  );
}

export default About;