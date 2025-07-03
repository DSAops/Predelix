import { useState, useEffect } from 'react';

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
    <form className="flex flex-col gap-4 text-white" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        className="h-10 w-full rounded-lg border border-purple-300 bg-white px-3 text-base text-zinc-800 focus:ring-2 focus:ring-purple-400 placeholder:text-zinc-400"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="h-10 w-full rounded-lg border border-purple-300 bg-white px-3 text-base text-zinc-800 focus:ring-2 focus:ring-purple-400 placeholder:text-zinc-400"
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
          className="inline-flex items-center justify-center rounded-lg bg-purple-50 border border-purple-300 px-6 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100 transition-all"
          style={{ minWidth: '110px' }}
          onClick={handleDevLogin}
        >
          Use Default credentials
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600"
        >
          Log In
        </button>
      </div>
    </form>
  );
}

export default Login;