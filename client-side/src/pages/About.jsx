import { Navbar } from './common/Navbar';

function About() {
  return (
    <>
      <Navbar />
      <div className="fixed inset-0 min-h-screen w-full bg-black flex items-center justify-center">
        {/* Radial emerald glow, matching Home */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(16,185,129,0.18) 0%, rgba(0,0,0,0.95) 70%)',
          }}
        />
        <div className="relative z-10 bg-zinc-900/60 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center border border-emerald-700/40">
          <div className="mb-6">
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=about"
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-emerald-400 shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-emerald-400 mb-2 drop-shadow-lg">About Us</h1>
          <p className="text-lg text-emerald-100 mb-4 text-center">
            Welcome to <span className="font-bold text-emerald-300">Predelix</span>!<br />
            We craft beautiful, interactive web experiences using the latest in modern frontend technology.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://github.com/DSAops"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
            >
              GitHub
            </a>
            <a
              href="mailto:contact@predelix.com"
              className="px-4 py-2 rounded-lg bg-emerald-800 text-white font-semibold shadow hover:bg-emerald-900 transition"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;