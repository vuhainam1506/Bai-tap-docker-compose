# Sử dụng image Node.js chính thức
FROM node:18

# Tạo thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở port mà ứng dụng Node.js sẽ chạy
EXPOSE 3000

# Lệnh để chạy ứng dụng
CMD ["node", "server.js"]