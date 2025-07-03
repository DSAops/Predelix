import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  User,
  MoreHorizontal,
  Code2,
  LogIn as LogInIcon, // Import a login icon from lucide-react
} from 'lucide-react';
import { TextRoll } from '../../../components/motion-primitives/text-roll';

const navItems = [
  { title: 'Home', icon: <HomeIcon className="h-5 w-5 mr-2" />, to: '/' },
  { title: 'About', icon: <User className="h-5 w-5 mr-2" />, to: '/about' },
  { title: 'More', icon: <MoreHorizontal className="h-5 w-5 mr-2" />, to: '/more' },
  { title: 'Code', icon: <Code2 className="h-5 w-5 mr-2" />, to: '/code' },
];

export function Navbar({ onLoginClick, isLoggedIn }) {
  // Force remount TextRoll every 3000ms
  const [logoKey, setLogoKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoKey(k => k + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Set a fixed width and height for the logo wrapper and login button wrapper to prevent layout shift
  return (
    <nav className="w-full bg-zinc-900/60 backdrop-blur-xl shadow-lg px-8 py-[13px] flex items-center justify-between fixed top-0 left-0 z-50 border-b border-emerald-700/40">
      {/* Left: Animated App Name with looping TextRoll */}
      <div
        className="flex items-center"
        style={{ minWidth: 160, minHeight: 40, justifyContent: 'flex-start' }}
      >
        <div style={{ width: 140, height: 32, display: 'flex', alignItems: 'center' }}>
          <TextRoll
            key={logoKey}
            className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-400"
            loop
            loopDelay={100}
          >
            {['Predelix']}
          </TextRoll>
        </div>
      </div>
      {/* Center: Nav Items */}
      <div className="flex gap-6">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className="flex items-center px-4 py-2 rounded-lg text-white font-medium hover:bg-emerald-800/20 hover:text-emerald-400 transition"
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      {/* Right: Login Dialog Button or empty div if logged in */}
      <div style={{ width: 110, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {!isLoggedIn ? (
          <button
            className="px-5 py-2 rounded-lg bg-emerald-800 text-white font-semibold shadow hover:bg-emerald-900 transition w-full flex items-center justify-center"
            onClick={onLoginClick}
            style={{ minWidth: 100, minHeight: 36 }}
          >
            <LogInIcon className="h-5 w-5 mr-2" />
            Login
          </button>
        ) : (
          <div style={{ minWidth: 100, minHeight: 36 }} />
        )}
      </div>
    </nav>
  );
}