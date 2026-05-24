import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const { signup, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [loading, user, navigate]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim();
    if (!fullName.trim() || !normalizedEmail || !password) {
      toast.error('Please fill in your name, email, and password.');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);

    try {
      const data = await signup({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });

      if (data?.session) {
        toast.success('Account created. Redirecting to dashboard.');
        navigate('/dashboard', { replace: true });
      } else {
        toast.success('Account created. Check your email to confirm your account.');
        navigate('/login', { replace: true });
      }
    } catch (error) {
      toast.error(error?.message || 'Signup failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card fade-in-up">
        <div className="auth-header">
          <p className="eyebrow">Get started</p>
          <h1>Create your PayLink account</h1>
          <p className="auth-copy">Join the platform built for fast, secure payment experiences.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Full name</span>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
            />
          </label>

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
                placeholder="Create a strong password"
                autoComplete="new-password"
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
            {submitting || loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
