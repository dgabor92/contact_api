import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

app.get("/", (req, res) => {
  res.send("Üdvözlünk az API-ban!");
});

app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.MAIL_USER,
      subject: "Kapcsolatfelvétel az oldalról",
      text: message,
    });

    res.status(200).json({ success: true, message: "Sikeresen elküldve" });
  } catch (err) {
    console.error("Emailküldési hiba:", err);
    res.status(500).json({ success: false, error: "Nem sikerült elküldeni" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Szerver fut: http://localhost:${process.env.PORT}`);
});
