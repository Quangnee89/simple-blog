# 📊 SUPABASE SETUP - Step-by-Step Visual Guide

**Goal:** Setup database + enable email auth so the app works

---

## STEP 1️⃣: RUN SQL SCHEMA

### 1.1 Open Supabase
```
Browser → https://supabase.com
↓
Login with your account
↓
Click project "simple-blog"
```

### 1.2 Go to SQL Editor
```
Left Sidebar
↓
Click "SQL Editor" (icon looks like 🔍 or 📝)
↓
Click "New Query" (blue button, top right)
```

### 1.3 Copy SQL File
**Open file:** `D:\simple-blog\SQL_SCHEMA.sql`

**Copy everything** (ALL 174 LINES - from line 1 to line 174)

### 1.4 Paste in Supabase
```
In Supabase SQL Editor (white text area)
↓
Ctrl+A (select all)
↓
Ctrl+V (paste SQL)
↓
Click RUN (blue button, looks like ▶️ play)
```

### 1.5 Verify Success
**Expected output:**
```
✓ Success
(no red error messages)
```

**If SQL already ran:**
```
ERROR: relation "profiles" already exists
(This is OK - means it ran before)
```

---

## STEP 2️⃣: ENABLE EMAIL AUTHENTICATION

### 2.1 Go to Authentication
```
Left Sidebar
↓
Click "Authentication" (key icon 🔑)
↓
Click "Providers" (left menu)
```

### 2.2 Find and Enable Email Provider
```
Scroll down to find "Email"
↓
Click on "Email" (to expand)
```

### 2.3 Toggle Settings
**You should see options like:**
- ✅ Confirm email
- ✅ Double confirm email
- etc.

**For TESTING (easier):**
```
"Confirm email" → Toggle OFF (disable)
↓
This means new users auto-confirmed (no email needed)
↓
Click "Save" button
```

**Expected result:**
```
Email provider shows: ✅ Enabled (green checkmark)
```

---

## STEP 3️⃣: TEST THE APP

### 3.1 Open App
```
Browser → http://localhost:3000
```

**You should see:**
```
📚 Latest Posts
(empty, no posts yet - that's normal)
```

### 3.2 Click Register
```
Top right corner → "Register" button
```

**Fill the form:**
```
Display Name: Test User
Email: test@example.com
Password: password123

Click "Register" button
```

**Expected:**
```
✅ Success message
✅ Redirects to Dashboard
✅ Shows "Welcome, Test User!"
```

### 3.3 Create a Post
```
Dashboard → "+ New Post" (blue button)
```

**Fill form:**
```
Title: Hello World
Excerpt: My first post
Content: This is amazing!
Status: ✅ Published (must be checked!)

Click "Create Post"
```

**Expected:**
```
✅ Post created
✅ Back to Dashboard
✅ Post shows in your list
```

### 3.4 View on Home
```
Click "Home" (top left)
```

**You should see:**
```
📚 Latest Posts

[Card showing:]
Hello World
My first post
By Test User
[today's date]
```

### 3.5 View Post + Add Comment
```
Click on post card
```

**Post page shows:**
```
Hello World
[full content]
This is amazing!

[Comments section]
Comment text area
Add Comment button
```

**Add a comment:**
```
Type: Great post!
Click "Add Comment"
```

**Expected:**
```
✅ Comment appears
✅ Shows your name + comment + timestamp
```

---

## ✅ FINAL CHECKLIST

If ALL below work, you're DONE! 🎉

```
☐ SQL Schema ran without error
☐ Email provider is enabled
☐ Can register new user
☐ Dashboard loads
☐ Can create published post
☐ Post appears on Home
☐ Can view post detail
☐ Can add comment
☐ Can logout
☐ Can login again
```

---

## 🐛 TROUBLESHOOTING

### Problem: "Invalid credentials" on registration
**Solution:**
- Email provider not enabled
- Go to STEP 2️⃣ and enable Email
- Try registering again

### Problem: "Tables don't exist" error
**Solution:**
- SQL schema not run
- Go to STEP 1️⃣ and run SQL
- Verify "Success" message

### Problem: "Post not showing on home"
**Solution:**
- Check Status is "Published" not "Draft"
- Logout and login again
- Clear browser cache (Ctrl+Shift+Delete)

### Problem: "Cannot add comment"
**Solution:**
- Make sure post is published first
- Refresh page (F5)
- Check you're logged in

### Problem: App shows 500 error
**Solution:**
- Check .env.local has Supabase URL and ANON key
- Dev server needs to restart - stop and run `npm run dev`

---

## 📋 QUICK REFERENCE

| What | Where |
|------|-------|
| **Open Supabase** | https://supabase.com |
| **SQL Editor** | Sidebar → SQL Editor → New Query |
| **Copy SQL** | D:\simple-blog\SQL_SCHEMA.sql (ALL 174 lines) |
| **Paste SQL** | In Supabase SQL Editor white area |
| **Run SQL** | Click RUN button (blue) |
| **Auth Providers** | Sidebar → Authentication → Providers |
| **Enable Email** | Find Email → Expand → Toggle settings → Save |
| **Test App** | http://localhost:3000 → Register → Create Post |

---

**You're ready! Follow these steps and the app will work! 🚀**
