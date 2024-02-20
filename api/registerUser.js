import app from './index.js'

app.post("/api/register-user", async (req, res) => {
    const { name, lastNamePat, lastNameMat, rut, dateBirth, email, password, gender, phone } = req.body;
  
    const insertQuery = `INSERT INTO PACIENTE(PACI_NOMBRE, PACI_APELLIDO_PAT, PACI_APELLIDO_MAT, PACI_RUT, PACI_FECHANAC, PACI_CORREO, PACI_CLAVE, PACI_GENERO, PACI_TELEFONO)
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
  
    try {
      const result = await sql`insert into paciente(paci_nombre, paci_apellido_pat, paci_apellido_mat, paci_rut, paci_fechanac, paci_correo, paci_clave, paci_genero, paci_telefono) 
      values(${name}, ${lastNamePat}, ${lastNameMat}, ${rut}, ${dateBirth}, ${email}, ${password}, ${gender}, ${phone})`
  
      res.status(200).send('Registro insertado con éxito');
    } catch (err) {
      console.error('Error al insertar el registro:', err);
      res.status(500).send('Error al insertar el registro');
    }
  });
  