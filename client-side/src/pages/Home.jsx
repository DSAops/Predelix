import { TextEffect } from '../../components/motion-primitives/text-effect';
import { AnimatedBackground } from '../../components/motion-primitives/animated-background';
import { useState } from 'react';
import { Home, PhoneCall, Settings, User } from 'lucide-react';

const TABS = [
  { label: 'Home', icon: <Home className="h-5 w-5" /> },
  { label: 'About', icon: <User className="h-5 w-5" /> },
  { label: 'Services', icon: <Settings className="h-5 w-5" /> },
  { label: 'Contact', icon: <PhoneCall className="h-5 w-5" /> },
];

function HomePage() {
  const [active, setActive] = useState(TABS[0].label);

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="bg-white/10 rounded-xl shadow-lg p-10 text-center max-w-xl border border-zinc-800">
          <TextEffect per="char" preset="fade" className="text-4xl font-bold text-white mb-6">
            Animate your ideas with motion-primitives
          </TextEffect>
          <p className="text-zinc-300 text-lg mt-4">
            Build beautiful, interactive UIs with animated backgrounds, tabs, and more. Powered by <span className="font-semibold text-purple-400">motion-primitives</span> and <span className="font-semibold text-blue-400">Tailwind CSS</span>.
          </p>
        </div>
      </main>

      {/* Animated Tabs at the bottom */}
      <div className="absolute  bottom-8 left-0 w-full flex justify-center">
        <div className="flex space-x-2 rounded-xl border border-zinc-800 bg-zinc-900/80 p-2 shadow-lg">
          <AnimatedBackground
            defaultValue={active}
            onValueChange={setActive}
            className="rounded-lg bg-zinc-800"
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: 0.3,
            }}
            enableHover
          >
            {TABS.map((tab) => (
              <button
                key={tab.label}
                data-id={tab.label}
                type="button"
                className={`inline-flex h-9 w-9 items-center justify-center text-zinc-400 transition-colors duration-100 focus-visible:outline-2 ${
                  active === tab.label
                    ? 'text-white'
                    : 'hover:text-purple-400'
                }`}
                onClick={() => setActive(tab.label)}
                aria-label={tab.label}
              >
                {tab.icon}
              </button>
            ))}
          </AnimatedBackground>
        </div>
      </div>
    </div>
  );
}

export default HomePage;