import { Navbar } from './common/Navbar';

function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-gradient-to-tr from-indigo-900 via-purple-900 to-fuchsia-700 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center border border-white/20">
          <div className="mb-6">
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=about"
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-fuchsia-400 shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">About Us</h1>
          <p className="text-lg text-fuchsia-100 mb-4 text-center">
            Welcome to <span className="font-bold text-fuchsia-300">Predelix</span>!<br />
            We craft beautiful, interactive web experiences using the latest in modern frontend technology.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://github.com/DSAops"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-fuchsia-600 text-white font-semibold shadow hover:bg-fuchsia-700 transition"
            >
              GitHub
            </a>
            <a
              href="mailto:contact@predelix.com"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
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