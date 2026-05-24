import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [loading, user, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      toast.error('Please enter your email and password.');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);

    try {
      await login({ email: email.trim(), password });
      toast.success('Welcome back. Redirecting to your dashboard.');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error?.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card fade-in-up">
        <div className="auth-header">
          <p className="eyebrow">Secure access</p>
          <h1>Welcome back to PayLink</h1>
          <p className="auth-copy">Sign in to manage your payments, customers, and your secure links.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <button type="submit" className="auth-button" disabled={submitting || loading}>
            {submitting || loading ? 'Signing in…' : 'Continue to Dashboard'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            New to PayLink? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
