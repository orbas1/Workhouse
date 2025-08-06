function createTransport() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const nodemailer = require('nodemailer');
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return { sendMail: async () => Promise.resolve() };
}

async function sendMail(options) {
  const transporter = createTransport();
  return transporter.sendMail(options);
}

module.exports = {
  createTransport,
  sendMail,
};
