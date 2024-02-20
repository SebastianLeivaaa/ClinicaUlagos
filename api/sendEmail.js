import app from './index.js'
import { generatorCode } from "../src/utils/generatorCode.js";
import sendTestEmail from "../src/utils/mailer.js";

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