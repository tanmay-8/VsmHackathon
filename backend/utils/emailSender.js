const nodemailer = require('nodemailer');

const sendEmail = async (recipient, subject, text, attachments) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: recipient,
    subject,
    text,
    attachments
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
