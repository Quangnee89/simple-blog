# 📚 Simple Blog - Setup Guide

## Mục Tiêu
Ứng dụng blog đầy đủ với Next.js + Supabase + TypeScript + Tailwind CSS.

---

## 🚀 PHẦN 1: Setup Local Development

### 1.1 Clone / Download Project
```bash
# Nếu chưa có, tạo thư mục
mkdir ~/projects
cd ~/projects
# Project đã có sẵn ở D:\simple-blog
```

### 1.2 Cài Dependencies
```bash
cd D:\simple-blog
npm install
```

### 1.3 Kiểm Tra Build
```bash
npm run build
# Nếu thành công → Project ready
```

---

## ⚙️ PHẦN 2: Setup Supabase Project

### 2.1 Tạo Supabase Project
1. Truy cập https://supabase.com
2. Click **"New Project"**
3. **Organization**: Chọn hoặc tạo mới
4. **Database Password**: Tạo mật khẩu mạnh
5. **Region**: Chọn gần nhất (VN: Singapore)
6. Click **"Create new project"** → Chờ 1-2 phút

### 2.2 Lấy URL & Anon Key
1. Vào **Settings** (⚙️) → **API**
2. Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2.3 Update .env.local
File `D:\simple-blog\.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🗄️ PHẦN 3: Chạy SQL Schema

### 3.1 Mở SQL Editor
1. Vào Supabase Dashboard
2. Click **SQL Editor** (bên trái)
3. Click **"New Query"**

### 3.2 Chạy SQL
1. Mở file `D:\simple-blog\SQL_SCHEMA.sql`
2. Copy **toàn bộ nội dung**
3. Paste vào SQL Editor
4. Click **"RUN"** (Ctrl+Enter)
5. ✅ Nếu không có error → Schema ready!

---

## 🔐 PHẦN 4: Setup Authentication

### 4.1 Bật Email Provider
1. Vào **Authentication** → **Providers**
2. Tìm **Email** → Click để mở
3. Toggle **"Enable Email Provider"** ON
4. Bỏ qua email templates (dùng default)
5. Save

### 4.2 Bật GitHub OAuth (Optional nhưng Recommended)

**A. Tạo GitHub OAuth App:**
1. Vào https://github.com/settings/developers
2. Click **"New OAuth App"**
3. **Application name**: `Simple Blog`
4. **Homepage URL**: `http://localhost:3000`
5. **Authorization callback URL**: `http://localhost:3000/auth/callback`
6. Click **"Register application"**
7. Copy **Client ID**
8. Click **"Generate a new client secret"** → Copy Secret

**B. Setup trên Supabase:**
1. Vào **Authentication** → **Providers**
2. Tìm **GitHub** → Click
3. Toggle **"Enable GitHub Provider"** ON
4. Paste **Client ID** + **Client Secret**
5. Copy **Redirect URL** từ Supabase
6. Quay lại GitHub OAuth App settings
7. **Authorization callback URL**: Paste URL từ Supabase (có dạng `https://xxx.supabase.co/auth/v1/callback?provider=github`)
8. Save trên GitHub

---

## 🏃 PHẦN 5: Chạy Dev Server

```bash
cd D:\simple-blog
npm run dev
```

Truy cập: **http://localhost:3000**

---

## ✅ PHẦN 6: Test Features

### 6.1 Test Register
```
1. Click "Register" (top-right)
2. Điền: Display Name, Email, Password
3. Click "Register"
4. Kiểm tra email confirmation
5. Login thành công
```

### 6.2 Test Create Post
```
1. Login → Dashboard
2. Click "+ New Post"
3. Điền: Title, Excerpt, Content
4. Chọn Status: "published"
5. Click "Create Post"
6. Vào Home / → Thấy bài post
```

### 6.3 Test Comments
```
1. Vào bài post
2. Scroll xuống Comments
3. Điền comment content
4. Click "Post Comment"
5. Thấy comment hiện lên
```

### 6.4 Test GitHub Login
```
1. Logout (nếu đã login)
2. Click "Login" → "Login with GitHub"
3. Authorize
4. Redirect /dashboard thành công
```

---

## 🐛 Troubleshooting

### Error: "401 Unauthorized"
- ❌ Problem: Env variables sai hoặc URL/Key chưa update
- ✅ Solution: Kiểm tra lại `.env.local`

### Error: "RLS Violation"
- ❌ Problem: SQL chưa chạy đủ hoặc RLS policy sai
- ✅ Solution: Chạy lại SQL_SCHEMA.sql từ đầu

### Error: "CORS Error"
- ❌ Problem: Supabase URL không chính xác
- ✅ Solution: Kiểm tra NEXT_PUBLIC_SUPABASE_URL

### Can't Login
- ❌ Problem: Email confirmation chưa bật
- ✅ Solution: 
  1. Vào Auth → Users → Tìm user
  2. Click → "Confirm identity"

---

## 📦 Build & Deploy

### Local Build
```bash
npm run build
npm start
# http://localhost:3000
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel login
vercel
# Chọn project → Deploy
# Add env variables ở Vercel dashboard
```

---

## 📋 Project Structure

```
simple-blog/
├── src/
│   ├── app/
│   │   ├── page.tsx (Home)
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── posts/[slug]/
│   │   ├── auth/callback/
│   │   └── actions/ (Server actions)
│   ├── components/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── posts/
│   │   └── layout/
│   ├── lib/
│   │   └── supabase/ (Client, Server, Middleware)
│   ├── types/
│   │   └── database.ts
│   └── middleware.ts
├── .env.local (Copy từ .env.example)
├── .env.example
├── SQL_SCHEMA.sql (Chạy trên Supabase)
└── README.md
```

---

## 🎯 Features Completed

✅ Authentication (Email + GitHub OAuth)
✅ User Profiles Auto-created
✅ Posts CRUD (Draft/Published)
✅ Auto-generated Slugs
✅ Comments on Posts
✅ Public Feed
✅ Dashboard
✅ Middleware & Route Protection
✅ Row-Level Security (RLS)
✅ TypeScript Types
✅ Tailwind CSS Styling

---

## 📞 Support

Nếu có lỗi:
1. Kiểm tra `.env.local`
2. Kiểm tra SQL chạy đầy đủ
3. Kiểm tra Auth providers bật
4. Xem console (F12) cho error details
5. Kiểm tra Supabase logs

---

**Happy Blogging! 🚀**
