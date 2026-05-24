# PayLink Phase 2 - Complete Code Examples

Reference guide for all updated components in Phase 2.

---

## 1. Database Setup (SQL)

**File:** `SUPABASE_SETUP.md` (complete)

Run these SQL queries in Supabase SQL Editor:

```sql
-- profiles table
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

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- payment_links table
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

CREATE INDEX IF NOT EXISTS payment_links_user_id_idx ON public.payment_links(user_id);
ALTER TABLE public.payment_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own payment links" ON public.payment_links FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create payment links" ON public.payment_links FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own payment links" ON public.payment_links FOR UPDATE USING (auth.uid() = user_id);

-- transactions table
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

CREATE INDEX IF NOT EXISTS transactions_user_id_idx ON public.transactions(user_id);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own transactions" ON public.transactions FOR UPDATE USING (auth.uid() = user_id);
```

---

## 2. Database Helpers

**File:** `src/lib/db.js`

```javascript
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
```

---

## 3. Auth Context with Profile Management

**File:** `src/context/AuthContext.jsx`

**Key Features:**
- Auto-loads profile on login
- Auto-creates profile on signup
- Manages profile, links, and transactions state
- `updateProfile()` method for editing profile
- `createPaymentLink()` method for saving links

**State:**
```javascript
const [user, setUser] = useState(null);
const [profile, setProfile] = useState(null);
const [links, setLinks] = useState([]);
const [transactions, setTransactions] = useState([]);
const [loading, setLoading] = useState(true);
const [profileLoading, setProfileLoading] = useState(true);
const [error, setError] = useState(null);
```

**updateProfile Method:**
```javascript
const updateProfile = async ({ fullName, companyName, websiteUrl, preferences }) => {
  // Converts camelCase to snake_case for database
  // Updates both auth.users metadata and profiles table
  // Returns updated profile data
};
```

**createPaymentLink Method:**
```javascript
const createPaymentLink = async ({ wallet_address, amount, label, note, tx_id }) => {
  // Saves payment link to database
  // Updates local links state
  // Throws error if not authenticated
};
```

---

## 4. Create Payment Link Page

**File:** `src/pages/Create.jsx`

**Key Features:**
- Generates shareable payment links
- Saves to Supabase if authenticated
- Works as guest (links don't save)
- Toast notifications for feedback
- Three-step wizard UI

**Integration:**
```javascript
import { useAuth } from '../context/AuthContext.jsx';

export default function Create() {
  const { user, createPaymentLink } = useAuth();
  
  // When form submitted:
  if (user) {
    setSaving(true);
    try {
      await createPaymentLink({
        wallet_address: safeWallet,
        amount: Number(safeAmount),
        label: safeLabel,
        note: note.trim(),
        tx_id: transactionId,
      });
      toast.success('PayLink saved to your dashboard.');
    } catch (createError) {
      console.warn('Save PayLink failed:', createError);
      toast.error('Unable to save PayLink. It will still work locally.');
    } finally {
      setSaving(false);
    }
  }
}
```

---

## 5. Dashboard with User Data

**File:** `src/pages/Dashboard.jsx`

**Key Features:**
- Displays authenticated user name and tier
- Shows saved payment links
- Displays transaction history
- Calculates stats (total received, avg transaction)
- Falls back to mock data if no real data

**Integration:**
```javascript
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { profile, links, transactions } = useAuth();
  
  const displayName = profile?.full_name || 'PayLink user';
  const tier = profile?.subscription_tier || 'Starter';
  
  // Display stats
  const totalReceived = transactions
    .filter(tx => tx.status === 'Completed')
    .reduce((sum, tx) => sum + Number(tx.amount), 0)
    .toFixed(2);
}
```

---

## 6. Settings Profile Editor

**File:** `src/pages/Settings.jsx`

**Key Features:**
- Edit profile fields: full name, company, website
- Display account info: email, member since
- Save changes to database
- Toast notifications

**Integration:**
```javascript
import { useAuth } from '../context/AuthContext.jsx';

export default function Settings() {
  const { user, profile, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [company, setCompany] = useState(profile?.company_name || '');
  const [website, setWebsite] = useState(profile?.website_url || '');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        fullName,
        companyName: company,
        websiteUrl: website,
      });
      toast.success('Profile updated successfully.');
    } catch (error) {
      toast.error('Unable to save profile changes.');
    } finally {
      setSaving(false);
    }
  };
}
```

---

## 7. Environment Configuration

**File:** `.env`

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

**File:** `.env.example`

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_public_anon_key
```

---

## 8. Dependencies

**File:** `package.json`

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.105.4",
    "lucide-react": "^1.14.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hot-toast": "^2.4.0",
    "react-router-dom": "^6.14.1"
  }
}
```

No new packages needed. Phase 2 uses existing dependencies.

---

## 9. Data Models

### Profile

```javascript
{
  id: "user-uuid",                    // From auth.users
  full_name: "Jane Doe",              // Editable in Settings
  email: "jane@example.com",          // From auth
  company_name: "Acme Corp",          // Editable in Settings
  website_url: "https://acme.com",    // Editable in Settings
  subscription_tier: "Starter",       // Displayed on Dashboard
  preferences: {
    email_updates: true,
    payment_reminders: true
  },
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-15T10:30:00Z"
}
```

### Payment Link

```javascript
{
  id: 1,                              // Auto-generated
  user_id: "user-uuid",               // From authenticated user
  wallet_address: "0x123...",         // From form
  amount: 0.50,                       // From form (SOL)
  label: "Service fee",               // From form
  note: "Thanks for business",        // From form
  tx_id: "ABC123XYZ",                 // Generated, unique
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-15T10:30:00Z"
}
```

### Transaction

```javascript
{
  id: 1,                              // Auto-generated
  user_id: "user-uuid",               // From authenticated user
  payment_link_id: 1,                 // Optional reference
  amount: 0.50,                       // Payment amount
  status: "Completed",                // "Pending" or "Completed"
  transaction_id: "TXN123",           // Unique identifier
  customer_name: "Alice",             // Payer name
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-15T10:30:00Z"
}
```

---

## 10. Common Patterns

### Loading Profile Data

```javascript
useEffect(() => {
  // Automatically called by AuthContext on login
  const loadProfileData = async (userId, authUser) => {
    const profile = await fetchProfile(userId);
    if (!profile) {
      await upsertProfile({
        id: userId,
        full_name: authUser.email.split('@')[0],
        email: authUser.email,
      });
    }
  };
}, []);
```

### Saving Payment Link

```javascript
const handleGenerateLink = async () => {
  if (!user) {
    // Guest flow - link works but doesn't save
    console.log('Guest user - PayLink not saved');
    return;
  }
  
  // Authenticated - save to database
  await createPaymentLink({
    wallet_address,
    amount: Number(amount),
    label,
    note,
    tx_id,
  });
};
```

### Updating Profile

```javascript
const handleSaveProfile = async () => {
  await updateProfile({
    fullName: formData.name,
    companyName: formData.company,
    websiteUrl: formData.website,
  });
};
```

---

## 11. Error Handling

### Profile Not Found

```javascript
const { data: profileData, error: profileError } = await fetchProfile(userId);

if (profileError && profileError.code !== 'PGRST116') {
  // PGRST116 = record not found (expected on first login)
  console.warn('Profile fetch error:', profileError.message);
}

// Auto-create if missing
if (!profileData) {
  await upsertProfile({...});
}
```

### Database Save Fails

```javascript
try {
  await createPaymentLink({...});
  toast.success('PayLink saved!');
} catch (error) {
  // PayLink still works locally, just not saved
  console.warn('Save failed:', error);
  toast.error('Could not save. Link works locally.');
}
```

### Authentication Missing

```javascript
if (!user) {
  throw new Error('Not authenticated');
  // Show login prompt to user
}
```

---

## 12. Testing Queries

### Check Profile Exists

```javascript
// In browser console
const { data } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id);
console.log(data);
```

### Check Payment Links Saved

```javascript
const { data } = await supabase
  .from('payment_links')
  .select('*')
  .eq('user_id', user.id);
console.log(data);
```

### Check Transactions

```javascript
const { data } = await supabase
  .from('transactions')
  .select('*')
  .eq('user_id', user.id);
console.log(data);
```

---

## 13. Deployment Checklist

- [ ] All SQL tables created in Supabase
- [ ] `.env` configured with real Supabase credentials
- [ ] RLS policies verified on all tables
- [ ] `npm run build` completes with ✓
- [ ] Test sign up flow
- [ ] Test payment link creation and save
- [ ] Test profile editing
- [ ] Test dashboard data loading
- [ ] Test logout and re-login
- [ ] Verify data persists across sessions

---

## 📖 Complete Reference

**Files Modified:**
- `src/pages/Create.jsx` → Supabase save integration
- `src/pages/Dashboard.jsx` → User data display
- `src/pages/Settings.jsx` → Profile editor
- `src/context/AuthContext.jsx` → Profile management

**Files Created:**
- `SUPABASE_SETUP.md` → SQL schema
- `PHASE2_INTEGRATION.md` → Integration guide
- `COMPLETE_CODE_EXAMPLES.md` → This file

**Files Unchanged:**
- `src/lib/supabase.js` (client config - no changes)
- `src/lib/db.js` (helpers - already complete)
- `src/components/ProtectedRoute.jsx`
- `src/components/Navbar.jsx`
- `src/pages/Login.jsx`
- `src/pages/Signup.jsx`
- Auth system fully preserved

---

**✨ Phase 2 Implementation Complete**

All components integrated. Ready for Phase 3 (payment processing or other features).
