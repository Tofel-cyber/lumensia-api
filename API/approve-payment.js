// api/approve-payment.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId } = req.body;

    // Lakukan validasi di sini sesuai kebutuhan kamu
    // Misalnya: cek apakah paymentId valid dari database

    return res.status(200).json({ message: 'Payment approved', paymentId });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
