# 🚀 COMPLETE SETUP GUIDE - Simple Blog with Supabase

**Current Status:**
- ✅ Next.js project created (D:\simple-blog)
- ✅ All 11 pages built
- ✅ All 12 components built
- ✅ Supabase credentials in .env.local
- ✅ Dev server running at http://localhost:3000
- ⏳ **WAITING:** Database setup + Email Auth (YOU MUST DO THIS)

---

## 📋 PHASE 1: Setup Supabase Database Schema

### Step 1.1: Open Supabase Dashboard
1. Go to **https://supabase.com**
2. Login with your account
3. Click project **"simple-blog"** (or your project name)

### Step 1.2: Access SQL Editor
1. In left sidebar, click **SQL Editor**
2. Click **"New Query"** (blue button, top right)
3. Leave the name as default or name it "Create Tables"

### Step 1.3: Copy SQL Schema
Open **D:\simple-blog\SQL_SCHEMA.sql** and copy ALL content (174 lines)

### Step 1.4: Paste and Run
1. In Supabase SQL Editor, paste the entire SQL code
2. Click **RUN** (blue button, right side)
3. **WAIT** for completion (~3-5 seconds)
4. Expected result: **"Success"** ✅

**If you see error:**
- Check if SQL already ran (tables might exist)
- If tables exist, continue to next step
- If different error, try again or check Supabase status

---

## 🔑 PHASE 2: Enable Email Authentication

### Step 2.1: Open Authentication Providers
1. In Supabase sidebar, click **Authentication** (key icon)
2. Click **Providers** (left menu)

### Step 2.2: Enable Email Provider
1. Find **Email** in the providers list
2. Click on it (expand)
3. Toggle **"Enable Sign up"** → **ON** (should be green/blue)
4. Toggle **"Confirm email"** → **OFF** (for testing, uncheck to auto-confirm)
5. Click **"Save"** (if there's a save button)

**Expected:** Email provider shows as **enabled** (green checkmark)

---

## ✅ PHASE 3: Test the Application

### Step 3.1: Open App
1. Open browser → **http://localhost:3000**
2. You should see "📚 Latest Posts" heading (empty, no posts yet - that's OK!)

### Step 3.2: Register New User
1. Click **"Register"** button (top right)
2. Fill in form:
   ```
   Display Name: Nguyen Ngoc Tue Quang
   Email: test@example.com
   Password: password123
   ```
3. Click **"Register"** button

**Expected Results:**
- ✅ No error messages
- ✅ Page redirects to Dashboard
- ✅ You see "Welcome, Nguyen Ngoc Tue Quang!"

### Step 3.3: Create First Post
1. On Dashboard, click **"+ New Post"** (blue button)
2. Fill in form:
   ```
   Title: Hello World - My First Blog Post
   Excerpt: This is my first blog post using Supabase
   Content: Lorem ipsum dolor sit amet. This is a test post to verify everything works correctly.
   Status: Published (radio button)
   ```
3. Click **"Create Post"** button

**Expected Results:**
- ✅ Post created successfully
- ✅ Redirects back to Dashboard
- ✅ Post appears in your posts list

### Step 3.4: View Post on Home Page
1. Click **"Home"** (top left, blog logo)
2. You should see your post in the list with:
   - ✅ Title: "Hello World - My First Blog Post"
   - ✅ Excerpt visible
   - ✅ Author name: "Nguyen Ngoc Tue Quang"
   - ✅ Date stamp

### Step 3.5: View Post Detail & Add Comment
1. Click on the post title or card
2. Page shows full post content
3. Scroll down to **Comments** section
4. Enter comment:
   ```
   Great first post!
   ```
5. Click **"Add Comment"** button

**Expected Results:**
- ✅ Comment added successfully
- ✅ Comment appears in the list below form
- ✅ Shows your name + comment text + timestamp

### Step 3.6: Test Logout & Login
1. Click **"Logout"** (top right menu)
2. Should redirect to login page
3. Click **"Login"**
4. Enter credentials:
   ```
   Email: test@example.com
   Password: password123
   ```
5. Click **"Login"** button

**Expected Results:**
- ✅ Login successful
- ✅ Dashboard shows your posts
- ✅ Header shows your name

---

## 🎯 Phase 4: Verify Security (Optional but Important)

### Test 1: Draft Posts Hidden from Others
1. Create 2 user accounts (different emails)
2. User 1 creates a **DRAFT** post (Status: draft)
3. Logout and login as User 2
4. Go to Home page
5. **Expected:** Draft post NOT visible ✅

### Test 2: Cannot Delete Others' Posts
1. User 2 goes to Dashboard
2. Should NOT see User 1's posts ✅
3. If you try to access post detail via URL: should be forbidden

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Registration failed"** | Email provider not enabled (see Phase 2) |
| **"Cannot create post"** | SQL schema not run (see Phase 1) or logout/login again |
| **"Post not appearing on home"** | Check post status is "Published" not "Draft" |
| **"Cannot add comment"** | Make sure post is Published first |
| **"500 error on any page"** | Check .env.local has correct Supabase URL and ANON key |
| **App looks different** | Press Ctrl+Shift+Delete to clear browser cache |

---

## 🎉 Success Criteria

When EVERYTHING below works, you're DONE! ✅

- [x] SQL Schema runs without errors
- [x] Email Auth enabled in Supabase
- [x] Can register new user
- [x] Dashboard loads after login
- [x] Can create post with title, excerpt, content
- [x] Published post appears on Home page
- [x] Can view post detail page
- [x] Can add comments to published posts
- [x] Comments appear with your name
- [x] Can logout and login again
- [x] Cannot see draft posts as other user (RLS working)

---

## 📝 Notes

- **Dev server** is always running at http://localhost:3000
- **Refresh browser** if something looks wrong (F5)
- **SQL runs only once** - running again will error (that's OK, means it already ran)
- **Email confirmation:** We disabled it for testing (easy registration)
- **Supabase realtime** is enabled but optional (comments work fine without it)

---

## 🚀 Next Steps (Optional Enhancements)

Once basic setup works, you can:
1. Enable GitHub OAuth (setup GitHub app first)
2. Add more Tailwind styling
3. Add post search/filtering
4. Add user profiles page
5. Enable email notifications

---

**Questions?** Check error messages in browser console (F12) or Supabase SQL Editor logs.

