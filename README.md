# Website 20/10 Dành Tặng Người Yêu ❤️

Trang web lãng mạn, hiện đại dành riêng cho ngày Phụ nữ Việt Nam 20/10, được thiết kế tối ưu trên cả điện thoại di động và máy tính.

---

## 🌟 Các tính năng nổi bật
1. **Hiệu ứng cánh hoa hồng & trái tim bay**: Canvas particle mượt mà, nhẹ nhàng.
2. **Đồng hồ đếm ngày yêu nhau**: Tự động tính số ngày, giờ, phút, giây bên nhau theo thời gian thực.
3. **Bức thư tình 20/10 tương tác**: Bấm vào phong thư 3D có sáp niêm phong để mở ra bức thư tình với hiệu ứng máy đánh chữ (typewriter).
4. **Hộp quà bí mật 20/10**: Mở nắp hộp quà bắn pháo hoa giấy (confetti) và mở khóa các phiếu quà tặng tình yêu (Love Vouchers).
5. **Góc kỷ niệm Polaroid**: Album ảnh phong cách polaroid kèm băng dính washi và lightbox phóng to.
6. **Bộ phát nhạc lãng mạn tích hợp**: Sử dụng Web Audio API phát giai điệu du dương không lo lỗi bản quyền hoặc cho phép dán link mp3 tùy thích.
7. **Bảng chỉnh sửa nhanh trong trình duyệt**: Nhấp vào nút ⚙️ ở góc phải dưới để đổi tên, biệt danh, ngày kỷ niệm ngay trên web mà không cần sửa code.

---

## 🛠 Hướng dẫn cá nhân hóa
Mở file [config.js](file:///Users/nguyenngocphuc/.gemini/antigravity/scratch/womens-day-20-10/js/config.js) để tùy biến:
- `receiverName`: Tên bạn gái (VD: `Thảo Vy`, `Bé Yêu`).
- `nickname`: Biệt danh thân mật (VD: `Công Chúa Nhỏ`, `Mèo Béo`).
- `senderName`: Tên bạn (VD: `Anh`, `Minh`).
- `loveStartDate`: Ngày bắt đầu yêu (định dạng `YYYY-MM-DD`).
- `letter`: Nội dung bức thư tình 20/10.
- `memories`: Link ảnh và caption kỷ niệm của hai bạn.
- `vouchers`: Các điều ước/phiếu quà tặng bạn muốn dành cho cô ấy.

---

## 🚀 Cách mở website
- **Cách 1**: Mở trực tiếp file [index.html](file:///Users/nguyenngocphuc/.gemini/antigravity/scratch/womens-day-20-10/index.html) bằng trình duyệt (Chrome, Safari, Edge).
- **Cách 2**: Chạy máy chủ tĩnh local:
  ```bash
  cd /Users/nguyenngocphuc/.gemini/antigravity/scratch/womens-day-20-10
  python3 -m http.server 8080
  ```
  Sau đó mở `http://localhost:8080` trên trình duyệt.

- **Cách gửi tặng qua mạng**: Kéo thả toàn bộ thư mục lên [Netlify Drop](https://app.netlify.com/drop) hoặc [Vercel](https://vercel.com) hoặc tạo GitHub Repository bật GitHub Pages là bạn sẽ có ngay một link web (VD: `https://tang-em-2010.netlify.app`) để gửi qua Zalo / Messenger cho bạn gái!
