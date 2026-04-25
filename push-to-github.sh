#!/bin/bash
# Simple Blog - GitHub Push Script
# Script này sẽ push dự án lên GitHub

echo "=== SIMPLE BLOG - GitHub Push Helper ==="
echo ""
echo "Repository: https://github.com/Quanngee89/simple-blog"
echo "Branch: main (renamed from master)"
echo ""
echo "BƯỚC 1: Tạo Personal Access Token trên GitHub"
echo "  1. Đi tới: https://github.com/settings/tokens"
echo "  2. Click 'Generate new token' > 'Generate new token (classic)'"
echo "  3. Đặt tên: 'simple-blog-push'"
echo "  4. Chọn scopes: ✓ repo (full control)"
echo "  5. Click 'Generate token'"
echo "  6. COPY token (không thể xem lại sau này!)"
echo ""
echo "BƯỚC 2: Paste token vào đây khi được yêu cầu"
echo "  - Username: Quanngee89"
echo "  - Password: <paste token tại đây>"
echo ""
echo "BƯỚC 3: Chạy push command"
echo ""
read -p "Nhấn Enter khi bạn đã sẵn sàng..."
echo ""
echo "Đang kiểm tra branch..."
git branch
echo ""
echo "Đang đổi tên branch sang main..."
git branch -M main
echo ""
echo "Đang push lên GitHub..."
git push -u origin main
echo ""
echo "✅ Hoàn tất!"
echo "GitHub: https://github.com/Quanngee89/simple-blog"
