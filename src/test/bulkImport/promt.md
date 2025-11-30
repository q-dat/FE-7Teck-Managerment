<!-- Catalog -->

### Nhận danh sách máy dạng text và chuyển toàn bộ thành JSON chuẩn theo đúng format sau:

[{'name':'Tên sản phẩm chuẩn hóa',
'img':'https://res.cloudinary.com/cloud7teck/image/upload/1/123.jpg',
'price': <số>,
'status': 0,
'content':'New',
'configuration_and_memory': {'ram':'xGB', 'storage_capacity':'xxxGB'}}]

- Yêu cầu:
- Text mẫu: A06 5g 4/64gb đen green xám 9999
- Dạng chuẩn hóa:

* 1.Chuẩn hóa tên máy theo format: Thương hiệu + Dòng + RAM/ROM.
* 2.Tự nhận dạng RAM/ROM từ chuỗi, ví dụ: 4/64gb → 4GB/128GB.
* 3.Giá có “k” thì bỏ chữ “k” và dùng dạng số (9999k → 9999).
* 4.Nếu màu xuất hiện trong text thì không cần đưa vào name.
* 5.Không mô tả, không giải thích, chỉ xuất JSON hợp lệ.

<!-- Product -->

### Nhận danh sách máy dạng text và chuyển toàn bộ thành JSON chuẩn theo đúng format sau:

[{"catalogName": "Tên sản phẩm",
"name": "Tên sản phẩm",
"color": "Màu",
"img": "https://res.cloudinary.com/cloud7teck/image/upload/1/123.jpg",
"thumbnail": ["https://res.cloudinary.com/cloud7teck/image/upload/1/123.jpg"],
"price": Giá,
"status": "New",
"des": "",
"note": ""}]

- Yêu cầu:
- Text mẫu: A06 5g 4/64gb đen green xám 9999
- Dạng chuẩn hóa:

* 1.Dữ liệu được tách từng màu → mỗi màu là một sản phẩm riêng, giá quy đổi đúng chuẩn.
* 2.Chuẩn hóa tên máy theo format: Thương hiệu + Dòng + RAM/ROM, ví dụ: Samsung Galaxy A06 5G 4GB/64GB.
* 3.Tự nhận dạng RAM/ROM từ chuỗi, ví dụ 4/64gb → 4GB/128GB.
* 4.Giá có “k” thì bỏ chữ “k” và dùng dạng số (9999k → 9999).
* 5.Nếu màu xuất hiện trong text thì không cần đưa vào name.
* 6.Không mô tả, không giải thích, chỉ xuất JSON hợp lệ.
