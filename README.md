# View Countries

Trang web tra cứu và quản lý thông tin quốc gia. Giao diện dùng HTML, CSS và JavaScript thuần; dữ liệu tra cứu lấy từ REST Countries API.

## Tính năng

- Tìm kiếm quốc gia theo tên tiếng Anh và xem thông tin, cờ, bản đồ.
- Thêm, sửa, xóa và lọc danh sách quốc gia đã lưu.
- Chuyển giao diện sáng/tối, chia sẻ thông tin, chụp ảnh và tải thông tin dạng TXT.
- Lưu danh sách và giao diện trên trình duyệt bằng `localStorage`.

## Git

Tải mã nguồn về máy:

```bash
git clone https://github.com/hoana2007/ViewCountries.git
cd ViewCountries
```

Đẩy thay đổi lên GitHub:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

## Chạy ứng dụng

Triển khai thư mục này trên Vercel và cấu hình biến môi trường `REST_COUNTRIES_API_KEY` trong Project Settings. Sau khi triển khai, mở URL Vercel để sử dụng đầy đủ chức năng.

> Mở trực tiếp `index.html` vẫn hiển thị giao diện, nhưng tìm kiếm cần các API route trong thư mục `api/` và khóa API trên Vercel.