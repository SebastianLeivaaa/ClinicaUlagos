import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { formatDate } from "./formatedDate.js";

const CLIENT_ID = "408137030572-17928cqrbmdds37vrnp85p9k1teb96ou.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//04Svmv-u7vP98CgYIARAAGAQSNwF-L9Irk89qC6ldH5NAwx5LCVnz5dtz7-WGdO8h-D6NY_cwmfLZDNAdoyvMrjYfLT1qaQ_QK8k";
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; //DONT EDIT THIS
const MY_EMAIL = "clinicaulagos@gmail.com";


const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendCodeEmail = async (code, to) => {
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

export const sendConfirmReservationEmail = async (email, reservationCode, name, lastNamePat, lastNameMat, date, nameProf, lastNamePatProf, lastNameMatProf, hour, specialty ) => {
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
  const subject = 'Confirmación de reserva';

  const html = `
  <div style="margin: 0 auto">
    <div style="width: 600px; background-color: #f9fafb; margin: 0 auto;">
      <div style="background-image: linear-gradient(to bottom, #1747b6, #348fff); padding: 6px; text-align: center">
        <h1 style="color: #ffffff; font-weight: bold;">¡Hora Reservada!</h1>
      </div>
      <div style="margin-top: 20px;  padding: 30px;">
        <div>
          <p style="color:#142857; font-weight: bold; font-size: 24px;">Estimado(a) ${name} ${lastNamePat} ${lastNameMat}</p>
          <p style="margin-bottom: 10px; color:#142857;">Te informamos que tu reserva en <span style="font-weight: bold;">Clínica Ulagos</span> ha sido exitosa.</p>
        </div>
        <table width="500" cellspacing="0" cellpadding="12" align="center" style="border:2px solid #f3f4f6; margin-top: 60px;">
          <tbody>
            <tr>
              <th style="background-color:#288ff9;color:#f3f4f6;text-align:center;font-size:16px;font-weight:600;font-family:Montserrat,sans-serif" colspan="2">
                ${formatDate(date)} a las ${hour} horas
              </th>
            </tr>
            <tr style="background-color:#f3f4f6;font-family:Montserrat,sans-serif;color:#6b7280">
              <td><strong>Profesional</strong></td>
              <td>${nameProf} ${lastNamePatProf} ${lastNameMatProf}</td>
            </tr>
            <tr style="background-color:white;font-family:Montserrat,sans-serif;color:#6b7280">
              <td><strong>Especialidad</strong></td>
              <td>${specialty}</td>
            </tr>
            <tr style="background-color:#f3f4f6;font-family:Montserrat,sans-serif;color:#6b7280">
              <td><strong>Codigo de tu reserva: </strong></td>
              <td><strong>${reservationCode}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style="margin-bottom: 0px; text-align:center;">Atentamente: </p>
      <p style="font-weight: bold; margin-top: 5px; text-align:center;">Clinica Ulagos</p>
    </div>
  </div>
`;

  return new Promise((resolve, reject) => {
    transport.sendMail({ from: MY_EMAIL, subject: subject, to: email, html }, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
}
