import { supabase } from './supabase.js';

export async function fetchProfile(userId) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not initialized.') };
  }
  return supabase.from('profiles').select('*').eq('id', userId).single();
}

export async function upsertProfile(profile) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not initialized.') };
  }
  return supabase.from('profiles').upsert(profile).select().single();
}

export async function updateProfileRow(userId, updates) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not initialized.') };
  }
  return supabase.from('profiles').update(updates).eq('id', userId).select().single();
}

export async function fetchPaymentLinks(userId) {
  if (!supabase) {
    return { data: [], error: new Error('Supabase is not initialized.') };
  }
  return supabase
    .from('payment_links')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}

export async function createPaymentLinkEntry(link) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not initialized.') };
  }
  return supabase.from('payment_links').insert(link).select().single();
}

export async function fetchTransactions(userId) {
  if (!supabase) {
    return { data: [], error: new Error('Supabase is not initialized.') };
  }
  return supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}
