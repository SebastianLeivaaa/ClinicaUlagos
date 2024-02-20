import express from "express";
import sendTestEmail from "../src/utils/mailer.js";
import cors from 'cors';
import { generatorCode } from "../src/utils/generatorCode.js";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

const app = express();
app.use(express.json());
const port = 3090;
app.use(cors());
const SENDER_EMAIL_ID = "clinicaulagos@gmail.com";

app.post("/api/send-email", async (req, res) => {
  const { email } = req.body;

  try {
    if (SENDER_EMAIL_ID === "EMAIL_ID") {
      throw new Error(
        "Please update SENDER_EMAIL_ID with your email id in server.js"
      );
    }
    const code = generatorCode();
    const info = await sendTestEmail(code, email);
    res.send({ info: info, code: code });
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/register-user", async (req, res) => {
  const { name, lastNamePat, lastNameMat, rut, dateBirth, email, password, gender, phone } = req.body;

  const insertQuery = `INSERT INTO PACIENTE(PACI_NOMBRE, PACI_APELLIDO_PAT, PACI_APELLIDO_MAT, PACI_RUT, PACI_FECHANAC, PACI_CORREO, PACI_CLAVE, PACI_GENERO, PACI_TELEFONO)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

  try {
    const result = await sql`insert into paciente(paci_nombre, paci_apellido_pat, paci_apellido_mat, paci_rut, paci_fechanac, paci_correo, paci_clave, paci_genero, paci_telefono) 
    values(${name}, ${lastNamePat}, ${lastNameMat}, ${rut}, ${dateBirth}, ${email}, ${password}, ${gender}, ${phone})`

  } catch (err) {
    console.error('Error al insertar el registro:', err);
  }
});

app.listen(port, async () => {
  try {
    console.log(`Server listening on port ${port}`);
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
});

export default app;
