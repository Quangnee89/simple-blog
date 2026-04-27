# Simple Blog (Next.js + Supabase)

Ứng dụng blog full-stack theo bài thực hành Supabase: Auth + CRUD Posts + Comments + Realtime + RLS.

## Công nghệ

- Next.js App Router + TypeScript + Tailwind CSS
- Supabase Auth + Database + Realtime
- `@supabase/supabase-js`, `@supabase/ssr`

## Tính năng chính

- Đăng ký / đăng nhập email-password
- Đăng nhập GitHub OAuth
- Middleware bảo vệ `/dashboard`, `/dashboard/new`, `/dashboard/edit/[id]`
- Redirect user đã đăng nhập khỏi `/login`, `/register`
- CRUD bài viết theo quyền tác giả
- Trang chủ public chỉ hiển thị bài `published`
- Chi tiết bài viết + bình luận
- Realtime comments (INSERT/DELETE đồng bộ UI)

## Chạy dự án

```bash
npm install
npm run dev
```

Mặc định: `http://localhost:3000`  
Nếu 3000 đã bận, Next.js sẽ tự dùng cổng khác (ví dụ 3003).

## Cấu hình Supabase

Tạo file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Thiết lập Database

1. Mở Supabase SQL Editor
2. Chạy toàn bộ script trong `SQL_SCHEMA.sql`
3. Vào **Authentication > Providers** bật Email và GitHub (nếu dùng OAuth)
4. Với GitHub OAuth:
   - Callback URL: `http://localhost:3000/auth/callback`
   - Nếu chạy cổng khác, thêm callback URL tương ứng
5. Với realtime comments:
   - Vào **Database > Replication**
   - Bật replication cho bảng `comments`

## Kiểm tra nhanh

1. Register tài khoản mới (`/register`)
2. Login (`/login`)
3. Tạo bài ở `/dashboard/new`
4. Publish bài để thấy ở trang chủ `/`
5. Mở bài viết, thêm comment
6. Mở 2 tab cùng bài viết để kiểm tra realtime comment

## Lưu ý

- Project chỉ dùng anon key ở client, không dùng service role key.
- Tất cả truy vấn dữ liệu phụ thuộc RLS policy trong `SQL_SCHEMA.sql`.
