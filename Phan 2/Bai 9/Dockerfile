# Sử dụng image Python chính thức
FROM python:3.9-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép requirements.txt và cài đặt các dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở cổng mà ứng dụng chạy
EXPOSE 5000

# Lệnh để chạy ứng dụng
CMD ["python", "app.py"]