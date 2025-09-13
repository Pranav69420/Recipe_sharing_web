const nodemailer = require("nodemailer");

async function createTransporter() {
  // Create a test account and transporter for Ethereal
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

async function sendMail({ to, subject, html }) {
  const transporter = await createTransporter();
  const info = await transporter.sendMail({
    from: "Recipe App <no-reply@recipeapp.com>",
    to,
    subject,
    html,
  });
  return info;
}

module.exports = { sendMail };
