const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Body parsing middleware (limit body size to 10kb to prevent DDOS)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Serves static files from the root directory
// This means frontend can run on the exact same port, making deployment extremely easy.
app.use(express.static(path.join(__dirname)));

// MySQL Pool setup
let dbPool;

async function connectDatabase() {
  try {
    dbPool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'komal_portfolio',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test the database connection
    const connection = await dbPool.getConnection();
    console.log('Successfully connected to the MySQL Database.');
    connection.release();
  } catch (error) {
    console.error('Database connection failed. Please check your MySQL server or .env configuration.');
    console.error(error.message);
  }
}

connectDatabase();

// Throttling / Rate Limiting: max 3 contact submissions per 10 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3, 
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many contact requests from this IP. Please try again after 10 minutes."
  }
});

// Contact Endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { full_name, email, phone, subject, message, honeypot } = req.body;
  const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // 1. Honeypot check to intercept simple spam bots
  if (honeypot && honeypot.trim() !== '') {
    console.warn(`Honeypot triggered from IP: ${ipAddress}`);
    // Respond with success to trick the bot without saving it
    return res.status(200).json({
      success: true,
      message: "Thank you! Your message has been received."
    });
  }

  // 2. Data Sanitization & Trimming
  const trimName = full_name ? full_name.trim() : '';
  const trimEmail = email ? email.trim() : '';
  const trimPhone = phone ? phone.trim() : null;
  const trimSubject = subject ? subject.trim() : '';
  const trimMessage = message ? message.trim() : '';

  // 3. Server-side Validation
  const errors = {};

  if (!trimName) {
    errors.full_name = "Full name is required.";
  } else if (trimName.length > 150) {
    errors.full_name = "Full name cannot exceed 150 characters.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimEmail) {
    errors.email = "Email address is required.";
  } else if (!emailRegex.test(trimEmail)) {
    errors.email = "Please enter a valid email address.";
  } else if (trimEmail.length > 255) {
    errors.email = "Email cannot exceed 255 characters.";
  }

  if (trimPhone && trimPhone.length > 30) {
    errors.phone = "Phone number cannot exceed 30 characters.";
  }

  if (!trimSubject) {
    errors.subject = "Subject is required.";
  } else if (trimSubject.length > 255) {
    errors.subject = "Subject cannot exceed 255 characters.";
  }

  if (!trimMessage) {
    errors.message = "Message is required.";
  } else if (trimMessage.length > 3000) {
    errors.message = "Message cannot exceed 3000 characters.";
  }

  // Check if there are validation errors
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Please correct the highlighted fields.",
      errors
    });
  }

  // 4. Save to Database using PDO-like Prepared Statements
  try {
    if (!dbPool) {
      throw new Error("Database connection is not initialized.");
    }

    const insertSql = `
      INSERT INTO contact_messages (full_name, email, phone, subject, message, ip_address)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await dbPool.execute(insertSql, [
      trimName,
      trimEmail,
      trimPhone,
      trimSubject,
      trimMessage,
      ipAddress
    ]);

    console.log(`New contact message stored with ID: ${result.insertId}`);

    return res.status(200).json({
      success: true,
      message: "Thank you! Your message has been received."
    });

  } catch (dbError) {
    console.error("Failed to insert message into MySQL database:", dbError.message);
    
    // Fail gracefully without exposing DB errors to users
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while sending your message. Please try again later."
    });
  }
});

// Fallback to serve index.html for single page layout feel
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start listening with EADDRINUSE handling
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = PORT + 1;
    console.warn(`⚠️  Port ${PORT} already in use. Trying port ${nextPort}...`);
    server.listen(nextPort, () => {
      console.log(`Server running at http://localhost:${nextPort}`);
    });
  } else {
    console.error('Server error:', err);
    throw err;
  }
});
