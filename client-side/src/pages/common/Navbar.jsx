import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  User,
  MoreHorizontal,
  Code2,
} from 'lucide-react';
import { TextRoll } from '../../../components/motion-primitives/text-roll';
import { Auth } from '../authentication/auth';

const navItems = [
  { title: 'Home', icon: <HomeIcon className="h-5 w-5 mr-2" />, to: '/' },
  { title: 'About', icon: <User className="h-5 w-5 mr-2" />, to: '/about' },
  { title: 'More', icon: <MoreHorizontal className="h-5 w-5 mr-2" />, to: '/more' },
  { title: 'Code', icon: <Code2 className="h-5 w-5 mr-2" />, to: '/code' },
];

export function Navbar() {
  return (
    <nav className="w-full bg-zinc-900/60 backdrop-blur-xl shadow-lg px-8 py-3 flex items-center justify-between fixed top-0 left-0 z-50 border-b border-emerald-700/40">
      {/* Left: Animated App Name with looping TextRoll */}
      <div className="flex items-center">
        <TextRoll
          className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-400"
          loop
          loopDelay={100}
        >
          {['Predelix']}
        </TextRoll>
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
      {/* Right: Login Dialog Button */}
      <div>
        <Auth />
      </div>
    </nav>
  );
}