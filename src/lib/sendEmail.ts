import nodemailer from "nodemailer";

/* ================= RESET PASSWORD EMAIL ================= */

export async function sendResetEmail(
  to: string,
  resetLink: string
) {
  if (!to) {
    throw new Error("Recipient email missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Reset your password",
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

/* ================= EMAIL VERIFICATION ================= */

export async function sendVerificationEmail(
  to: string,
  verifyLink: string
) {
  if (!to) {
    throw new Error("Recipient email missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Verify your email address",
    html: `
      <p>Welcome to Aurindel!</p>
      <p>Please verify your email to activate your account:</p>
      <p>
        <a href="${verifyLink}">
          Verify Email
        </a>
      </p>
      <p>If you did not create this account, you can ignore this email.</p>
    `,
  });
}
