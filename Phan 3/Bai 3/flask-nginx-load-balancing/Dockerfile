# Sử dụng image Python chính thức
FROM python:3.9-slim

# Tạo thư mục làm việc
WORKDIR /app

# Sao chép file requirements.txt và cài đặt dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép mã nguồn
COPY . .

# Mở port 5000
EXPOSE 5000

# Lệnh chạy ứng dụng
CMD ["python", "app.py"]