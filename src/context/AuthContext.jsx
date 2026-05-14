import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { fetchProfile, upsertProfile, updateProfileRow, fetchPaymentLinks, createPaymentLinkEntry, fetchTransactions } from '../lib/db.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProfileData = async (userId, authUser) => {
    if (!userId) {
      setProfile(null);
      setLinks([]);
      setTransactions([]);
      setProfileLoading(false);
      return;
    }

    setProfileLoading(true);
    try {
      const [{ data: profileData, error: profileError }, { data: linkData, error: linkError }, { data: transactionData, error: transactionError }] =
        await Promise.all([
          fetchProfile(userId),
          fetchPaymentLinks(userId),
          fetchTransactions(userId),
        ]);

      if (profileError && profileError.code !== 'PGRST116') {
        console.warn('Profile fetch error:', profileError.message);
      }

      const tidyProfile = profileData ?? {
        id: userId,
        full_name: authUser?.user_metadata?.full_name || authUser?.email?.split('@')[0] || 'Member',
        email: authUser?.email || '',
        subscription_tier: 'Starter',
        preferences: { email_updates: true, payment_reminders: true },
      };

      if (!profileData) {
        const { data: insertedProfile, error: insertError } = await upsertProfile({
          id: userId,
          full_name: tidyProfile.full_name,
          email: tidyProfile.email,
          subscription_tier: tidyProfile.subscription_tier,
          preferences: tidyProfile.preferences,
        });
        if (!insertError) {
          setProfile(insertedProfile);
        } else {
          setProfile(tidyProfile);
          console.warn('Unable to create profile record:', insertError.message);
        }
      } else {
        setProfile(tidyProfile);
      }

      setLinks(linkData ?? []);
      setTransactions(transactionData ?? []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Unable to load profile data.');
    } finally {
      setProfileLoading(false);
    }
  };

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
          setProfile(null);
          setLinks([]);
          setTransactions([]);
          setError(null);
        } else {
          const authUser = data?.session?.user ?? null;
          setUser(authUser);
          if (authUser) {
            await loadProfileData(authUser.id, authUser);
          } else {
            setProfile(null);
            setLinks([]);
            setTransactions([]);
          }
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setUser(null);
          setProfile(null);
          setLinks([]);
          setTransactions([]);
          setError(err.message);
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
        const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
          if (!mounted) return;
          const authUser = session?.user ?? null;
          setUser(authUser);
          if (authUser) {
            await loadProfileData(authUser.id, authUser);
          } else {
            setProfile(null);
            setLinks([]);
            setTransactions([]);
          }
          setLoading(false);
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

      const authUser = data?.user ?? null;
      setUser(authUser);
      if (authUser) {
        await upsertProfile({
          id: authUser.id,
          full_name: fullName,
          email: authUser.email,
          subscription_tier: 'Starter',
          preferences: { email_updates: true, payment_reminders: true },
        });
        await loadProfileData(authUser.id, authUser);
      }
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

      const authUser = data?.user ?? null;
      setUser(authUser);
      if (authUser) {
        await loadProfileData(authUser.id, authUser);
      }
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
      setProfile(null);
      return;
    }

    setLoading(true);
    try {
      const { error: logoutError } = await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setLinks([]);
      setTransactions([]);
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

  const updateProfile = async ({ fullName, companyName, websiteUrl, preferences }) => {
    if (!user) {
      throw new Error('Not authenticated');
    }

    setProfileLoading(true);
    try {
      const updates = {};
      if (fullName) updates.full_name = fullName;
      if (companyName) updates.company_name = companyName;
      if (websiteUrl) updates.website_url = websiteUrl;
      if (preferences) updates.preferences = preferences;

      const { data: authUpdate, error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
        },
      });

      if (authError) {
        console.warn('Auth metadata update failed:', authError.message);
      }

      const { data: profileData, error: profileError } = await updateProfileRow(user.id, updates);
      if (profileError) {
        throw profileError;
      }

      setProfile(profileData);
      setError(null);
      return profileData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setProfileLoading(false);
    }
  };

  const createPaymentLink = async ({ wallet_address, amount, label, note, tx_id }) => {
    if (!user) {
      throw new Error('Not authenticated');
    }
    const payload = {
      user_id: user.id,
      wallet_address,
      amount,
      label,
      note,
      tx_id,
    };

    const { data, error: createError } = await createPaymentLinkEntry(payload);
    if (createError) {
      throw createError;
    }

    setLinks((current) => [data, ...current]);
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        links,
        transactions,
        loading,
        profileLoading,
        error,
        signup,
        login,
        logout,
        updateProfile,
        createPaymentLink,
      }}
    >
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

