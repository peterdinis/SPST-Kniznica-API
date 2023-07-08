import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

export class EmailService {
  private transporter: nodemailer.Transporter;
  private prisma: PrismaClient;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // Configure the SMTP settings for your email provider
      service: "Gmail",
      auth: {
        user: process.env.EMAIL as unknown as string,
        pass: process.env.PASSWORD as unknown as string
      },
    });

    this.prisma = new PrismaClient();
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    const emailData = {
      to,
      subject,
      text: content,
    };

    try {
      // Send the email using Nodemailer
      await this.transporter.sendMail(emailData);

      // Save the email to the database
      await this.prisma.email.create({
        data: {
          to,
          subject,
          content,
          status: "sent",
        },
      });

      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);

      // Save the email to the database with the error status
      await this.prisma.email.create({
        data: {
          to,
          subject,
          content,
          status: "error",
        },
      });
    }
  }
}