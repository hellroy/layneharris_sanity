<template>
    <div class="contact-form">
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">Name</label>
          <input v-model="form.name" type="text" id="name" required />
        </div>
        <div>
          <label for="email">Email</label>
          <input v-model="form.email" type="email" id="email" required />
        </div>
        <div>
          <label for="message">Message</label>
          <textarea v-model="form.message" id="message" required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useNuxtApp } from '#app'
  
  const form = ref({
    name: '',
    email: '',
    message: '',
  })
  
  const { $sanityClient } = useNuxtApp()
  
  const handleSubmit = async () => {
    try {
      // Validate the form data
      if (!form.value.name || !form.value.email || !form.value.message) {
        alert('All fields are required.')
        return
      }
  
      // Send the data to Sanity
      await $sanityClient.create({
        _type: 'contactForm',
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
      })
  
      // Send the data via email
      await sendEmail(form.value)
  
      alert('Your message has been sent.')
      form.value = { name: '', email: '', message: '' }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your form.')
    }
  }
  
  const sendEmail = async (formData) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message)
    } catch (error) {
      console.error('Error sending email:', error)
      alert('There was an error sending your email.')
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  