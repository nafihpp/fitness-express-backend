const nodemailer = require('nodemailer');

/**
 * Sends an email to notify the user that their account has been created
 */
const sendAccountCreationEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Account Created Successfully',
    text: 'Your account has been created successfully!',
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendAccountCreationEmail };
