import { useState } from 'react';
import { BookOpen } from 'lucide-react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
        return;
      }

      localStorage.setItem('btb_token', data.token);
      onLogin(data.username || username);
    } catch {
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="card p-8">
          {/* Branding */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-workshop-500/20 flex items-center justify-center mb-4">
              <BookOpen size={28} className="text-workshop-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-100">Blinds to Bytes</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to continue learning</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full px-3 py-2.5 rounded-lg bg-surface-800 border border-surface-700
                  text-gray-200 placeholder-gray-500 text-sm
                  focus:outline-none focus:border-workshop-500/50 transition-colors"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-3 py-2.5 rounded-lg bg-surface-800 border border-surface-700
                  text-gray-200 placeholder-gray-500 text-sm
                  focus:outline-none focus:border-workshop-500/50 transition-colors"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
