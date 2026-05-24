# Phase 2 Verification & Testing Guide

Step-by-step testing checklist to verify all Phase 2 features work correctly.

---

## ✅ PRE-FLIGHT CHECKS

### 1. Build Verification
```bash
npm run build
```

**Expected Output:**
```
✓ X modules transformed
dist/index.html 0.40 kB
dist/assets/index-XXX.css X kB
dist/assets/index-XXX.js XXX kB
✓ built in XXs
```

✅ **Pass:** Build completes with ✓ and no errors
❌ **Fail:** Any [vite:esbuild] errors - check JSX syntax

---

### 2. Development Server
```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.4.X building for development...
  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

✅ **Pass:** Server starts, accessible at localhost:5173
❌ **Fail:** Port already in use - use different port or kill process

---

### 3. Environment Variables
Check `.env` file:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

✅ **Pass:** Both variables present and non-empty
❌ **Fail:** Missing or invalid - app won't connect to Supabase

---

### 4. Supabase Tables Exist

In Supabase console → **Databases** → **Tables**:

✅ **Pass:** See `profiles`, `payment_links`, `transactions` tables
❌ **Fail:** Tables missing - run SQL setup from `SUPABASE_SETUP.md`

---

## 🧪 FEATURE TESTING

### TEST 1: Sign Up & Profile Creation

**Steps:**
1. Navigate to `http://localhost:5173/`
2. Click **Signup** link
3. Enter:
   - Email: `test@paylink.dev` (unique each test)
   - Password: `TestPassword123!`
   - Full Name: `Test User`
4. Click **Sign up**

**Expected Behavior:**
- ✅ Redirects to Dashboard
- ✅ Shows greeting "Welcome back, Test User"
- ✅ No error messages
- ✅ Navbar shows user email (or avatar if implemented)

**Verify in Supabase:**
```sql
SELECT * FROM public.profiles WHERE email = 'test@paylink.dev';
```

✅ **Pass:** One record with matching email, full_name, subscription_tier = 'Starter'
❌ **Fail:** No records or errors - check RLS policies and auth setup

---

### TEST 2: Login & Profile Loading

**Steps:**
1. Logout (if still logged in)
2. Navigate to `http://localhost:5173/login`
3. Enter same email and password from TEST 1
4. Click **Sign in**

**Expected Behavior:**
- ✅ Redirects to Dashboard
- ✅ Shows correct user name in greeting
- ✅ Subscription tier badge visible
- ✅ No authentication errors

**Verify in Browser Console:**
```javascript
// DevTools → Console
const { data: { user } } = await supabase.auth.getUser();
console.log(user.email);  // Should match login email
```

✅ **Pass:** User object returns correct email
❌ **Fail:** User is null - authentication failed

---

### TEST 3: Create Payment Link & Save

**Steps:**
1. Navigate to **Create** page (should be in nav)
2. Fill form:
   - Receiver Wallet: `0x123456789abcdef`
   - Amount: `0.50`
   - Label: `Test Payment`
   - Notes: `Testing Phase 2`
3. Click **Generate PayLink**

**Expected Behavior on Step 1:**
- ✅ No form errors
- ✅ Transitions to Step 2 (Link Generated)
- ✅ Button shows "Saving link..." then disappears
- ✅ Toast appears: "PayLink saved to your dashboard"

**Expected Behavior on Step 2:**
- ✅ Shows shareable link URL
- ✅ QR code visible
- ✅ Payment summary shows wallet and amount
- ✅ Copy button works (turn blue/green when clicked)

**Verify in Supabase:**
```sql
SELECT * FROM public.payment_links 
WHERE user_id = 'YOUR_USER_ID'
ORDER BY created_at DESC
LIMIT 1;
```

✅ **Pass:** One record with:
- `user_id` matching logged-in user
- `wallet_address` = entered wallet
- `amount` = 0.50
- `label` = "Test Payment"
- `note` = "Testing Phase 2"

❌ **Fail:** No records or wrong data - check `createPaymentLink` method

---

### TEST 4: Dashboard Shows Saved Links

**Steps:**
1. Stay on Create page, complete TEST 3
2. Navigate to **Dashboard**
3. Look for "Your saved PayLinks" section

**Expected Behavior:**
- ✅ Section exists with heading
- ✅ Shows payment link created in TEST 3
- ✅ Displays wallet address, amount, label
- ✅ Shows creation date
- ✅ Table shows at least 1 row

**Verify Data:**
- Wallet should show `0x123456789abcdef`
- Amount should show `0.50 SOL`
- Label should show `Test Payment`

✅ **Pass:** All saved PayLinks visible in dashboard
❌ **Fail:** No links shown - check profile loading in AuthContext

---

### TEST 5: Dashboard Stats

**Steps:**
1. On Dashboard page
2. Look at stats cards (4 cards at top)

**Expected Content:**
- Card 1: "Total Received" (shows number like "0.50 SOL")
- Card 2: "Transactions" (count)
- Card 3: "Avg Transaction" (average)
- Card 4: "Saved PayLinks" (count should match TEST 4)

**Expected Behavior:**
- ✅ All four stat cards visible
- ✅ Numbers make sense (no NaN or errors)
- ✅ "Saved PayLinks" count >= 1
- ✅ Shows trend indicators (+X%)

✅ **Pass:** Stats display correctly with real data
❌ **Fail:** Shows 0 or error - mock data fallback active (normal if no real transactions)

---

### TEST 6: Settings Profile Edit

**Steps:**
1. Navigate to **Settings** page
2. See "Your saved PayLinks" section
3. Scroll to "Profile details" form
4. Edit fields:
   - Full name: Change to `Updated Test User`
   - Company: Enter `Test Company Inc`
   - Website: Enter `https://test-company.dev`
5. Click **Save profile**

**Expected Behavior:**
- ✅ Button shows "Saving..." while processing
- ✅ Toast appears: "Profile updated successfully"
- ✅ Form values remain populated
- ✅ No errors in console

**Verify in Browser:**
- Check Dashboard greeting - should now say "Welcome back, Updated Test User"

**Verify in Supabase:**
```sql
SELECT full_name, company_name, website_url FROM public.profiles
WHERE id = 'YOUR_USER_ID';
```

✅ **Pass:** Database shows:
- `full_name` = "Updated Test User"
- `company_name` = "Test Company Inc"
- `website_url` = "https://test-company.dev"

❌ **Fail:** Old values still showing - check `updateProfile` in AuthContext

---

### TEST 7: Settings Profile Display

**Steps:**
1. On Settings page, scroll up
2. Look at "Profile" section on left

**Expected Display:**
- ✅ Avatar with first letter: "U" (from "Updated Test User")
- ✅ Shows name: "Updated Test User"
- ✅ Email shows: same as login email
- ✅ Member since: shows date account was created
- ✅ Company: "Test Company Inc"
- ✅ Website: "https://test-company.dev"

✅ **Pass:** All profile info displays correctly
❌ **Fail:** Missing or wrong values - check profile loading

---

### TEST 8: Guest Payment Link (No Save)

**Steps:**
1. Logout (use Navbar logout button)
2. Navigate to Create page
3. Note message appears: "Log in to save this PayLink to your account"
4. Fill form same as TEST 3
5. Click **Generate PayLink**

**Expected Behavior:**
- ✅ Link generates normally (Step 2)
- ✅ NO "Saving link..." message
- ✅ NO toast notification
- ✅ PayLink still works for payer

**Verify:**
- Link should be usable but won't appear on Dashboard
- Guest can proceed through Step 3 (Finalize)

✅ **Pass:** Guest flow works, links aren't saved
❌ **Fail:** Guest gets error or saves anyway - check `user` check in Create.jsx

---

### TEST 9: Logout & Re-login

**Steps:**
1. In Dashboard, click logout (Navbar or Settings)
2. Should redirect to Login page
3. Log back in with same credentials from TEST 1
4. Check Dashboard

**Expected Behavior:**
- ✅ Logout clears session
- ✅ Login succeeds
- ✅ Dashboard shows same data as before
- ✅ PayLink from TEST 3 still there
- ✅ Profile info from TEST 6 still there

**Browser Console Check:**
```javascript
// Before logout
console.log(localStorage);  // Has auth data

// After logout
console.log(localStorage);  // Clears

// After login
console.log(localStorage);  // Has auth data again
```

✅ **Pass:** Auth session persists correctly
❌ **Fail:** Data lost on logout/login - check session management

---

### TEST 10: Error Handling

**Steps:**
1. Intentionally trigger errors to verify error handling

#### 10a: Invalid Wallet on Create
1. Navigate to Create
2. Leave "Receiver Wallet" empty
3. Click "Generate PayLink"

**Expected:** Error message appears: "Enter a valid wallet address to continue."

#### 10b: Zero Amount
1. Enter wallet
2. Set Amount to 0
3. Click "Generate PayLink"

**Expected:** Error message appears: "Enter a payment amount greater than 0."

#### 10c: Settings Save Error (Simulated)
1. Go to Settings
2. Change profile
3. (If Supabase is offline, would show error)
4. Check toast notification

**Expected:** Toast shows error or success

✅ **Pass:** All validation and error messages appear
❌ **Fail:** Errors silently fail - check catch blocks

---

## 🔒 SECURITY VERIFICATION

### TEST 11: RLS Policies Enforce Data Privacy

**Setup:**
1. Create account A in TEST 1
2. Create Payment Link in TEST 3 (as Account A)
3. Note the link ID from Supabase
4. Logout and create NEW account B

**Steps (as Account B):**
1. Login with Account B credentials
2. Try manual query in browser console:
```javascript
const { data, error } = await supabase
  .from('payment_links')
  .select('*')
  .eq('id', LINK_ID_FROM_ACCOUNT_A);

console.log(data);  // Should be empty []
```

**Expected:**
- ✅ Account B cannot see Account A's PayLinks
- ✅ Query returns empty array
- ✅ No error (RLS silently filters)

❌ **Fail:** Sees Account A's data - RLS policies not working

---

### TEST 12: Unauthenticated User Access

**Steps:**
1. Open DevTools
2. In Application → Cookies, delete session cookie
3. Navigate to Protected Routes:
   - `/dashboard`
   - `/settings`
   - `/create`

**Expected Behavior:**
- ✅ All redirect to `/login`
- ✅ Can still view `/` (home), `/features`, `/pricing`, etc.
- ✅ Cannot access user data without authentication

✅ **Pass:** Protected routes are secured
❌ **Fail:** Can access protected routes - check ProtectedRoute component

---

## 📊 PERFORMANCE CHECKS

### TEST 13: Dashboard Load Time

**Steps:**
1. Open DevTools (F12) → Network tab
2. Reload dashboard
3. Check request times

**Expected:**
- Supabase requests take < 500ms each
- Dashboard fully renders < 1s
- No "blocking" requests

**Optimize if needed:**
- Check indexes on `user_id` exist
- Verify no N+1 queries

---

### TEST 14: Form Submission Response

**Steps:**
1. On Create page, submit form
2. Watch for loading states

**Expected:**
- ✅ Button shows "Saving link..." during save
- ✅ Response time < 1s
- ✅ No UI freeze/flicker

---

## 🎨 UI/UX VERIFICATION

### TEST 15: Responsive Design

**Steps:**
1. View on different screen sizes:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

**Expected:**
- ✅ All pages readable
- ✅ Buttons clickable
- ✅ Forms usable
- ✅ No horizontal scroll (except for wide tables)
- ✅ Navbar adapts (mobile menu?)

✅ **Pass:** Responsive design maintained
❌ **Fail:** Broken on mobile - adjust CSS

---

### TEST 16: Toast Notifications

**Steps:**
1. Trigger various actions that show toasts:
   - Save Payment Link → "PayLink saved to your dashboard"
   - Save Profile → "Profile updated successfully"
   - Errors → "Unable to save..."

**Expected:**
- ✅ Toast appears in bottom-right
- ✅ Auto-dismisses after ~3 seconds
- ✅ Multiple toasts stack
- ✅ Readable and non-intrusive

✅ **Pass:** All toasts work correctly
❌ **Fail:** Toasts not showing - check react-hot-toast setup

---

## ✨ FINAL CHECKLIST

### Core Features
- [ ] Signup creates profile in database
- [ ] Login loads profile, links, transactions
- [ ] Payment links save to database
- [ ] PayLinks display on Dashboard
- [ ] Settings profile editor works
- [ ] Profile updates persist
- [ ] Guest PayLinks don't save
- [ ] Logout clears session

### Data Integrity
- [ ] Profile has correct data
- [ ] Payment links have correct data
- [ ] User IDs match correctly
- [ ] Timestamps accurate
- [ ] Unique constraints enforced (tx_id)

### Security
- [ ] RLS policies prevent cross-user access
- [ ] Protected routes require auth
- [ ] Sensitive data not exposed
- [ ] No SQL injection possible
- [ ] JWT tokens valid

### Performance
- [ ] Supabase queries < 500ms
- [ ] Pages load < 1s
- [ ] No console errors
- [ ] No memory leaks
- [ ] Responsive on all devices

### UX/UI
- [ ] All text readable
- [ ] All buttons clickable
- [ ] Forms validate properly
- [ ] Error messages helpful
- [ ] Success feedback clear

---

## 🚀 DEPLOYMENT READINESS

After passing all tests:

1. [ ] `npm run build` succeeds
2. [ ] All features verified working
3. [ ] No console errors in production build
4. [ ] Database is backed up
5. [ ] Environment variables secured
6. [ ] Ready for Phase 3

---

## 📝 TEST RESULTS TEMPLATE

Copy this and fill in after testing:

```
Date: [DATE]
Tester: [NAME]
Build: npm run build
Tests Run: All 16

TEST 1 - Sign Up: ✅ PASS / ❌ FAIL
TEST 2 - Login: ✅ PASS / ❌ FAIL
TEST 3 - Create Link: ✅ PASS / ❌ FAIL
TEST 4 - Dashboard Links: ✅ PASS / ❌ FAIL
TEST 5 - Dashboard Stats: ✅ PASS / ❌ FAIL
TEST 6 - Settings Edit: ✅ PASS / ❌ FAIL
TEST 7 - Settings Display: ✅ PASS / ❌ FAIL
TEST 8 - Guest PayLink: ✅ PASS / ❌ FAIL
TEST 9 - Logout/Login: ✅ PASS / ❌ FAIL
TEST 10 - Error Handling: ✅ PASS / ❌ FAIL
TEST 11 - RLS Privacy: ✅ PASS / ❌ FAIL
TEST 12 - Auth Protection: ✅ PASS / ❌ FAIL
TEST 13 - Load Time: ✅ PASS / ❌ FAIL
TEST 14 - Form Response: ✅ PASS / ❌ FAIL
TEST 15 - Responsive: ✅ PASS / ❌ FAIL
TEST 16 - Toasts: ✅ PASS / ❌ FAIL

Overall: ✅ READY FOR PRODUCTION / ❌ ISSUES FOUND

Issues Found:
1. [ISSUE]
2. [ISSUE]

Next Steps:
- [ACTION]
```

---

**Ready to test Phase 2 implementation! 🧪**
