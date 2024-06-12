import nodemailer from 'nodemailer';
import { ILetter } from './mail.types';
import getConfigValue from '../config/config';

const nodemailerConfig = {
  host: getConfigValue('SMTP_HOST'),
  port: getConfigValue('SMTP_PORT'),
  secure: getConfigValue('SMTP_SECURE'),
  auth: {
    user: getConfigValue('SMTP_USER'),
    pass: getConfigValue('SMTP_PASSWORD'),
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const BASE_URL = getConfigValue('BASE_URL');

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (letter: ILetter) =>
  await transporter.sendMail({ ...letter, from: getConfigValue('SMTP_FROM') });

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

  try {
    await sendEmail(letter);
    console.log('success');
  } catch (error) {
    console.error(error);
    throw new Error('Sorry, your message was not sent');
  }
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
    console.error(error);
    throw new Error('Sorry, your message was not sent');
  }
};
