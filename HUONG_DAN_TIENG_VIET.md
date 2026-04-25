# 🚀 HƯỚNG DẪN SETUP - Simple Blog with Supabase (TIẾNG VIỆT)

**Tình trạng hiện tại:**
- ✅ Next.js project đã tạo xong (D:\simple-blog)
- ✅ Build thành công
- ✅ Dev server đang chạy tại http://localhost:3000
- ⏳ **CẦN LÀM:** Setup Supabase Database + Email Auth

---

## 🎯 BẮT ĐẦU NGAY LẬP TỨC

### BƯỚC 1️⃣: CHẠY SQL SCHEMA TẠO BẢNG DATABASE

**1. Mở Supabase Dashboard**
```
Browser → https://supabase.com
↓
Đăng nhập
↓
Chọn project "simple-blog"
```

**2. Vào SQL Editor**
```
Thanh trái → "SQL Editor"
↓
Nút xanh "New Query" (góc phải)
```

**3. Copy SQL Schema**
```
Mở file: D:\simple-blog\SQL_SCHEMA.sql
Chọn tất cả (174 dòng)
Copy (Ctrl+A → Ctrl+C)
```

**4. Paste vào Supabase**
```
Trong Supabase SQL Editor (ô trắng)
↓
Paste (Ctrl+V)
↓
Nút xanh "RUN" ▶️
↓
CHỜ 3-5 giây
```

**5. Kiểm tra kết quả**
```
Bạn sẽ thấy: ✓ Success

Nếu có lỗi "relation already exists" → OK, nghĩa là đã chạy rồi
```

---

### BƯỚC 2️⃣: BẬT EMAIL AUTHENTICATION

**1. Vào Authentication**
```
Thanh trái → "Authentication" (🔑)
↓
"Providers" (menu trái)
```

**2. Tìm Email Provider**
```
Cuộn xuống tìm "Email"
↓
Click vào Email (expand)
```

**3. Cấu hình (cho TESTING dễ)**
```
"Confirm email" → Toggle OFF (tắt)
(Nghĩa là người dùng không cần xác nhận email để test)

Nút "Save"
```

**Kết quả:**
```
Email provider: ✅ Enabled (xanh)
```

---

### BƯỚC 3️⃣: TEST ỨNG DỤNG (THỰC HIỆN CHI TIẾT)

#### 3.1: Mở App
```
Browser → http://localhost:3000

Bạn sẽ thấy:
📚 Latest Posts
(trống, không có bài viết - bình thường)
```

#### 3.2: Đăng Ký Tài Khoản
```
Góc phải → Nút "Register"
```

**Form:**
```
Display Name: Nguyễn Ngọc Tuệ Quang
Email: test@example.com
Password: password123

Nút "Register"
```

**Kết quả:**
```
✅ Không có lỗi
✅ Chuyển đến Dashboard
✅ Thấy "Welcome, Nguyễn Ngọc Tuệ Quang!"
```

#### 3.3: Tạo Bài Viết Đầu Tiên
```
Dashboard → Nút xanh "+ New Post"
```

**Form:**
```
Title: Hello World
Excerpt: Bài viết đầu tiên
Content: Đây là bài viết test
Status: ✅ Published (chọn Published, KHÔNG phải Draft!)

Nút "Create Post"
```

**Kết quả:**
```
✅ Tạo thành công
✅ Quay lại Dashboard
✅ Bài viết hiện trong danh sách
```

#### 3.4: Xem Trên Trang Chủ
```
Click "Home" (góc trái)
```

**Bạn sẽ thấy:**
```
📚 Latest Posts

[Card]
Hello World
Bài viết đầu tiên
By Nguyễn Ngọc Tuệ Quang
[ngày hôm nay]
```

#### 3.5: Xem Chi Tiết + Thêm Comment
```
Click vào bài viết
```

**Trang hiện:**
```
Hello World
Đây là bài viết test

[Comment section]
Textarea: "Thêm comment..."
Nút "Add Comment"
```

**Thêm comment:**
```
Gõ: Bài viết hay!
Nút "Add Comment"
```

**Kết quả:**
```
✅ Comment xuất hiện
✅ Thấy tên bạn + comment + thời gian
```

#### 3.6: Test Logout & Login Lại
```
Góc phải → "Logout"
↓
Chuyển đến Login
↓
Nhập:
  Email: test@example.com
  Password: password123
↓
Nút "Login"
```

**Kết quả:**
```
✅ Login thành công
✅ Dashboard hiện bài viết
✅ Header hiện tên bạn
```

---

## ✅ KIỂM TRA HOÀN THÀNH

Nếu TẤT CẢ bên dưới OK → XONG! 🎉

```
☐ SQL Schema chạy thành công
☐ Email provider đã bật
☐ Đăng ký được account mới
☐ Dashboard load được
☐ Tạo được bài viết Published
☐ Bài viết hiện trên Home
☐ Xem được chi tiết bài viết
☐ Thêm được comment
☐ Logout được
☐ Login lại được
```

---

## 🐛 LỖI - CÁCH FIX

| Lỗi | Giải Pháp |
|-----|-----------|
| "Không đăng ký được" | Email provider chưa bật (BƯỚC 2️⃣) |
| "500 error" | Dev server cần restart: `npm run dev` |
| "Bài viết không hiện" | Check Status = "Published" (không phải Draft) |
| "Không thêm được comment" | Bài viết phải Published trước |
| ".env.local error" | Supabase URL + ANON key có chính xác không? |

---

## 📂 FILE QUAN TRỌNG

```
D:\simple-blog\
├── SQL_SCHEMA.sql ← COPY VÀO SUPABASE
├── .env.local ← CÓ SUPABASE CREDENTIALS
├── src/app/ ← Tất cả pages
├── src/components/ ← Tất cả components
└── package.json ← Dependencies
```

---

## 🎉 HOÀN THÀNH!

Khi hoàn thành setup:

✅ Bạn có app blog **HOÀN CHỈNH**
✅ Người dùng có thể **đăng ký, đăng nhập**
✅ Có thể **viết bài, chia sẻ**
✅ Có thể **comment** trên bài viết
✅ Có **security** (RLS) bảo vệ dữ liệu

---

## 🚀 TIẾP THEO (TÙY CHỌN)

Sau khi setup xong, có thể:
- [ ] Thêm GitHub login
- [ ] Styling đẹp hơn
- [ ] Thêm search bài viết
- [ ] Deploy lên Vercel

---

**Bắt đầu BƯỚC 1️⃣ ngay bây giờ!** 💪
