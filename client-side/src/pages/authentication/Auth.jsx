import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../../../components/motion-primitives/dialog';
import Login from './login';
import Signup from './Signup';
import React from 'react';

export function Auth({ open, onOpenChange, onLogin, showTrigger = true }) {
  const [mode, setMode] = React.useState('login');

  // Pass onLogin to Login component
  function handleLoginSuccess() {
    if (onLogin) onLogin();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <DialogTrigger asChild>
          <button className="px-5 py-2 rounded-lg bg-purple-500 text-white font-semibold shadow hover:bg-purple-600 transition">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </DialogTrigger>
      )}
      <DialogContent
        className={`
          w-full max-w-md p-6 shadow-[0_4px_24px_#0002] bg-white/90 backdrop-blur-xl border border-purple-300/40 relative text-zinc-800
          transition-all duration-0
          ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
      >
        <DialogHeader>
          <DialogTitle className="text-zinc-800 text-2xl font-bold">
            {mode === 'login' ? 'Welcome to Predelix' : 'Create your Predelix account'}
          </DialogTitle>
          <DialogDescription className="text-zinc-600">
            {mode === 'login'
              ? 'Please log in to continue.'
              : 'Sign up to get started.'}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex flex-col space-y-4">
          {mode === 'login'
            ? <Login onLogin={handleLoginSuccess} />
            : <Signup onSignup={() => setMode('login')} />
          }
        </div>
        <div className="mt-4 flex justify-between items-center text-sm">
          <button
            className="text-zinc-600 hover:text-purple-500 hover:underline"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            type="button"
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Log in'}
          </button>
        </div>
        <DialogClose asChild>
          <button className="absolute top-4 right-4 text-zinc-600 hover:text-purple-500 text-2xl font-bold" aria-label="Close">
            ×
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}