import nodemailer from "nodemailer";

export async function sendResetEmail(
  to: string,
  resetLink: string
) {
  if (!to) {
    throw new Error("Recipient email missing");
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER, //  MUST be plain email
    to,                             //  user.email
    subject: "Reset your password",
    text: `Reset your password using this link: ${resetLink}`,
    html: `
      <p>You requested a password reset.</p>
      <p>
        <a href="${resetLink}">
          Click here to reset your password
        </a>
      </p>
      <p>This link expires in 15 minutes.</p>
    `,
  });
}
