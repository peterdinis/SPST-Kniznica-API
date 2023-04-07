import MailGen from "mailgen";
import * as sgMail from "@sendgrid/mail";
import fs from "fs";
import { getErrorMessage } from "./catchErrorMessage";

const mailGenerator = new MailGen({
  theme: "salted",
  product: {
    name: "Awesome App",
    link: "http://example.com",
  },
});

const email = {
  body: {
    name: "Jon Doe",
    intro: "Welcome to email verification",
    action: {
      instructions: "Please click the button below to verify your account",
      button: {
        color: "#33b5e5",
        text: "Verify account",
        link: "http://example.com/verify_account",
      },
    },
  },
};

const emailTemplate = mailGenerator.generate(email);

const msg = {
  to: "pdinis1@gmail.com",
  from: "spst-kniznica@gmail.com",
  subject: "Test verification email",
  html: emailTemplate,
};

fs.writeFileSync("preview.html", emailTemplate, "utf8");

export const sendMail = async () => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as unknown as string);
    return sgMail.send(msg);
  } catch (error) {
    getErrorMessage(error);
  }
};
