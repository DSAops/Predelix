import { Footer } from './common/Footer';

function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 w-full flex items-center justify-center py-16 relative">
      {/* Purple Background Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(167,139,250,0.15) 0%, rgba(255,255,255,1) 70%)',
        }}
      />
      <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center border border-purple-300/40">
        <div className="mb-6">
          <img
            src="https://api.dicebear.com/7.x/bottts/svg?seed=about"
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-purple-400 shadow-lg"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-purple-600 mb-2 drop-shadow-lg">About Us</h1>
        <p className="text-lg text-zinc-700 mb-4 text-center">
          Welcome to <span className="font-bold text-purple-500">Predelix</span>!<br />
          We craft beautiful, interactive web experiences using the latest in modern frontend technology.
        </p>
        <div className="flex gap-4 mt-4">
          <a
            href="https://github.com/DSAops"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold shadow hover:bg-purple-600 transition"
          >
            GitHub
          </a>
          <a
            href="mailto:contact@predelix.com"
            className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition"
          >
            Contact
          </a>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;