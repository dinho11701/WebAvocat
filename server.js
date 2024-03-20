require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const sgMail = require('@sendgrid/mail');
const cors = require('cors'); // include CORS

const app = express();

// Setup multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Enable CORS for all routes
app.use(cors()); // enable CORS

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', upload.single('attachment'), (req, res) => {
  const { name, phoneNumber, email, message } = req.body;
  let attachments = [];

  // Check if a file is present in the request
  if (req.file) {
    attachments = [{
      content: req.file.buffer.toString('base64'),
      filename: req.file.originalname,
      type: req.file.mimetype,
      disposition: 'attachment'
    }];
  }

  const msg = {
    to: process.env.RECIPIENT_EMAIL,
    from: process.env.SENDER_EMAIL,
    subject: 'New Contact Form Submission',
    text: `Message from: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`,
    attachments: attachments
  };

  sgMail.send(msg)
    .then(() => res.json({ success: true, message: 'Email sent successfully' }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error sending email' });
    });
});

const PORT = process.env.PORT || 2015;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
