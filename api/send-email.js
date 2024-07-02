// api/send-email.js
import nodemailer from 'nodemailer'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASSWORD, // Your Gmail password
      },
    })

    const mailOptions = {
      from: email,
      to: process.env.CONTACT_EMAIL, // Your email address where you want to receive messages
      subject: `Contact form submission from ${name}`,
      text: message,
    }

    try {
      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
      console.error('Error sending email:', error)
      res.status(500).json({ message: 'Error sending email', error })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
