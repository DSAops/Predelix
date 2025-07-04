import { useState, useEffect } from 'react';
import { LogIn, Mail, Lock, Zap } from 'lucide-react';

// Helper to get a cookie value by name
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : '';
}

// Helper to set a cookie
function setCookie(name, value) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000`;
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [devStatus, setDevStatus] = useState('');

  // Autofill from cookies on mount
  useEffect(() => {
    const savedEmail = getCookie('predelix_email');
    const savedPassword = getCookie('predelix_password');
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    let loginName = '';
    if (
      (email === 'teamdsa@gmail.com' && password === 'teamdsa') ||
      (email === getCookie('predelix_email') && password === getCookie('predelix_password'))
    ) {
      setError('');
      // For teamdsa creds, set name to "Team DSA"
      if (email === 'teamdsa@gmail.com' && password === 'teamdsa') {
        loginName = 'Team DSA';
      } else {
        // If no name exists, use email before @
        loginName = getCookie('predelix_name');
        if (!loginName) {
          loginName = email.split('@')[0];
        }
      }
      // If any of the two fields changed, update all cookies; else, clear others
      const prevEmail = getCookie('predelix_email');
      const prevPassword = getCookie('predelix_password');
      const prevName = getCookie('predelix_name');
      if (email !== prevEmail || password !== prevPassword || loginName !== prevName) {
        setCookie('predelix_email', email);
        setCookie('predelix_password', password);
        setCookie('predelix_name', loginName);
      } else {
        // If not all match, clear others
        if (email !== prevEmail) setCookie('predelix_name', '');
        if (password !== prevPassword) setCookie('predelix_name', '');
        if (loginName !== prevName) setCookie('predelix_email', '');
      }
      if (onLogin) onLogin({ name: loginName, email });
    } else {
      setError('Invalid email or password');
    }
  }

  function handleDevLogin() {
    setEmail('teamdsa@gmail.com');
    setPassword('teamdsa');
    setDevStatus('These are test credentials meant to be used for Walmart Sparkathon.');
    setError('');
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {/* Enhanced Email Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500">
          <Mail className="w-5 h-5" />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="h-12 w-full rounded-xl border border-cyan-200 bg-gradient-to-r from-white to-cyan-50/30 pl-12 pr-4 text-base text-sky-800 placeholder:text-sky-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 hover:border-cyan-300"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      {/* Enhanced Password Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
          <Lock className="w-5 h-5" />
        </div>
        <input
          type="password"
          placeholder="Password"
          className="h-12 w-full rounded-xl border border-blue-200 bg-gradient-to-r from-white to-blue-50/30 pl-12 pr-4 text-base text-sky-800 placeholder:text-sky-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:border-blue-300"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      {/* Enhanced Error/Status Messages */}
      <div style={{ minHeight: '1.5em' }} className="relative">
        {error && (
          <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
            <span>{error}</span>
          </div>
        )}
        {!error && devStatus && (
          <div className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <Zap className="w-2 h-2 text-white" />
            </div>
            <span>{devStatus}</span>
          </div>
        )}
      </div>

      {/* Enhanced Buttons */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 px-6 py-3 text-sm font-medium text-cyan-700 hover:from-cyan-100 hover:to-blue-100 hover:border-cyan-300 transition-all duration-300 transform hover:scale-105"
          style={{ minWidth: '140px' }}
          onClick={handleDevLogin}
        >
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 group-hover:animate-pulse" />
            <span>Demo Credentials</span>
          </div>
        </button>
        
        <button
          type="submit"
          className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 hover:from-cyan-600 hover:via-blue-600 hover:to-sky-600 px-6 py-3 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-2">
            <LogIn className="w-4 h-4 group-hover:animate-bounce" />
            <span>Log In</span>
          </div>
        </button>
      </div>
    </form>
  );
}

export default Login;