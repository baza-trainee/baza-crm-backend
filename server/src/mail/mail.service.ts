import nodemailer from 'nodemailer';
import { ILetter } from './mail.types';

const {
  SMTP_PASSWORD,
  SMTP_USER,
  BASE_URL,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_HOST,
  SMTP_FROM,
} = process.env;

const nodemailerConfig = {
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Boolean(SMTP_SECURE),
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (letter: ILetter) =>
  await transporter.sendMail({ ...letter, from: SMTP_FROM });

export const sendVerificationEmail = async (email: string, link: string) => {
  const letter = {
    to: email,
    subject: 'Verify email',
    html: `<h2>Hi, ${email}.</h2>
    <p>We just need to verify your email address before you can access.</p>
    <p>Click below to verify your email address</p>
    <a target="_blank" href="${BASE_URL}${link}">Click here</a> 
    <p>Regards, Baza Trainee Ukraine</p>
    <p>Thanks!</p>
`,
  };

  await sendEmail(letter);
  console.log('success');
};

export const sendChangePWEmail = async (email: string, link: string) => {
  const letter = {
    to: email,
    subject: 'Change password',
    html: `<h2>Hi, ${email}.</h2>
    <a target="_blank" href="${BASE_URL}${link}">Click here</a>
    <p>Regards, Baza Trainee Ukraine</p>
    <p>Thanks!</p>`,
  };

  try {
    await sendEmail(letter);
    console.log('success');
  } catch (error) {
    throw new Error();
  }
};
