import { transport } from "../config/nodemailer";

type EmailUser = {
  username: string;
  email: string;
  token: string;
};

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailUser) => {
    const email = await transport.sendMail({
      from: "CashTrack <admin@cashtrackr.com>",
      to: user.email,
      subject: "Confirm your email",
      html: `
            <h1>Welcome to our app</h1>
            <h3>Hello ${user.username}, please confirm your email</h3>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Click here to confirm</a>
            <p>insert token: ${user.token}</p>
        `,
    });
    console.log("Message sent: %s", email.messageId);
  };

  static sendPasswordResetEmail = async (user: EmailUser) => {
    const email = await transport.sendMail({
      from: "CashTrack <admin@cashtrackr.com>",
      to: user.email,
      subject: "Reset your password",
      html: `
            <h1>Password reset</h1>
            <h3>Hello ${user.username}, please reset your password</h3>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Click here to reset</a>
            <p>insert token: ${user.token}</p>
        `,
    });
    console.log("Message sent: %s", email.messageId);
  }
}

