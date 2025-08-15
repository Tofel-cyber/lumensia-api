// ===== File: backend/server.js (VERSI FIX UNTUK LOKAL & VERCEL) =====
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- KONEKSI DATABASE ---
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => console.log("SUCCESS: Berhasil terhubung ke MongoDB."))
    .catch(err => console.error("ERROR: Gagal terhubung ke MongoDB:", err));

// --- PENYAJIAN FILE STATIS (FRONTEND) ---
// [PERBAIKAN] Mengarahkan path ke direktori root proyek, bukan ke 'client/dist'
const frontendPath = path.join(__dirname, '..'); 
app.use(express.static(frontendPath));

// --- ROUTE validation-key.txt ---
// File ini harus ada di direktori root proyek
app.get('/validation-key.txt', (req, res) => {
    res.sendFile(path.join(frontendPath, 'validation-key.txt'));
});

// --- API ROUTES ---
// Tambahkan route API kamu di sini, misal:
// app.use('/api/products', require('./routes/products'));

// --- FALLBACK ROUTE UNTUK SPA ---
// Semua permintaan selain API dan file statis diarahkan ke index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Ekspor app untuk Vercel
module.exports = app;

// Jalankan lokal jika tidak di Vercel
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
}
