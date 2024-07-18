import { createClient } from '@sanity/client'
import nodemailer from 'nodemailer'
import { eventHandler, readBody } from 'h3'

// Configure Sanity client
const client = createClient({
  projectId: process.env.NUXT_SANITY_PROJECT_ID,
  dataset: process.env.NUXT_SANITY_DATASET,
  token: process.env.CONTACT_FORM_TOKEN, // Ensure you have a token that has write access
  useCdn: false,
  apiVersion: '2023-01-01', // Specify the API version
})

export default eventHandler(async (event) => {
  console.log('Function triggered')

  if (event.node.req.method !== 'POST') {
    console.log('Method not allowed')
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    }
  }

  try {
    const body = await readBody(event)
    console.log('Received body:', body)

    const { name, email, message } = body

    if (!name || !email || !message) {
      console.log('Missing fields')
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing fields' })
      }
    }

    const doc = {
      _type: 'contactForm',
      name,
      email,
      message
    }

    const result = await client.create(doc)
    console.log('Document created:', result)

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      subject: 'New Contact Form Submission',
      text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    })

    console.log('Email sent')

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully' })
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to submit form', error: error.message, stack: error.stack })
    }
  }
})
