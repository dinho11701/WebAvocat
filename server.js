require('dotenv').config(); // Assurez-vous que cette ligne est au début de votre fichier pour charger les variables d'environnement

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const sgMail = require('@sendgrid/mail');

const app = express();
const upload = multer(); // for parsing multipart/form-data

// Utilisez la clé API de SendGrid à partir des variables d'environnement
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', upload.single('attachment'), (req, res) => {
  const { name, phoneNumber, email, message } = req.body;
  const { file } = req.file; // Ici, req.file est directement utilisé, pas req.

  const msg = {
    to: process.env.RECIPIENT_EMAIL, // Utilisez des variables d'environnement pour les adresses e-mail
    from: process.env.SENDER_EMAIL, // Idem ici
    subject: 'New Contact Form Submission',
    text: `Message from: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`,
    attachments: file
      ? [{
          content: file.buffer.toString('base64'),
          filename: file.originalname,
          type: file.mimetype,
          disposition: 'attachment',
        }]
      : [],
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      res.send('Email sent successfully');
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
      res.status(500).send('Error sending email');
    });
});


const PORT = process.env.PORT || 3008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
