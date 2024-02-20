import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const CLIENT_ID = "408137030572-17928cqrbmdds37vrnp85p9k1teb96ou.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//04uVMIgR5Mfo4CgYIARAAGAQSNwF-L9Ir8YyGQ4EvmVEc_yJPk2L9V7KethN-VqkSWA7ZUuFnCTlesmSHlN7h4ljexlcq9KTIREs";
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; //DONT EDIT THIS
const MY_EMAIL = "clinicaulagos@gmail.com";


const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendTestEmail = async (code, to) => {
  const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: MY_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
  const subject = 'Código de verificación'
  
  const html = `
    <p>Codigo de verificacion: ${code}</p>
    `;
  return new Promise((resolve, reject) => {
    transport.sendMail({ from: MY_EMAIL, subject: subject, to: to, html }, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};

export default sendTestEmail;
