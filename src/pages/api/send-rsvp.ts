import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { createClient } from '@supabase/supabase-js'

// ENV vars
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!
const emailTo = process.env.EMAIL_TO!
const emailUser = process.env.EMAIL_USER!
const emailPass = process.env.EMAIL_PASS!

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, guests, message } = req.body

  try {
    // 1. Salvează în Supabase
    const { error } = await supabase.from('rsvp').insert([{ name, email, guests, message }])
    if (error) throw error

    // 2. Trimite email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    await transporter.sendMail({
      from: `"Wedding RSVP" <${emailUser}>`,
      to: emailTo,
      subject: `RSVP de la ${name}`,
      text: `
      Nume: ${name}
      Email: ${email}
      Invitați: ${guests}
      Mesaj: ${message || '–'}
      `,
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: String(err) })
  }
}
