# Phase 2 Quick Reference

Fast lookup guide for Phase 2 implementation.

---

## 🚀 QUICK START (5 MIN)

```bash
# 1. Set environment
echo "VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_KEY" > .env

# 2. Create database tables
# → Open Supabase SQL Editor
# → Copy SQL from SUPABASE_SETUP.md
# → Run each query

# 3. Start dev server
npm run dev

# 4. Test
# → Sign up with email
# → Create payment link
# → Check dashboard
# → Edit profile
```

---

## 📂 FILE REFERENCE

| File | Purpose | Updated |
|------|---------|---------|
| `src/lib/db.js` | Database helpers | Phase 1 |
| `src/context/AuthContext.jsx` | Auth + profile + links | Phase 2 ✨ |
| `src/pages/Create.jsx` | Payment link creator | Phase 2 ✨ |
| `src/pages/Dashboard.jsx` | User dashboard | Phase 2 ✨ |
| `src/pages/Settings.jsx` | Profile editor | Phase 2 ✨ |
| `.env` | Config | Phase 2 |
| `SUPABASE_SETUP.md` | Database schema | Phase 2 ✨ |
| `PHASE2_INTEGRATION.md` | Implementation details | Phase 2 ✨ |
| `PHASE2_TESTING.md` | Test checklist | Phase 2 ✨ |
| `COMPLETE_CODE_EXAMPLES.md` | Code reference | Phase 2 ✨ |

---

## 🗂️ DATABASE SCHEMA

### profiles
```
id (uuid) → auth.users
full_name (text)
email (text)
company_name (text)
website_url (text)
subscription_tier (text) = 'Starter'
preferences (json)
created_at, updated_at (timestamp)
```

### payment_links
```
id (bigint)
user_id (uuid) → profiles
wallet_address (text)
amount (numeric)
label (text)
note (text)
tx_id (text) - UNIQUE
created_at, updated_at (timestamp)
```

### transactions
```
id (bigint)
user_id (uuid) → profiles
payment_link_id (bigint) → payment_links
amount (numeric)
status (text)
transaction_id (text) - UNIQUE
customer_name (text)
created_at, updated_at (timestamp)
```

---

## 🔧 CONTEXT API

### useAuth() Hook

```javascript
import { useAuth } from '../context/AuthContext';

const { 
  user,              // Logged-in user or null
  profile,           // User profile object
  links,             // Array of user's payment links
  transactions,      // Array of user's transactions
  loading,           // Auth loading state
  profileLoading,    // Profile data loading state
  error,             // Any errors
  
  signup,            // async (email, password, fullName)
  login,             // async (email, password)
  logout,            // async ()
  updateProfile,     // async (fullName, companyName, websiteUrl)
  createPaymentLink, // async (wallet_address, amount, label, note, tx_id)
} = useAuth();
```

---

## 💾 DB HELPERS

```javascript
import {
  fetchProfile,           // Get user profile
  upsertProfile,          // Create/update profile
  updateProfileRow,       // Update profile fields
  fetchPaymentLinks,      // Get user's payment links
  createPaymentLinkEntry, // Save payment link
  fetchTransactions,      // Get user's transactions
} from '../lib/db.js';
```

---

## 📝 COMMON TASKS

### Load Profile Data
```javascript
const { profile } = useAuth();
console.log(profile?.full_name);
console.log(profile?.company_name);
```

### Save Payment Link
```javascript
const { createPaymentLink } = useAuth();

await createPaymentLink({
  wallet_address: '0x123...',
  amount: 0.50,
  label: 'Service fee',
  note: 'Thank you',
  tx_id: 'ABC123',
});
```

### Update Profile
```javascript
const { updateProfile } = useAuth();

await updateProfile({
  fullName: 'John Doe',
  companyName: 'Acme Corp',
  websiteUrl: 'https://acme.com',
});
```

### Display User Data
```javascript
const { profile, links } = useAuth();

return (
  <>
    <h1>Welcome, {profile?.full_name}</h1>
    <p>Tier: {profile?.subscription_tier}</p>
    <ul>
      {links.map(link => (
        <li key={link.id}>{link.wallet_address}</li>
      ))}
    </ul>
  </>
);
```

---

## 🎯 STATE FLOW

```
User Signup
  → supabase.auth.signUp()
  → upsertProfile() created
  → AuthContext updates: user, profile
  → Dashboard shows personalized data

User Login
  → supabase.auth.signInWithPassword()
  → AuthContext loads: profile, links, transactions
  → All data displays on dashboard

Create Payment Link
  → User fills form
  → If authenticated → createPaymentLink() saves to DB
  → AuthContext updates links array
  → Dashboard reflects new link
  → Toast confirms save

Update Profile
  → User edits form on Settings
  → updateProfile() sends updates
  → AuthContext updates profile state
  → Dashboard greeting changes instantly
  → Database persists changes

Logout
  → supabase.auth.signOut()
  → AuthContext resets: user, profile, links, transactions
  → Redirect to login
  → Session cleared
```

---

## ⚠️ COMMON ISSUES

| Issue | Cause | Fix |
|-------|-------|-----|
| "Supabase not configured" | Missing `.env` vars | Add VITE_SUPABASE_URL and KEY |
| "useAuth undefined" | AuthProvider not wrapping app | Check `main.jsx` |
| Build fails | JSX syntax error | Run `npm run build`, check errors |
| No dashboard data | Tables not created | Run SQL from SUPABASE_SETUP.md |
| "Policy violation" | RLS blocking access | Create RLS policies in Supabase |
| Payment link doesn't save | Guest user (expected) | Login to save links |
| Profile shows old data | Cache not cleared | Refresh page or logout/login |

---

## 🔐 RLS POLICIES

All tables have RLS enabled. Users can only:
- **SELECT:** Own data (WHERE auth.uid() = id or user_id)
- **INSERT:** Their own records
- **UPDATE:** Their own records
- **DELETE:** Not allowed (data preserved)

---

## 🧪 QUICK TEST

```javascript
// In browser console (DevTools F12)

// Check auth
supabase.auth.getUser().then(({data}) => console.log(data.user.email));

// Check profile
supabase.from('profiles').select('*').then(({data}) => console.log(data));

// Check payment links
supabase.from('payment_links').select('*').then(({data}) => console.log(data));

// Check transactions
supabase.from('transactions').select('*').then(({data}) => console.log(data));
```

---

## 📊 EXAMPLE DATA

### Profile
```javascript
{
  id: "550e8400-e29b-41d4-a716-446655440000",
  full_name: "Jane Doe",
  email: "jane@example.com",
  company_name: "Acme Corp",
  website_url: "https://acme.com",
  subscription_tier: "Starter",
  preferences: { email_updates: true },
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-15T10:30:00Z"
}
```

### Payment Link
```javascript
{
  id: 1,
  user_id: "550e8400-e29b-41d4-a716-446655440000",
  wallet_address: "0x123456789abcdef",
  amount: 0.50,
  label: "Service fee",
  note: "Thanks for your business",
  tx_id: "ABC123XYZ",
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-15T10:30:00Z"
}
```

### Transaction
```javascript
{
  id: 1,
  user_id: "550e8400-e29b-41d4-a716-446655440000",
  payment_link_id: 1,
  amount: 0.50,
  status: "Completed",
  transaction_id: "TXN123",
  customer_name: "Alice",
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-15T10:30:00Z"
}
```

---

## 🔗 USEFUL COMMANDS

```bash
# Build for production
npm run build

# Preview build locally
npm run preview

# Check for errors
npm run build 2>&1 | grep -i error

# Open Supabase console
# → https://app.supabase.com

# Check environment
cat .env
```

---

## 📚 DOCUMENTATION

| File | Content |
|------|---------|
| `SUPABASE_SETUP.md` | Complete SQL schema |
| `PHASE2_INTEGRATION.md` | Full integration details |
| `COMPLETE_CODE_EXAMPLES.md` | Code reference |
| `PHASE2_TESTING.md` | Test checklist |
| `PHASE2_QUICK_REFERENCE.md` | This file |

---

## ✨ PHASE 2 SUMMARY

✅ Implemented:
- User profile system with Supabase
- Payment link persistence
- Dashboard personalization
- Settings profile editor
- Data integration in auth context
- RLS security policies
- Error handling and validation
- Toast notifications

❌ NOT implemented (Phase 3):
- Payment processing
- Email notifications
- Billing/subscriptions
- Advanced analytics

---

## 🎯 NEXT STEPS

1. Create Supabase tables (SQL)
2. Configure `.env`
3. Test signup → profile created
4. Test payment link → saved to dashboard
5. Test profile edit → changes persist
6. Run `npm run build`
7. Ready for Phase 3!

---

**Phase 2 Ready! ✨**

Have questions? Check the detailed docs above.
