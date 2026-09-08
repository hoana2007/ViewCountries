# Mini Web Builder Skill

## 1. Mục tiêu

Skill này dùng để xây dựng các **web mini chạy trực tiếp trên trình duyệt**, ưu tiên:

- Chỉ sử dụng **HTML + CSS + JavaScript thuần**.
- Không dùng React, Vue, Angular, TypeScript, Tailwind, Bootstrap hoặc framework frontend khác.
- Có thể dùng CDN cho thư viện nhỏ nếu thật sự cần, nhưng mặc định phải ưu tiên Web API và JavaScript thuần.
- Giao diện hiện đại, sạch, nhất quán, lấy cảm hứng từ **GitHub**: bố cục rõ ràng, sidebar/navigation gọn, card, border, typography tốt, trạng thái hover/focus, màu sắc tiết chế.
- Responsive tốt trên desktop, tablet và mobile.
- Chức năng cụ thể của từng web **không được skill tự suy đoán**; phải lấy từ phần mô tả/yêu cầu do người dùng cung cấp.
- Mỗi web mini phải có thể chạy độc lập bằng cách mở `index.html` trong trình duyệt nếu không có yêu cầu backend.

---

## 2. Nguyên tắc đọc yêu cầu

Khi người dùng cung cấp mô tả web:

1. Đọc toàn bộ mô tả trước khi viết code.
2. Trích xuất:
   - Mục tiêu của web.
   - Người dùng cần làm gì.
   - Các chức năng bắt buộc.
   - Dữ liệu đầu vào.
   - Dữ liệu đầu ra.
   - Các trạng thái UI.
   - Quy tắc xử lý dữ liệu.
   - Yêu cầu lưu trữ.
   - Yêu cầu responsive.
3. Không tự thêm nghiệp vụ quan trọng mà người dùng chưa yêu cầu.
4. Có thể bổ sung các chi tiết UX nhỏ nếu chúng không làm thay đổi nghiệp vụ, ví dụ:
   - loading state;
   - empty state;
   - success/error feedback;
   - confirm trước thao tác xóa;
   - keyboard accessibility.
5. Nếu yêu cầu mơ hồ nhưng vẫn có thể triển khai hợp lý, chọn phương án đơn giản, dễ dùng và dễ sửa.
6. Nếu thiếu thông tin khiến chức năng có nhiều cách triển khai khác nhau, hỏi người dùng trước khi khóa thiết kế.

---

## 3. Quy tắc công nghệ

### Bắt buộc

- HTML5 semantic.
- CSS3.
- Vanilla JavaScript.
- ES6+.
- Không cần build tool.
- Không cần npm nếu người dùng không yêu cầu.
- Tách mã thành:
  - `index.html`
  - `style.css`
  - `script.js`

### Chỉ dùng thêm file khi cần

Có thể tạo:

- `assets/`
- `icons/`
- `data/`
- `README.md`

Không tạo file thừa.

### Lưu trữ dữ liệu

Nếu web chạy local và không có backend:

- Ưu tiên `localStorage`.
- Dùng `sessionStorage` nếu dữ liệu chỉ cần tồn tại trong phiên.
- Có thể dùng IndexedDB nếu dữ liệu lớn hoặc cần cấu trúc phức tạp.
- Không giả vờ có database/backend nếu chưa được yêu cầu.

Nếu người dùng yêu cầu backend/API:

- Phải nói rõ frontend thuần HTML/CSS/JS không tự cung cấp backend.
- Có thể thiết kế lớp API trong JavaScript để sau này kết nối backend.
- Không tự tạo server nếu người dùng chỉ yêu cầu mini web frontend.

---

## 4. Quy tắc giao diện — phong cách GitHub hiện đại

Giao diện nên mang tinh thần GitHub hiện đại, nhưng **không sao chép nguyên xi thương hiệu hoặc giao diện độc quyền**.

### Đặc điểm chính

- Background sáng hoặc tối có độ tương phản tốt.
- Border mảnh.
- Border-radius vừa phải.
- Typography rõ ràng.
- Khoảng trắng hợp lý.
- Button nhỏ gọn, rõ trạng thái.
- Card/panel có cấu trúc rõ.
- Sidebar hoặc top navigation khi phù hợp.
- Badge/tag cho trạng thái.
- Icon đơn giản.
- Hover/focus transition nhẹ.
- Không dùng gradient lòe loẹt.
- Không lạm dụng shadow.
- Không dùng quá nhiều màu.

### Hệ thống màu mặc định

Có thể sử dụng CSS variables:

```css
:root {
  --bg: #ffffff;
  --bg-muted: #f6f8fa;
  --surface: #ffffff;
  --border: #d0d7de;
  --text: #1f2328;
  --text-muted: #656d76;
  --primary: #1f883d;
  --primary-hover: #1a7f37;
  --danger: #cf222e;
  --warning: #9a6700;
  --info: #0969da;
  --radius: 8px;
}
```

Nếu thiết kế dark mode:

```css
[data-theme="dark"] {
  --bg: #0d1117;
  --bg-muted: #161b22;
  --surface: #0d1117;
  --border: #30363d;
  --text: #e6edf3;
  --text-muted: #8b949e;
  --primary: #3fb950;
  --primary-hover: #56d364;
  --danger: #f85149;
  --warning: #d29922;
  --info: #58a6ff;
}
```

Không bắt buộc phải dùng chính xác các giá trị trên; hãy điều chỉnh khi nội dung web yêu cầu.

---

## 5. Cấu trúc giao diện mặc định

Không phải web nào cũng cần đủ các phần dưới đây. Chỉ sử dụng phần phù hợp.

```text
App
├── Header / Topbar
├── Sidebar / Navigation
├── Main
│   ├── Page header
│   ├── Toolbar / Filters
│   ├── Main content
│   └── Empty / Loading / Error state
└── Footer nếu cần
```

Với web nhỏ, có thể dùng:

```text
Header
Main
└── Card / Tool
```

Không ép mọi web phải có sidebar.

---

## 6. UX bắt buộc

Mọi chức năng tương tác phải có phản hồi rõ ràng.

### Button

Phải có:

- default;
- hover;
- active;
- focus;
- disabled nếu cần.

### Form

Phải có:

- label;
- placeholder khi hữu ích;
- validation;
- thông báo lỗi gần trường nhập;
- trạng thái thành công khi phù hợp.

Không chỉ dùng placeholder thay cho label.

### Dữ liệu rỗng

Nếu danh sách không có dữ liệu, hiển thị empty state thân thiện, ví dụ:

```text
No items yet
Create your first item to get started.
```

### Xóa dữ liệu

Nếu thao tác xóa có khả năng gây mất dữ liệu:

- Có confirm hoặc undo.
- Không xóa âm thầm.

### Responsive

Thiết kế mobile-first hoặc ít nhất phải đảm bảo:

- không tràn ngang;
- button dễ bấm;
- text không bị cắt;
- bảng có cách xử lý phù hợp;
- sidebar có thể chuyển thành menu/drawer nếu cần.

---

## 7. Accessibility

Tối thiểu phải:

- Dùng semantic HTML.
- Dùng `button` cho hành động.
- Dùng `a` cho navigation.
- Có label cho input.
- Có focus state rõ ràng.
- Không phụ thuộc hoàn toàn vào màu sắc để truyền đạt trạng thái.
- Hỗ trợ keyboard cho các thành phần tương tác chính.
- Dùng `aria-*` khi thật sự cần.

---

## 8. JavaScript architecture

Không viết JavaScript thành một khối hỗn độn.

Ưu tiên cấu trúc:

```javascript
const state = {
  items: [],
  filters: {},
  selectedId: null
};

const elements = {
  // DOM references
};

function init() {
  loadData();
  bindEvents();
  render();
}

function loadData() {
  // Load local data / localStorage / API
}

function bindEvents() {
  // Event listeners
}

function render() {
  renderMain();
  renderStatus();
}

document.addEventListener("DOMContentLoaded", init);
```

### Quy tắc

- Tách state, event, data và rendering ở mức hợp lý.
- Tránh duplicate event listener.
- Không dùng inline `onclick` nếu không cần.
- Không thao tác DOM dư thừa.
- Dùng event delegation cho danh sách lớn khi phù hợp.
- Không dùng `eval`.
- Không đưa dữ liệu người dùng vào `innerHTML` một cách không an toàn.

Ưu tiên:

```javascript
element.textContent = userInput;
```

thay vì:

```javascript
element.innerHTML = userInput;
```

Nếu bắt buộc dùng `innerHTML`, phải kiểm soát/escape dữ liệu động.

---

## 9. HTML architecture

HTML phải dễ đọc và dễ bảo trì.

Ví dụ:

```html
<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Mini web application">
  <title>Mini Web</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header></header>

  <main id="app">
    <!-- Application UI -->
  </main>

  <script src="script.js"></script>
</body>
</html>
```

Không đưa toàn bộ CSS và JavaScript vào HTML trừ khi người dùng yêu cầu **single-file HTML**.

---

## 10. CSS architecture

Ưu tiên:

```css
/* 1. Variables */
/* 2. Reset / Base */
/* 3. Layout */
/* 4. Components */
/* 5. States */
/* 6. Responsive */
```

Ví dụ:

```css
:root {
  --bg: #ffffff;
  --surface: #ffffff;
  --border: #d0d7de;
  --text: #1f2328;
  --muted: #656d76;
  --primary: #1f883d;
  --radius: 8px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}
```

Không viết CSS lặp lại nếu có thể tạo component/class dùng chung.

---

## 11. Icons

Ưu tiên theo thứ tự:

1. CSS/simple text nếu icon rất đơn giản.
2. Inline SVG tự viết.
3. Icon library qua CDN nếu thật sự cần.

Không để icon làm giảm khả năng hiểu của giao diện.

Button icon-only phải có `aria-label`.

---

## 12. Dark mode

Nếu phù hợp với web, nên hỗ trợ:

- Light.
- Dark.
- System preference.

Có thể dùng:

```javascript
const media = window.matchMedia("(prefers-color-scheme: dark)");
```

và lưu lựa chọn người dùng bằng `localStorage`.

Không bắt buộc thêm dark mode nếu yêu cầu web quá đơn giản hoặc người dùng không cần.

---

## 13. Dữ liệu mẫu

Nếu chức năng cần dữ liệu nhưng người dùng chưa cung cấp dữ liệu thật:

- Tạo dữ liệu mẫu nhỏ.
- Dữ liệu mẫu phải dễ nhận biết là demo.
- Không tạo hàng trăm bản ghi giả.
- Không làm người dùng hiểu nhầm dữ liệu mẫu là dữ liệu thật.

---

## 14. Error handling

JavaScript phải xử lý lỗi ở các điểm có thể thất bại:

- JSON parse.
- localStorage.
- Fetch/API.
- Form validation.
- File input.
- Import/export.
- Các thao tác dữ liệu.

Ví dụ:

```javascript
try {
  const data = JSON.parse(rawData);
  return data;
} catch (error) {
  console.error(error);
  showError("Dữ liệu không hợp lệ.");
  return null;
}
```

Không để lỗi JavaScript làm hỏng toàn bộ UI nếu có thể tránh.

---

## 15. Performance

Đối với mini web:

- Không tối ưu quá mức.
- Nhưng tránh:
  - render toàn bộ trang không cần thiết;
  - event listener dư thừa;
  - vòng lặp nặng trong mỗi lần nhập liệu;
  - ảnh quá lớn;
  - thư viện nặng không cần thiết.

Nếu danh sách lớn:

- debounce search;
- event delegation;
- pagination hoặc virtualized rendering khi thực sự cần.

---

## 16. Security cơ bản

Không:

- hard-code API secret;
- hard-code password;
- sử dụng `eval`;
- chèn raw user input vào HTML;
- giả lập authentication như một hệ thống bảo mật thật.

Nếu có API key cần bảo mật, phải nói rõ rằng **frontend thuần không thể giữ secret an toàn** và cần backend/proxy.

---

## 17. Quy tắc output khi xây web

Khi người dùng yêu cầu xây dựng một web mini, output mặc định phải gồm:

```text
1. Tóm tắt ngắn chức năng đã hiểu.
2. Cấu trúc file.
3. Code hoàn chỉnh:
   - index.html
   - style.css
   - script.js
4. Hướng dẫn chạy.
5. Ghi chú những phần cần backend/API nếu có.
```

Nếu người dùng yêu cầu một file duy nhất:

```text
index.html
```

thì gộp CSS và JavaScript vào file đó.

Không đưa code giả hoặc pseudocode nếu người dùng yêu cầu web hoàn chỉnh.

---

## 18. Tiêu chí hoàn thành

Trước khi trả kết quả, tự kiểm tra:

### Functionality

- [ ] Tất cả chức năng người dùng yêu cầu đã được triển khai.
- [ ] Button hoạt động.
- [ ] Form hoạt động.
- [ ] Validation hoạt động.
- [ ] Dữ liệu được lưu/đọc đúng nếu có yêu cầu.
- [ ] Search/filter/sort hoạt động nếu được yêu cầu.
- [ ] Error state hoạt động.

### UI

- [ ] Giao diện hiện đại.
- [ ] Phong cách nhất quán.
- [ ] Có hover/focus.
- [ ] Không có layout tràn màn hình.
- [ ] Responsive mobile.
- [ ] Empty state phù hợp.
- [ ] Không có thành phần thừa.

### Code

- [ ] HTML semantic.
- [ ] CSS dễ bảo trì.
- [ ] JavaScript rõ ràng.
- [ ] Không dùng framework.
- [ ] Không có secret.
- [ ] Không có `eval`.
- [ ] Không có lỗi rõ ràng trong console.

---

## 19. Quy tắc xử lý mô tả người dùng

Phần mô tả do người dùng nhập được xem là **nguồn yêu cầu chính**.

```text
Mô tả:
"Tạo một web hiển thị thông tin 1 quốc gia. Có ô tìm kiếm, nút tìm kiếm, Hiển thị tất cả các trường thông tin của trang web Rest Countries theo API cung cấp.
Có thêm, sửa, xóa, tìm kiếm theo tên quốc gia.
Có nút chia sẻ dữ liệu quốc gia đó, có nút tìm kiếm và chụp ảnh màn hình, tải dữ liệu sau khi xuất ra file text.
Giao diện giống GitHub."
```

Skill phải chuyển thành:

```text
App type: CRUD mini app
Data: students
Features:
- Add
- Edit
- Delete
- Search by name
- Local persistence
UI:
- GitHub-inspired
- Responsive
```

Sau đó triển khai đúng phạm vi.

Nếu mô tả nói:

```text
"Có đăng nhập"
```

nhưng không có backend:

- Có thể dựng UI đăng nhập/demo flow.
- Không được tuyên bố đó là authentication bảo mật thực sự.
- Phải ghi rõ giới hạn.

Nếu mô tả nói:

```text
"Lấy dữ liệu từ API X"
```

thì:

- Tạo API service layer.
- Xử lý loading/error/empty.
- Không hard-code token bí mật.
- Nếu API không có CORS hoặc chưa có endpoint thật, ghi rõ phần cần cấu hình.

---

## 20. Ưu tiên cuối cùng

Khi có xung đột giữa các nguyên tắc:

1. Yêu cầu chức năng cụ thể của người dùng.
2. Tính đúng đắn và khả năng sử dụng.
3. Accessibility.
4. Responsive.
5. Giao diện hiện đại kiểu GitHub.
6. Code đơn giản, dễ sửa.
7. Tối ưu hiệu năng.

**Không hy sinh chức năng người dùng yêu cầu chỉ để giao diện đẹp hơn.**
