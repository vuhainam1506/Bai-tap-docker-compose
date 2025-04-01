const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware để parse JSON
app.use(express.json());

// Kết nối với MongoDB
mongoose.connect('mongodb://mongo:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Định nghĩa schema và model cho dữ liệu
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Item = mongoose.model('Item', itemSchema);

// API: Lấy tất cả items
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// API: Thêm một item mới
app.post('/items', async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
  });
  await newItem.save();
  res.status(201).json(newItem);
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});