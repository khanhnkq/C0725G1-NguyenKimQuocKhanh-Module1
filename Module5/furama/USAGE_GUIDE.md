# Hướng dẫn sử dụng hệ thống quản lý Furama Resort

## Các tính năng đã hoàn thành:

### ✅ 1. Quản lý Dịch vụ
- Danh sách dịch vụ (có phân trang, tìm kiếm)
- Thêm dịch vụ mới
- Sửa thông tin dịch vụ
- Xóa dịch vụ (có modal xác nhận)

### ✅ 2. Quản lý Khách hàng
- Danh sách khách hàng (dạng bảng, có phân trang, tìm kiếm)
- Thêm khách hàng mới (có validation)
- Sửa thông tin khách hàng
- Xóa khách hàng (có modal xác nhận)

### ✅ 3. Quản lý Hợp đồng
- Danh sách hợp đồng (dạng bảng, có phân trang, tìm kiếm)
- Tạo hợp đồng mới (chọn khách hàng và dịch vụ từ dropdown)
- Hiển thị thống kê hợp đồng theo trạng thái

## Cách chạy ứng dụng:

### 1. Cài đặt dependencies:
```bash
npm install
```

### 2. Chạy JSON Server (Terminal 1):
```bash
npx json-server --watch src/data/db.json --port 3000
```

### 3. Chạy React App (Terminal 2):
```bash
npm run dev
```

### 4. Truy cập ứng dụng:
- Frontend: http://localhost:5173
- JSON Server API: http://localhost:3000

## Cấu trúc dữ liệu:

### Khách hàng (customers):
- customerCode: Mã khách hàng
- customerName: Tên khách hàng
- dateOfBirth: Ngày sinh
- gender: Giới tính
- idCard: Số CMND
- phoneNumber: Số điện thoại
- email: Email
- customerType: Loại khách hàng (Diamond, Platinum, Gold, Silver, Member)
- address: Địa chỉ

### Hợp đồng (contracts):
- contractCode: Mã hợp đồng
- customerId: ID khách hàng
- customerName: Tên khách hàng
- serviceId: ID dịch vụ
- serviceName: Tên dịch vụ
- startDate: Ngày bắt đầu
- endDate: Ngày kết thúc
- deposit: Tiền đặt cọc
- totalAmount: Tổng tiền
- status: Trạng thái (Chờ xác nhận, Đang thực hiện, Đã thanh toán, Đã hủy)

## Menu điều hướng:
- 🏠 Trang chủ
- 📋 Dịch vụ
  - Danh sách dịch vụ
  - Thêm dịch vụ
- 👥 Khách hàng
  - Danh sách khách hàng
  - Thêm khách hàng
- 📝 Hợp đồng
  - Danh sách hợp đồng
  - Tạo hợp đồng

## Tính năng nổi bật:
- ✅ Tìm kiếm real-time
- ✅ Phân trang
- ✅ Validation form với Yup
- ✅ Modal xác nhận xóa
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Badge màu theo loại/trạng thái

