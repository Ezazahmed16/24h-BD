import nodemailer from "nodemailer";

export async function sendEmail(emailTo, emailText, emailSubject) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOption = {
    from: "Next js News portal <info@monir.com>",
    to: emailTo,
    subject: emailSubject,
    text: emailText,
  };
  return await transporter.sendMail(mailOption);
}
