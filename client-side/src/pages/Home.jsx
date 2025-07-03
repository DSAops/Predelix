import { TextEffect } from '../../components/motion-primitives/text-effect';

function HomePage() {
  return (
    <div className="fixed inset-0 min-h-screen w-full bg-black flex flex-col items-center">
      {/* Radial emerald glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(16,185,129,0.18) 0%, rgba(0,0,0,0.95) 70%)',
        }}
      />
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center w-full z-10">
        <div className="bg-zinc-900/60 backdrop-blur-xl rounded-xl shadow-lg p-10 text-center max-w-xl border border-emerald-700/40">
          <TextEffect per="char" preset="fade" className="text-4xl font-bold text-emerald-800 dark:text-emerald-400 mb-6">
            Animate your ideas with motion-primitives
          </TextEffect>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Build beautiful, interactive UIs with animated backgrounds, tabs, and more.
          </h2>
          <p className="text-white text-lg">
            Powered by <span className="font-semibold text-emerald-400">motion-primitives</span> and <span className="font-semibold text-emerald-300">Tailwind CSS</span>.
          </p>
          <button className="mt-8 px-6 py-2 rounded-lg bg-emerald-800/70 border border-emerald-700 text-emerald-200 font-semibold shadow transition hover:bg-emerald-900/80 hover:text-white">
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;