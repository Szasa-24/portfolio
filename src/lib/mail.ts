import nodemailer from "nodemailer";

interface SendMailOptions {
  subject: string;
  text: string;
}

export async function sendNotificationEmail({ subject, text }: SendMailOptions) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn("Email credentials missing, skipping notification email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Értesítő" <${user}>`,
      to: user, // Send to the same address (Sándor's email)
      subject,
      text,
    });
    console.log("Email notification sent successfully.");
  } catch (error) {
    console.error("Failed to send email notification:", error);
  }
}
