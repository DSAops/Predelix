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
import { useState } from 'react';

export function Auth() {
  const [mode, setMode] = useState('login');
  const [open, setOpen] = useState(false);

  // Handler to close dialog after login
  function handleLoginSuccess() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-5 py-2 rounded-lg bg-emerald-800 text-white font-semibold shadow hover:bg-emerald-900 transition">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </DialogTrigger>
      <DialogContent
        className={`
          w-full max-w-md p-6 shadow-[0_4px_24px_#000a] bg-zinc-900/90 backdrop-blur-xl border border-emerald-700/40 relative text-white
          transition-all duration-0
          ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
      >
        <DialogHeader>
          <DialogTitle className="text-white text-2xl font-bold">
            {mode === 'login' ? 'Welcome to Predelix' : 'Create your Predelix account'}
          </DialogTitle>
          <DialogDescription className="text-white">
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
            className="text-white hover:underline"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            type="button"
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Log in'}
          </button>
        </div>
        <DialogClose asChild>
          <button className="absolute top-4 right-4 text-white hover:text-emerald-400 text-2xl font-bold" aria-label="Close">
            ×
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}