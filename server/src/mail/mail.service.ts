import nodemailer from 'nodemailer';

const { PASSWORD_EMAIL, USER_EMAIL } = process.env;

const nodemailerConfig = {
  host: 'smtp.ukr.net', // change
  port: 465,
  secure: true,
  auth: {
    user: USER_EMAIL,
    pass: PASSWORD_EMAIL,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data: any) =>
  await transporter.sendMail({ ...data, from: USER_EMAIL });

export const sendVerificationEmail = async (email: string) => {
  const letter = {
    to: email,
    subject: 'Verify email',
    html: `<h2>Hi ${email},</h2>
    <p>We just need to verify your email address before you can access.</p>
    <p>Click below to verify your email address</p>
    <a target="_blank" href="">Click here</a>
    <p>Thanks!</p>`, // change
  };
  await sendEmail(letter);
  console.log("success");
};

export const sendChangePWEmail = async (email: string) => {
  const letter = {
    to: email,
    subject: 'Change password',
    html: `<a target="_blank" href="">Click here</a>`, // change
  };
  await sendEmail(letter);
    console.log('success');

};


