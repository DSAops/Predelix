import { useState, useEffect } from 'react';

// Helper to get a cookie value by name
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : '';
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
    if (
      (email === 'teamdsa@gmail.com' && password === 'teamdsa') ||
      (email === getCookie('predelix_email') && password === getCookie('predelix_password'))
    ) {
      setError('');
      if (onLogin) onLogin();
      // Removed alert('Login successful!');
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
    <form className="flex flex-col gap-4 text-white" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        className="h-10 w-full rounded-lg border border-emerald-300 bg-zinc-900/60 px-3 text-base text-white focus:ring-2 focus:ring-emerald-400 dark:border-emerald-700 dark:bg-zinc-800 dark:text-white placeholder:text-zinc-400"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="h-10 w-full rounded-lg border border-emerald-300 bg-zinc-900/60 px-3 text-base text-white focus:ring-2 focus:ring-emerald-400 dark:border-emerald-700 dark:bg-zinc-800 dark:text-white placeholder:text-zinc-400"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {/* Reserve space for error and devStatus */}
      <div style={{ minHeight: '1.5em' }}>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {!error && devStatus && (
          <div className="text-green-400 text-xs mb-1">{devStatus}</div>
        )}
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-emerald-950 border border-emerald-400 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-900 transition-all"
          style={{ minWidth: '110px' }}
          onClick={handleDevLogin}
        >
          Use Default credentials
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-900"
        >
          Log In
        </button>
      </div>
    </form>
  );
}

export default Login;