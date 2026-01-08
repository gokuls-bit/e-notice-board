const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// MongoDB Connection
// Replace with your MongoDB URI
const MONGO_URI = 'mongodb://localhost:27017/mmdu_notice_db';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MMDU Database Connected'))
  .catch(err => console.error('❌ Connection Error:', err));

// Schema Definition
const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageLink: String,
  pdfLink: String,
  expiryDate: String,
  priority: { type: String, default: 'medium' }, // low, medium, high
  createdAt: { type: Date, default: Date.now }
});

const Notice = mongoose.model('Notice', noticeSchema);

// API Routes
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/notices', async (req, res) => {
  try {
    const newNotice = new Notice(req.body);
    await newNotice.save();
    io.emit('newNotice', newNotice); // Real-time Update
    res.status(201).json(newNotice);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/notices/:id', async (req, res) => {
  try {
    const updated = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/notices/:id', async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));