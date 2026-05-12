import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      if (!supabase) {
        setError('Supabase not configured. Please set environment variables.');
        setLoading(false);
        return;
      }

      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (!mounted) return;
        if (sessionError) {
          setUser(null);
          setError(null);
        } else {
          setUser(data?.session?.user ?? null);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setUser(null);
          setError(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadSession();

    let subscription;
    if (supabase) {
      try {
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
          if (mounted) {
            setUser(session?.user ?? null);
            setLoading(false);
          }
        });
        subscription = data?.subscription;
      } catch (err) {
        console.warn('Auth state change listener failed:', err);
      }
    }

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signup = async ({ fullName, email, password }) => {
    if (!supabase) {
      throw new Error('Supabase not configured. Please set environment variables.');
    }

    setLoading(true);
    try {
      const { data, error: signupError } = await supabase.auth.signUp(
        {
          email,
          password,
        },
        {
          data: {
            full_name: fullName,
          },
        }
      );

      if (signupError) {
        throw signupError;
      }

      setUser(data?.user ?? null);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    if (!supabase) {
      throw new Error('Supabase not configured. Please set environment variables.');
    }

    setLoading(true);
    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });

      if (loginError) {
        throw loginError;
      }

      setUser(data?.user ?? null);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (!supabase) {
      setUser(null);
      return;
    }

    setLoading(true);
    try {
      const { error: logoutError } = await supabase.auth.signOut();
      setUser(null);
      setError(null);
      if (logoutError) {
        throw logoutError;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

