from flask import Flask
import os

app = Flask(__name__)

# Lấy tên của instance từ biến môi trường (để phân biệt 2 instance)
instance_name = os.getenv("INSTANCE_NAME", "unknown")

@app.route('/')
def hello():
    return f"Hello from Flask Instance: {instance_name}\n"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)