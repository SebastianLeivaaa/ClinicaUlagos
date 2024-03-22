import express from "express";
import { sendCodeEmail, sendConfirmReservationEmail} from "../src/utils/mailer.js";
import cors from 'cors';
import { generatorCode } from "../src/utils/generatorCode.js";
import postgres from "postgres";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";

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
app.use(cookieParser());
app.use(express.json());
const port = 3090;
app.use(cors());
const SENDER_EMAIL_ID = "clinicaulagos@gmail.com";


app.use(session({
  secret: 'secreto', 
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, 
    maxAge: 3500000
  },
}));

app.listen(port, async () => {
  try {
    console.log(`Server listening on port ${port}`);
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
});

app.post("/api/login", async (req, res) => {
  const { rutOrEmail, password } = req.body;
  const errors = {};

  try {
    const resultRutOrEmail = await sql`select paci_rut, paci_nombre, paci_apellido_pat, paci_apellido_mat, paci_correo, paci_fechanac, paci_telefono, paci_genero from paciente where paci_rut = ${rutOrEmail} or paci_correo = ${rutOrEmail}`;
    if(resultRutOrEmail.length > 0) {
      const user = await sql`SELECT PACI_NOMBRE, PACI_APELLIDO_PAT, PACI_APELLIDO_MAT, PACI_RUT, PACI_FECHANAC, PACI_CORREO, PACI_GENERO, PACI_TELEFONO FROM PACIENTE WHERE (paci_rut = ${rutOrEmail} OR PACI_CORREO = ${rutOrEmail}) AND PACI_CLAVE = ${password}`;
      if (user.length > 0) {
        req.session.user = user[0]; 
        console.log(req.session);
        res.send({user: user[0]});
  
      } else {
          errors.password = 'Clave incorrecta.';
          res.send({errors: errors});
      }
    } else {
        errors.rutOrEmail = 'Esta cuenta no existe en nuestro sistema.';
        res.send({errors: errors});
    }
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.get("/api/check-session", (req, res) => {
  console.log('estoy aca');
  console.log(req.session);
  try {
    if (req.session) {
      // Calcular el tiempo restante de la sesión
      console.log(req.session)
      const currentTime = new Date().getTime();
      const sessionExpireTime = req.session.cookie.expires.getTime();
      const sessionRemainingTime = sessionExpireTime - currentTime;

      if (sessionRemainingTime > 0) {
        res.send({ active: true, remainingTime: sessionRemainingTime });
      } else {
        res.send({ active: false });
      }
    } else {
      // No hay una sesión activa
      res.send({ active: false });
    }
  } catch (error) {
    console.error('Error al obtener las especialidades:', error);
    res.status(500).send('Error interno del servidor');
  }
});


// Ruta para acceder a los datos de sesión del usuario
app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'No se ha iniciado sesión' });
  }
});

app.post("/api/send-email", async (req, res) => {
  const { email } = req.body;
  

  try {
    if (SENDER_EMAIL_ID === "EMAIL_ID") {
      throw new Error(
        "Please update SENDER_EMAIL_ID with your email id in server.js"
      );
    }
    const code = generatorCode();
    const info = await sendCodeEmail(code, email);
    res.send({ info: info, code: code });
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/register-user", async (req, res) => {
  const { name, lastNamePat, lastNameMat, rut, dateBirth, email, password, gender, phone } = req.body;

  try {
    const result = await sql`insert into paciente(paci_nombre, paci_apellido_pat, paci_apellido_mat, paci_rut, paci_fechanac, paci_correo, paci_clave, paci_genero, paci_telefono) 
    values(${name}, ${lastNamePat}, ${lastNameMat}, ${rut}, ${dateBirth}, ${email}, ${password}, ${gender}, ${phone})`

    res.status(200).send('Registro insertado con éxito');
  } catch (err) {
    console.error('Error al insertar el registro:', err);
    res.status(500).send('Error al insertar el registro');
  }
});

app.post("/api/query-user-exists", async (req, res) => {
  const { rut, email, phone } = req.body;

  try {
    const resultRut = await sql`select * from paciente where paci_rut = ${rut}`;
    const resultEmail = await sql`select * from paciente where paci_correo = ${email}`;
    const resultPhone = await sql`select * from paciente where paci_telefono = ${phone}`

    res.send({infoRut: resultRut, infoEmail: resultEmail, infoPhone: resultPhone});
  } catch (error) {
    res.send(error);
  }
})

app.get("/api/get-specialties-professionals", async (req, res) => {
  try {
    const resultSpecialties = await sql`select * from especialidad`;
    const resultProfessional = await sql`SELECT pr.PROF_RUT, pr.PROF_NOMBRES, pr.PROF_APELLIDO_PAT, pr.PROF_APELLIDO_MAT, pr.PROF_ESP_CODIGO, es.ESPE_NOMBRE 
                                         FROM profesional pr 
                                         JOIN ESPECIALIDAD es ON pr.PROF_ESP_CODIGO = es.ESPE_CODIGO`;
    res.send({resultSpecialties: resultSpecialties, resultProfessional: resultProfessional});
  } catch (error) {
    console.error('Error al obtener las especialidades:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.post("/api/get-medicals-hours", async (req, res) => {
  const { codSpecialty, rutProfessional } = req.body;
  try {
    let resultMedicalHours;
    if (codSpecialty && rutProfessional) {
      resultMedicalHours = await sql`SELECT cm.CITA_ID, cm.CITA_PROF_RUT, cm.CITA_SALA_NUM, cm.CITA_DIS_FECHA, cm.CITA_DIS_HORA, 
                                      pr.PROF_RUT, pr.PROF_NOMBRES, pr.PROF_APELLIDO_PAT, pr.PROF_APELLIDO_MAT, es.ESPE_NOMBRE FROM CITA_MEDICA cm 
                                      JOIN PROFESIONAL pr ON cm.CITA_PROF_RUT = pr.PROF_RUT 
                                      JOIN ESPECIALIDAD es ON pr.PROF_ESP_CODIGO = es.ESPE_CODIGO 
                                      WHERE cm.cita_prof_rut = ${rutProfessional} 
                                      AND cm.cita_cod_especialidad = ${codSpecialty} 
                                      AND cm.CITA_DISPONIBLE = TRUE
                                      AND cm.CITA_DIS_FECHA >= CURRENT_DATE 
                                      ORDER BY cm.CITA_DIS_FECHA ASC, cm.CITA_DIS_HORA ASC, cm.CITA_PROF_RUT`;
    } else if (rutProfessional) {
      resultMedicalHours = await sql`SELECT cm.CITA_ID, cm.CITA_PROF_RUT, cm.CITA_SALA_NUM, cm.CITA_DIS_FECHA, cm.CITA_DIS_HORA, 
                                      pr.PROF_RUT, pr.PROF_NOMBRES, pr.PROF_APELLIDO_PAT, pr.PROF_APELLIDO_MAT, es.ESPE_NOMBRE FROM CITA_MEDICA cm 
                                      JOIN PROFESIONAL pr ON cm.CITA_PROF_RUT = pr.PROF_RUT 
                                      JOIN ESPECIALIDAD es ON pr.PROF_ESP_CODIGO = es.ESPE_CODIGO 
                                      WHERE cm.cita_prof_rut = ${rutProfessional} 
                                      AND cm.CITA_DISPONIBLE = TRUE
                                      AND cm.CITA_DIS_FECHA >= CURRENT_DATE 
                                      ORDER BY cm.CITA_DIS_FECHA ASC, cm.CITA_DIS_HORA ASC, cm.CITA_PROF_RUT`;
    } else if (codSpecialty) {
      resultMedicalHours = await sql`SELECT cm.CITA_ID, cm.CITA_PROF_RUT, cm.CITA_SALA_NUM, cm.CITA_DIS_FECHA, cm.CITA_DIS_HORA, 
                                      pr.PROF_RUT, pr.PROF_NOMBRES, pr.PROF_APELLIDO_PAT, pr.PROF_APELLIDO_MAT, es.ESPE_NOMBRE FROM CITA_MEDICA cm 
                                      JOIN PROFESIONAL pr ON cm.CITA_PROF_RUT = pr.PROF_RUT 
                                      JOIN ESPECIALIDAD es ON pr.PROF_ESP_CODIGO = es.ESPE_CODIGO
                                      WHERE pr.PROF_ESP_CODIGO = ${codSpecialty}
                                      AND CITA_DISPONIBLE = TRUE
                                      AND cm.CITA_DIS_FECHA >= CURRENT_DATE
                                      ORDER BY cm.CITA_DIS_FECHA ASC, cm.CITA_DIS_HORA ASC, cm.CITA_PROF_RUT`;
    } 
    res.json(resultMedicalHours);
  } catch (error) {
    console.error('Error al obtener las horas médicas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post("/api/confirm-reservation-by-guess", async (req, res) => {
  const { rut, name, lastNamePat, lastNameMat, dateBirth, email, gender, phone, reservationCode, nameProf, lastNamePatProf, lastNameMatProf, hourReservation, dateReservation, specialtyReservation} = req.body;
  try {
    const result = await sql`update cita_medica 
                              set cita_paci_rut = ${rut}, 
                              cita_disponible = false, 
                              cita_paci_nombre = ${name},
                              cita_paci_apellido_pat = ${lastNamePat},
                              cita_paci_apellido_mat = ${lastNameMat},
                              cita_paci_correo = ${email},
                              cita_paci_fechanac = ${dateBirth},
                              cita_paci_telefono = ${phone},
                              cita_paci_genero = ${gender}
                              where cita_id = ${reservationCode}
                              and cita_paci_rut is null
                              and cita_disponible = true
                              `;
    const info = await sendConfirmReservationEmail(email, reservationCode, name, lastNamePat, lastNameMat, dateReservation, nameProf, lastNamePatProf, lastNameMatProf, hourReservation, specialtyReservation);
    res.send({info: info});
  } catch (err) {
      console.error('Error al agendar la cita medica:', err);
      res.status(500).send('Error al agendar la cita medica');
    }
});

app.post("/api/confirm-reservation-by-user", async (req, res) => {
  const { rutOrEmail, password, reservationCode, nameProf, lastNamePatProf, lastNameMatProf, hourReservation, dateReservation, specialtyReservation} = req.body;
  const errors = {};
  try {
    const resultRutOrEmail = await sql`select paci_rut, paci_nombre, paci_apellido_pat, paci_apellido_mat, paci_correo, paci_fechanac, paci_telefono, paci_genero from paciente where paci_rut = ${rutOrEmail} or paci_correo = ${rutOrEmail}`;
    if(resultRutOrEmail.length > 0) {
      const resultConfirmPassword = await sql`select paci_rut, paci_nombre, paci_apellido_pat, paci_apellido_mat, paci_correo, paci_fechanac, paci_telefono, paci_genero from paciente where (paci_rut = ${rutOrEmail} or paci_correo = ${rutOrEmail}) AND paci_clave = ${password}`;
      if(resultConfirmPassword.length > 0){
        const rut = resultConfirmPassword[0].paci_rut;
        const name = resultConfirmPassword[0].paci_nombre;
        const lastNamePat = resultConfirmPassword[0].paci_apellido_pat;
        const lastNameMat = resultConfirmPassword[0].paci_apellido_mat;
        const email = resultConfirmPassword[0].paci_correo;
        const dateBirth = resultConfirmPassword[0].paci_fechanac;
        const phone = resultConfirmPassword[0].paci_telefono;
        const gender = resultConfirmPassword[0].paci_genero;

        const result = await sql`update cita_medica 
                              set cita_paci_rut = ${rut}, 
                              cita_disponible = false, 
                              cita_paci_nombre = ${name},
                              cita_paci_apellido_pat = ${lastNamePat},
                              cita_paci_apellido_mat = ${lastNameMat},
                              cita_paci_correo = ${email},
                              cita_paci_fechanac = ${dateBirth},
                              cita_paci_telefono = ${phone},
                              cita_paci_genero = ${gender}
                              where cita_id = ${reservationCode}
                              and cita_paci_rut is null
                              and cita_disponible = true
                              `;
        const info = await sendConfirmReservationEmail(email, reservationCode, name, lastNamePat, lastNameMat, dateReservation, nameProf, lastNamePatProf, lastNameMatProf, hourReservation, specialtyReservation);
        res.send({info: info});
      } else{
          errors.password = 'Clave incorrecta.';
          res.send({errors: errors})
      }
    }else{
        errors.rutOrEmail = 'Esta cuenta no existe en nuestro sistema.';
        res.send({errors: errors});
    }
  } catch (err) {
      console.error('Error al agendar la cita medica:', err);
      res.status(500).send('Error al agendar la cita medica');
    }
});


export default app;
