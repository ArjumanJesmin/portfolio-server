import nodemailer from "nodemailer";
import prisma from "../../../shared/prisma";
import config from "../../../config";

const handleSendEmail = async (
  to: string,
  subject: string,
  message: string,
  html?: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.mail.email_user,
      pass: config.mail.email_pass,
    },
  });
  console.log(transporter);

  const mailOptions = {
    from: `"Your Name 👻"config.mail.email_user`,
    to,
    subject,
    text: message,
  };
  console.log(mailOptions);
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    await prisma.emailLog.create({
      data: {
        to,
        subject,
        message,
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

const sendEmailExample = async () => {
  const to = "recipient@example.com";
  const subject = "Hello ✔";
  const text = "Hello world?"; // Plain text body
  const html = "<b>Hello world?</b>"; // HTML body

  const result = await MailService.handleSendEmail(to, subject, text, html);
  console.log("Email sent:", result);
};
export const MailService = {
  handleSendEmail,
};
