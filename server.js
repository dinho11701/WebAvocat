const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const sgMail = require('@sendgrid/mail');

const app = express();
const upload = multer(); // for parsing multipart/form-data

// Set this to your SendGrid API key
sgMail.setApiKey('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');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', upload.single('attachment'), (req, res) => {
    const { name, phoneNumber, email, message } = req.body;
    const { file } = req;

    const msg = {
        to: 'oswaldessongue@gmail.com', // Change to your recipient
        from: 'oswaldessongue@gmail.com', // Change to your verified sender
        subject: 'New Contact Form Submission',
        text: `Message from: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`,
        attachments: file ? [
            {
                content: file.buffer.toString('base64'),
                filename: file.originalname,
                type: file.mimetype,
                disposition: 'attachment',
            },
        ] : [],
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
            res.send('Email sent successfully');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error sending email');
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
