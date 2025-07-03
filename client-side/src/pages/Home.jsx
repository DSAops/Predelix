import { TextEffect } from '../../components/motion-primitives/text-effect';
import { useState } from 'react';
import { Navbar } from './common/Navbar'; 

function HomePage() {

  return (
    <div className="fixed inset-0 min-h-screen w-full bg-black flex flex-col items-center">
      {/* Dock Navbar at the top */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="bg-white/10 rounded-xl shadow-lg p-10 text-center max-w-xl border border-zinc-800">
          <TextEffect per="char" preset="fade" className="text-4xl font-bold text-white mb-6">
            Animate your ideas with motion-primitives
          </TextEffect>
          <p className="text-blue-400 text-lg mt-4">
            Build beautiful, interactive UIs with animated backgrounds, tabs, and more. Powered by <span className="font-semibold text-purple-400">motion-primitives</span> and <span className="font-semibold text-blue-400">Tailwind CSS</span>.
          </p>
        </div>
      </main>
    </div>
  );
}

export default HomePage;