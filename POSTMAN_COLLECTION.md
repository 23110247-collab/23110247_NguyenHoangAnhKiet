# Postman Collection for Register API

## Base URL
```
http://localhost:8080
```

## Environment Variables
Tạo environment với các biến:
- `base_url`: `http://localhost:8080`

---

## 1. REGISTER
**POST** `/auth/register`

**Body (raw JSON):**
```json
{
  "email": "user1@example.com",
  "phone": "0901234567",
  "password": "123456",
  "role_id": 2
}
```

**Response (201):**
```json
{
  "status": 201,
  "message": "User registered successfully",
  "data": {
    "id": 2,
    "email": "user1@example.com",
    "phone": "0901234567"
  }
}
```

---

## Thứ tự test khuyến nghị:

1. **Register** - Tạo user mới

---

## Lưu ý quan trọng:

1. **Cần cài đặt dependencies:**
   ```bash
   npm install jsonwebtoken bcryptjs express-rate-limit cookie-parser
   ```

2. **Cần tạo .env file:**
   ```
   DB_NAME=testdb
   DB_USER=root
   DB_PASSWORD=1042005trungall
   DB_HOST=127.0.0.1
   DB_PORT=3306
   ACCESS_TOKEN_SECRET=your_access_token_secret_key_here
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_key_here
   PORT=8080
   ```

3. **Cần chạy migration:**
   ```bash
   npx sequelize-cli db:migrate
   ```

---

## Import Collection vào Postman:

1. Copy collection JSON bên dưới
2. Mở Postman → Import → Paste JSON
3. Tạo environment với các biến như hướng dẫn
4. Chạy các request theo thứ tự

```json
{
  "info": {
    "name": "Register API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"user1@example.com\",\n  \"phone\": \"0901234567\",\n  \"password\": \"123456\",\n  \"role_id\": 2\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "{{base_url}}/auth/register",
          "host": ["{{base_url}}"],
          "path": ["auth", "register"]
        }
      }
    }
  ]
}
```
