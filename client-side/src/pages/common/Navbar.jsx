import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  User,
  MoreHorizontal,
  Code2,
} from 'lucide-react';
import { TextEffect } from '../../../components/motion-primitives/text-effect';
import { Auth } from '../authentication/auth'; // Adjust path if needed

const navItems = [
  { title: 'Home', icon: <HomeIcon className="h-5 w-5 mr-2" />, to: '/' },
  { title: 'About', icon: <User className="h-5 w-5 mr-2" />, to: '/about' },
  { title: 'More', icon: <MoreHorizontal className="h-5 w-5 mr-2" />, to: '/more' },
  { title: 'Code', icon: <Code2 className="h-5 w-5 mr-2" />, to: '/code' },
];

export function Navbar() {
  return (
    <nav className="w-full bg-white/80 dark:bg-neutral-900/80 shadow-lg px-8 py-3 flex items-center justify-between fixed top-0 left-0 z-50 backdrop-blur-md">
      {/* Left: Animated App Name */}
      <div className="flex items-center">
        <TextEffect per="char" preset="fade" className="text-2xl font-extrabold text-fuchsia-600 dark:text-fuchsia-300">
          Predelix
        </TextEffect>
      </div>
      {/* Center: Nav Items */}
      <div className="flex gap-6">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className="flex items-center px-4 py-2 rounded-lg text-neutral-700 dark:text-neutral-200 font-medium hover:bg-fuchsia-100 dark:hover:bg-neutral-800 transition"
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