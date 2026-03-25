import nodemailer from "nodemailer";

const createTransporter = () => {
  const provider = process.env.EMAIL_PROVIDER;

  // Gmail (current)
  if (provider === "gmail") {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // AWS SES (future)
  if (provider === "ses") {
    return nodemailer.createTransport({
      host: process.env.SES_HOST,
      port: process.env.SES_PORT,
      secure: false,
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });
  }

  throw new Error("Invalid EMAIL_PROVIDER");
};

// 2️⃣ Send email (generic)
export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
};


export const verifyEmailConnection = async () => {
  try {
    const transporter = createTransporter();

    await transporter.verify();

    console.log("Email server is ready to send messages");
  } catch (error) {
    console.error("Email configuration failed:", error.message);
  }
};