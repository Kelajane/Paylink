# PayLink Supabase Database Setup

Complete SQL schema to create tables in Supabase for Phase 2 implementation.

## Prerequisites

- Supabase project created
- `.env` file configured with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

---

## Table 1: profiles

Stores authenticated user profile data.

```sql
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  email text,
  company_name text,
  website_url text,
  subscription_tier text DEFAULT 'Starter',
  preferences jsonb DEFAULT '{"email_updates": true, "payment_reminders": true}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);
```

---

## Table 2: payment_links

Stores generated payment links created by authenticated users.

```sql
CREATE TABLE IF NOT EXISTS public.payment_links (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  wallet_address text NOT NULL,
  amount numeric(10,2) NOT NULL,
  label text,
  note text,
  tx_id text UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS payment_links_user_id_idx ON public.payment_links(user_id);

-- Enable Row Level Security
ALTER TABLE public.payment_links ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own payment links
CREATE POLICY "Users can view own payment links" ON public.payment_links
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can only create their own payment links
CREATE POLICY "Users can create payment links" ON public.payment_links
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own payment links
CREATE POLICY "Users can update own payment links" ON public.payment_links
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

---

## Table 3: transactions

Stores payment transaction records associated with payment links.

```sql
CREATE TABLE IF NOT EXISTS public.transactions (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  payment_link_id bigint REFERENCES public.payment_links(id) ON DELETE SET NULL,
  amount numeric(10,2) NOT NULL,
  status text DEFAULT 'Pending',
  transaction_id text UNIQUE,
  customer_name text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS transactions_user_id_idx ON public.transactions(user_id);

-- Enable Row Level Security
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own transactions
CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Authenticated users can create transactions
CREATE POLICY "Users can create transactions" ON public.transactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own transactions
CREATE POLICY "Users can update own transactions" ON public.transactions
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

---

## Setup Instructions

### Step 1: Access Supabase Console

1. Go to https://supabase.com
2. Sign in to your project
3. Navigate to the **SQL Editor**

### Step 2: Create Tables

1. Click **"New Query"**
2. Copy and paste each SQL block above (profiles, payment_links, transactions)
3. Click **"Run"** after each query
4. Verify no errors appear

### Step 3: Enable Realtime (Optional)

For live updates in the dashboard:

1. Go to **Replication** in the left sidebar
2. Enable replication for `payment_links` and `transactions` tables
3. Add the tables to the publication

### Step 4: Verify Row Level Security

1. Go to **Authentication** → **Policies**
2. Verify all policies appear for each table
3. Test with authenticated user

### Step 5: Test Connection

In your `.env`:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Run the app:
```bash
npm run dev
```

Sign up/login and verify:
- Profile saves to database
- PayLinks persist when created
- Dashboard loads user data

---

## Database Schema Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     auth.users                          │
│                  (Supabase built-in)                    │
├─────────────────────────────────────────────────────────┤
│ id (uuid)                                               │
│ email                                                   │
│ user_metadata (full_name)                               │
└────────────────┬────────────────────────────────────────┘
                 │ (1-to-1 reference)
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│                     profiles                            │
├─────────────────────────────────────────────────────────┤
│ id (uuid) → auth.users.id                               │
│ full_name                                               │
│ email                                                   │
│ company_name                                            │
│ website_url                                             │
│ subscription_tier                                       │
│ preferences (json)                                      │
│ created_at, updated_at                                  │
└────────────────┬────────────────────────────────────────┘
                 │ (1-to-many reference)
      ┌──────────┴───────────┐
      │                      │
      ▼                      ▼
  ┌───────────────────┐  ┌──────────────────┐
  │  payment_links    │  │  transactions    │
  ├───────────────────┤  ├──────────────────┤
  │ id (bigint)       │  │ id (bigint)      │
  │ user_id (uuid)    │  │ user_id (uuid)   │
  │ wallet_address    │  │ amount           │
  │ amount            │  │ status           │
  │ label             │  │ transaction_id   │
  │ note              │  │ customer_name    │
  │ tx_id (unique)    │  │ created_at       │
  │ created_at        │  │ updated_at       │
  │ updated_at        │  └──────────────────┘
  └───────────────────┘
```

---

## Row Level Security (RLS) Summary

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| profiles | Own profile | Own profile | Own profile | ❌ |
| payment_links | Own links | Own links | Own links | ❌ |
| transactions | Own txns | Own txns | Own txns | ❌ |

All policies ensure users can only access their own data.

---

## Testing Queries

### Insert test profile

```sql
INSERT INTO public.profiles (id, full_name, email, subscription_tier)
VALUES (auth.uid(), 'Test User', 'test@example.com', 'Starter');
```

### Insert test payment link

```sql
INSERT INTO public.payment_links (user_id, wallet_address, amount, label)
VALUES (auth.uid(), '0x123...', 0.50, 'Test Link');
```

### Query user's payment links

```sql
SELECT * FROM public.payment_links
WHERE user_id = auth.uid()
ORDER BY created_at DESC;
```

---

## Troubleshooting

### Issue: "Policy violation" error
- Ensure RLS policies are created correctly
- Verify user is authenticated (check JWT token)
- Check `auth.uid()` matches the `user_id` in query

### Issue: "PGRST116" (record not found)
- This is normal when profile doesn't exist yet
- App auto-creates profile on first login
- Check `src/lib/db.js` for `upsertProfile` logic

### Issue: Empty dashboard
- Verify tables were created (check **Databases** tab)
- Confirm RLS policies exist
- Test by manually inserting a test payment link

---

## Next Steps

1. Run SQL setup above in Supabase console
2. Test login/signup flow
3. Create a payment link to verify persistence
4. Check dashboard displays user data
5. Update profile in settings and verify save

For integration details, see:
- `src/lib/db.js` - Database helper functions
- `src/context/AuthContext.jsx` - Profile loading & profile management
- `src/pages/Dashboard.jsx` - Display user data
- `src/pages/Create.jsx` - Save payment links
- `src/pages/Settings.jsx` - Edit profile
