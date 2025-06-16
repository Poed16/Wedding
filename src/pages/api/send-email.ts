
import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const { name, total, children, accommodation, menu, message } = req.body

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "RSVP Nou de la " + name,
      text: `
Nume: ${name}
Nr persoane: ${total}
Copii: ${children}
Cazare: ${accommodation}
Tip meniu: ${menu}
Mesaj: ${message || "–"}
      `
    })

    res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Eroare la trimiterea emailului." })
  }
}
