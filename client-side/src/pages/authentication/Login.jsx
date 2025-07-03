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
      alert('Login successful!');
    } else {
      setError('Invalid email or password');
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-base text-zinc-900 focus:ring-2 focus:ring-fuchsia-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-base text-zinc-900 focus:ring-2 focus:ring-fuchsia-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="inline-flex items-center justify-center self-end rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white hover:bg-fuchsia-700"
      >
        Log In
      </button>
    </form>
  );
}

export default Login;