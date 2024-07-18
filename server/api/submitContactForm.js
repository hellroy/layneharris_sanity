import { readBody } from 'h3'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NUXT_SANITY_PROJECT_ID,
  dataset: process.env.NUXT_SANITY_DATASET,
  token: process.env.CONTACT_FORM_TOKEN, // Ensure you have a token that has write access
  useCdn: false,
  apiVersion: '2023-01-01', // Specify the API version
})

export default defineEventHandler(async (event) => {
  console.log('Function triggered')

  if (event.node.req.method !== 'POST') {
    console.log('Method not allowed')
    return {
      statusCode: 405,
      body: { message: 'Method not allowed' }
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
        body: { message: 'Missing fields' }
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

    return {
      statusCode: 200,
      body: { message: 'Form submitted successfully' }
    }
  } catch (error) {
    console.error('Error creating document:', error)
    return {
      statusCode: 500,
      body: { message: 'Failed to submit form', error: error.message, stack: error.stack }
    }
  }
})
