import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

export default function Signup({ onSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [googleLoading, setGoogleLoading] = useState(false);
  const { register, googleAuth } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const data = await register(name, email, password);

      // Clear form
      setName('');
      setEmail('');
      setPassword('');

      // Notify parent component with user data
      if (onSignup) onSignup(data.user);
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account');
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setGoogleLoading(true);
      setError('');

      try {
        // Get user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${codeResponse.access_token}` }
        });
        const userInfo = await userInfoResponse.json();

        const data = await googleAuth({
          access_token: codeResponse.access_token,
          id_token: codeResponse.id_token,
          userInfo
        });

        if (onSignup) {
          onSignup({
            id: data.user.id,
            name: data.user.username,
            email: data.user.email,
            role: data.user.role,
          });
        }
      } catch (err) {
        setError(err.message || 'Google login failed');
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      setError('Google login failed');
      setGoogleLoading(false);
    },
    flow: 'implicit'
  });

  return (
    <div className="relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating User Icon */}
        <div className="absolute -top-8 -right-8 w-12 h-12 text-cyan-200 animate-float1">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
        </div>

        {/* Floating Email Icon */}
        <div className="absolute -bottom-6 -left-6 w-10 h-10 text-cyan-200 animate-float2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </div>

        {/* Floating Security Icon */}
        <div className="absolute top-1/2 -right-10 w-8 h-8 text-cyan-200 animate-float3">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16.2V16H7.8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
          </svg>
        </div>

        {/* Morphing Background Shape */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-20 animate-morph-slow"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 animate-morph-medium"></div>
      </div>

      <form className="relative flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="Full Name"
              className="h-12 w-full rounded-xl border border-cyan-300 bg-white/80 backdrop-blur-sm px-4 text-base text-zinc-800 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 placeholder:text-zinc-400 transition-all duration-300 hover:bg-white/90 focus:bg-white/95"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <svg className="w-5 h-5 text-zinc-400 group-focus-within:text-cyan-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
          </div>

          <div className="relative group">
            <input
              type="email"
              placeholder="Email Address"
              className="h-12 w-full rounded-xl border border-cyan-300 bg-white/80 backdrop-blur-sm px-4 text-base text-zinc-800 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 placeholder:text-zinc-400 transition-all duration-300 hover:bg-white/90 focus:bg-white/95"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <svg className="w-5 h-5 text-zinc-400 group-focus-within:text-cyan-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
          </div>

          <div className="relative group">
            <input
              type="password"
              placeholder="Password"
              className="h-12 w-full rounded-xl border border-cyan-300 bg-white/80 backdrop-blur-sm px-4 text-base text-zinc-800 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 placeholder:text-zinc-400 transition-all duration-300 hover:bg-white/90 focus:bg-white/95"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <svg className="w-5 h-5 text-zinc-400 group-focus-within:text-cyan-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16.2V16H7.8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
              </svg>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="relative inline-flex items-center justify-center h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 group overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Create Account
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => googleLogin()}
          disabled={googleLoading}
          className="group w-full inline-flex items-center justify-center rounded-xl bg-white border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {googleLoading ? (
            <div className="w-5 h-5 mr-2 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          {googleLoading ? 'Signing in with Google...' : 'Continue with Google'}
        </button>

        {error && (
          <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-200">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

