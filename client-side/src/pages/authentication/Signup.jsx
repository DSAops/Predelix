import { useState } from 'react';

function Signup({ onSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Save to cookies (expires in 7 days)
    document.cookie = `predelix_name=${encodeURIComponent(name)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    document.cookie = `predelix_email=${encodeURIComponent(email)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    document.cookie = `predelix_password=${encodeURIComponent(password)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    setName('');
    setEmail('');
    setPassword('');
    if (onSignup) onSignup();
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        className="h-10 w-full rounded-lg border border-emerald-300 bg-zinc-900/60 px-3 text-base text-emerald-100 focus:ring-2 focus:ring-emerald-400 dark:border-emerald-700 dark:bg-zinc-800 dark:text-white"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="h-10 w-full rounded-lg border border-emerald-300 bg-zinc-900/60 px-3 text-base text-emerald-100 focus:ring-2 focus:ring-emerald-400 dark:border-emerald-700 dark:bg-zinc-800 dark:text-white"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="h-10 w-full rounded-lg border border-emerald-300 bg-zinc-900/60 px-3 text-base text-emerald-100 focus:ring-2 focus:ring-emerald-400 dark:border-emerald-700 dark:bg-zinc-800 dark:text-white"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center self-end rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-900"
      >
        Sign Up
      </button>
    </form>
  );
}

export default Signup;