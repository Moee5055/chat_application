import nodemailer from "nodemailer";
import { google } from "googleapis";

const CLIENT_ID = process.env.OAUTH_CLIENT_ID!;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN!;
const USER_EMAIL = process.env.MAIL_USERNAME!;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground",
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendVerificationToken(code: string, email: string) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: USER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token, // ✅ very important
      },
    });

    const mailOptions = {
      from: `"ChatWave Support" <${USER_EMAIL}>`,
      to: email,
      subject: "Your ChatApp Verification Code",
      text: `Hi there,

    Thanks for signing up for ChatApp!

    To verify your email address, please enter the following verification code:

    ${code}

    This code will expire in 10 minutes. If you didn't request this, you can safely ignore this email.

    – The ChatApp Team`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", result);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}
