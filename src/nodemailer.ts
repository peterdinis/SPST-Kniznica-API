import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL as unknown as string,
    pass: process.env.PASSWORD as unknown as string
  },
});
