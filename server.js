require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── Appointment Route ──────────────────────────────────────
app.post('/api/appointment', async (req, res) => {
  const { fullName, phone, email, service, date, time, notes } = req.body;

  if (!fullName || !phone || !service || !date || !time) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CLINIC_EMAIL,
    subject: `New Appointment Request — ${service}`,
    html: `
      <h2 style="color:#0a2f6b;">New Appointment Request</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || 'Not provided'}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Preferred Date:</strong> ${date}</p>
      <p><strong>Preferred Time:</strong> ${time}</p>
      <p><strong>Notes:</strong> ${notes || 'None'}</p>
      <hr/>
      <p style="color:#00b894;">Sent from Glorious Medical Centre website</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Appointment request received! We will contact you shortly.' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send. Please call us directly.' });
  }
});

// ── Contact Route ──────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { fullName, phone, email, subject, message } = req.body;

  if (!fullName || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CLINIC_EMAIL,
    subject: `New Contact Message — ${subject || 'General Inquiry'}`,
    html: `
      <h2 style="color:#0a2f6b;">New Contact Message</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
      <p><strong>Message:</strong><br/>${message}</p>
      <hr/>
      <p style="color:#00b894;">Sent from Glorious Medical Centre website</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Message sent! We'll get back to you soon." });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send. Please call us directly.' });
  }
});

// ── Fallback: serve index.html ─────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`GMC server running on http://localhost:${PORT}`));
