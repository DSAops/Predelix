import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  User,
  BarChart2,
  LogIn as LogInIcon,
  User as UserIcon,
  LogOut as LogOutIcon,
  Truck,
  Package,
  Globe,
  Zap,
  Shield,
} from 'lucide-react';
import { TextRoll } from '../../../components/motion-primitives/text-roll';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import LogisticsStoryAnimation from '../../../components/LogisticsStoryAnimation';
import CartoonishLogisticsStory from '../../../components/CartoonishLogisticsStory';

const navItems = [
  { title: 'Home', icon: <HomeIcon className="h-5 w-5 mr-2" />, to: '/' },
  { title: 'Predict', icon: <BarChart2 className="h-5 w-5 mr-2" />, to: '/predict' },
  { title: 'About', icon: <User className="h-5 w-5 mr-2" />, to: '/about' },
];

// Floating navbar elements component
const FloatingNavElements = ({ scrollY }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Small floating logistics icons */}
      <div 
        className="absolute top-2 left-20 w-6 h-6 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full animate-float1 flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <Truck className="w-3 h-3 text-cyan-500/60" />
      </div>
      
      <div 
        className="absolute top-1 right-32 w-5 h-5 bg-gradient-to-br from-blue-400/20 to-sky-500/20 rounded-md animate-float2 flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      >
        <Package className="w-2.5 h-2.5 text-blue-500/60" />
      </div>
      
      <div 
        className="absolute bottom-2 left-1/3 w-4 h-4 bg-gradient-to-br from-sky-400/20 to-cyan-500/20 rounded-sm animate-float3 flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.08}px)` }}
      >
        <Globe className="w-2 h-2 text-sky-500/60 animate-spin-slow" />
      </div>
      
      <div 
        className="absolute bottom-1 right-1/4 w-5 h-5 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full animate-float1 flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * -0.12}px)` }}
      >
        <Zap className="w-2.5 h-2.5 text-cyan-500/60" />
      </div>
    </div>
  );
};

export function Navbar({ onLoginClick, isLoggedIn, user, onLogout }) {
  const [cookieName, setCookieName] = useState('');
  const [key, setKey] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(new RegExp('(^| )predelix_name=([^;]+)'));
    setCookieName(match ? decodeURIComponent(match[2]) : '');
  }, [isLoggedIn, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced scroll handler with parallax effect
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);
          setIsScrolled(currentScrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set a fixed width and height for the logo wrapper and login button/profile wrapper to prevent layout shift
  return (
    <nav className={`w-full transition-all duration-300 px-4 py-[13px] grid grid-cols-3 items-center fixed top-0 left-0 z-50 border-b overflow-hidden ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-xl border-sky-200/50' 
        : 'bg-white/90 backdrop-blur-xl shadow-lg border-cyan-300/40'
    }`}>
      {/* Floating background elements */}
      <FloatingNavElements scrollY={scrollY} />
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/30 via-blue-50/20 to-sky-50/30 opacity-50"></div>
      
      {/* Left Side: Cartoonish Story Animation */}
      <div className="justify-self-start relative z-10">
        <div className="w-48 max-w-xs">
          <CartoonishLogisticsStory />
        </div>
      </div>
      
      {/* Center: Logo and App Name */}
      <div className="justify-self-center flex items-center relative z-10" style={{ minWidth: 160, minHeight: 40 }}>
        <div style={{ width: 140, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Animated logo background */}
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur animate-pulse"></div>
          <div className="relative flex items-center space-x-2">
            {/* Animated logo icon */}
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center animate-float1">
              <Truck className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div key={key}>
              <TextRoll
                className="text-2xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 bg-clip-text text-transparent"
                loop
                loopDelay={3000}
              >
                {['Predelix']}
              </TextRoll>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side: Nav Items and Auth */}
      <div className="justify-self-end flex items-center gap-6 relative z-10">
        {/* Nav Items */}
        <div className="flex gap-4">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="group flex items-center px-3 py-2 rounded-lg text-sky-700 font-medium hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
            >
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Auth Section */}
        <div className="flex items-center justify-end" style={{ width: 110, height: 40 }}>
          {!isLoggedIn ? (
          <button
            className="group relative px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 hover:from-cyan-600 hover:via-blue-600 hover:to-sky-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full flex items-center justify-center overflow-hidden"
            onClick={onLoginClick}
            style={{ minWidth: 100, minHeight: 36 }}
          >
            {/* Animated background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center">
              <LogInIcon className="h-5 w-5 mr-2 animate-pulse" />
              <span>Login</span>
            </div>
          </button>
        ) : (
          <Popover className="relative">
            <PopoverButton className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 focus:outline-none shadow-lg hover:shadow-xl relative overflow-hidden">
              {/* Animated background pulse */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              <UserIcon className="h-5 w-5 text-white relative z-10" />
            </PopoverButton>
            <PopoverPanel
              anchor="bottom"
              className="absolute right-0 mt-2 w-48 rounded-xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-sky-200/50 p-0 z-50 border border-cyan-100/50 overflow-hidden"
            >
              {/* Animated background in dropdown */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-blue-50/50"></div>
              <div className="relative z-10 flex flex-col justify-center items-center">
                <div className="px-4 pt-4 pb-2 text-sky-800 text-lg font-bold text-center">
                  <span className="inline-block animate-wave mr-1">👋</span>
                  Hi there {cookieName || user?.name || 'User'}
                </div>
                <hr className="border-sky-200 my-1 w-full" />
                <button
                  className="group flex items-center justify-center gap-2 w-full px-4 py-2 rounded-b-xl text-sm text-sky-600 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300 font-medium transform hover:scale-105"
                  onClick={onLogout}
                  style={{ background: 'none', border: 'none' }}
                >
                  <LogOutIcon className="h-4 w-4 group-hover:animate-bounce" />
                  <span className="text-sky-600 text-sm">Logout</span>
                </button>
              </div>
            </PopoverPanel>
          </Popover>
        )}
        </div>
      </div>
      
      {/* Custom navbar animations */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(2deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(2px) rotate(-2deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(1deg); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-float1 { animation: float1 4s ease-in-out infinite; }
        .animate-float2 { animation: float2 5s ease-in-out infinite; }
        .animate-float3 { animation: float3 6s ease-in-out infinite; }
        .animate-wave { animation: wave 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </nav>
  );
}