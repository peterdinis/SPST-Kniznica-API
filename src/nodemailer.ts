import nodemailer from "nodemailer";

// Create a transporter object using SMTP transport
export const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // Set to true if using a secure connection (TLS/STARTTLS)
  auth: {
    user: "your_email@example.com",
    pass: "your_password",
  },
});
