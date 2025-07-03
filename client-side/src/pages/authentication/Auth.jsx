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
import Signup from './Signup'; // Create this file as shown below
import { useState } from 'react';

export function Auth() {
  const [mode, setMode] = useState('login');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-5 py-2 rounded-lg bg-fuchsia-600 text-white font-semibold shadow hover:bg-fuchsia-700 transition">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md p-6 shadow-[0_4px_24px_#000a] bg-black/80 backdrop-blur-md border border-fuchsia-700/30 relative">
        <DialogHeader>
          <DialogTitle className="text-fuchsia-400 text-2xl font-bold">
            {mode === 'login' ? 'Welcome to Predelix' : 'Create your Predelix account'}
          </DialogTitle>
          <DialogDescription className="text-zinc-300">
            {mode === 'login'
              ? 'Please log in to continue.'
              : 'Sign up to get started.'}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex flex-col space-y-4">
          {mode === 'login' ? <Login /> : <Signup />}
        </div>
        <div className="mt-4 flex justify-between items-center text-sm">
          <button
            className="text-fuchsia-300 hover:underline"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            type="button"
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Log in'}
          </button>
        </div>
        <DialogClose asChild>
          <button className="absolute top-4 right-4 text-zinc-400 hover:text-white text-2xl font-bold" aria-label="Close">
            ×
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}