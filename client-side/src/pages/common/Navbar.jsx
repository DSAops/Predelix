import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  User,
  MoreHorizontal,
  Code2,
  LogIn as LogInIcon,
  User as UserIcon,
  LogOut as LogOutIcon,
} from 'lucide-react';
import { TextRoll } from '../../../components/motion-primitives/text-roll';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

const navItems = [
  { title: 'Home', icon: <HomeIcon className="h-5 w-5 mr-2" />, to: '/' },
  { title: 'About', icon: <User className="h-5 w-5 mr-2" />, to: '/about' },
  { title: 'More', icon: <MoreHorizontal className="h-5 w-5 mr-2" />, to: '/more' },
  { title: 'Code', icon: <Code2 className="h-5 w-5 mr-2" />, to: '/code' },
];

export function Navbar({ onLoginClick, isLoggedIn, user, onLogout }) {
  // Force remount TextRoll every 3000ms
  const [logoKey, setLogoKey] = useState(0);
  const [cookieName, setCookieName] = useState('');

  useEffect(() => {
    const match = document.cookie.match(new RegExp('(^| )predelix_name=([^;]+)'));
    setCookieName(match ? decodeURIComponent(match[2]) : '');
  }, [isLoggedIn, user]);

  // Set a fixed width and height for the logo wrapper and login button/profile wrapper to prevent layout shift
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
      {/* Right: Login Dialog Button or Profile Dropdown */}
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
          <Popover className="relative">
            <PopoverButton className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-800 hover:bg-emerald-900 transition focus:outline-none">
              <UserIcon className="h-6 w-6 text-white" />
            </PopoverButton>
            <PopoverPanel
              anchor="bottom"
              className="absolute right-0 mt-2 w-48 rounded-xl bg-zinc-900/70 backdrop-blur-xl shadow-lg ring-1 ring-emerald-700/40 p-0 z-50"
            >
              <div className="flex flex-col justify-center items-center">
                <div className="px-4 pt-4 pb-2 text-white text-lg font-bold text-center">
                  Hi there {cookieName || user?.name || 'User'}
                </div>
                <hr className="border-zinc-700 my-1" />
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 rounded-b-xl text-sm text-zinc-300 hover:text-white hover:bg-emerald-900/60 transition font-medium"
                  onClick={onLogout}
                  style={{ background: 'none', border: 'none' }}
                >
                  <LogOutIcon className="h-6 w-6" />
                  <span className="text-zinc-300 text-base">Logout</span>
                </button>
              </div>
            </PopoverPanel>
          </Popover>
        )}
      </div>
    </nav>
  );
}