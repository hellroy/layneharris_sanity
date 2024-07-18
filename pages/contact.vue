<template>
    <div class="m-auto p-4 font-silkscreen mt-24">
        <div class="text-center font-headings text-layneYellow text-4xl">Contact me</div>
        <div class="bg-transparent m-auto mt-8 rounded-md xl:max-w-[40%] drop-shadow-[0_5px_5px_rgba(230,245,39,.8)] border text-white ">
            <div class="m-auto p-4">
                <form class="p-2" @submit.prevent="handleSubmit">
                    <div><label for="name">Name:</label></div>
                    <input class="text-layneBlue peer h-full mt-2 w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-0 focus:outline-0 focus-within:bg-white disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50" type="text" id="name" v-model="formData.name" required />
                    <br />
                    <div><label for="email">Email:</label></div>
                    <input class=" text-layneBlue peer h-full mt-2 w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-0 focus:outline-0 focus-within:bg-white disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50" type="email" id="email" v-model="formData.email" required />
                    <br />
                    <div><label class="align-top pr-4" for="message">Message:</label></div>
                    <textarea class="text-layneBlue peer h-full mt-2 min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-0 focus:outline-0 focus-within:bg-white disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50" id="message" v-model="formData.message" required></textarea>
                    <br />
                    <div class="p-4 text-center">
                        <button class="border px-4 m-auto hover:bg-layneYellow hover:text-layneDarkBlue" type="submit">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'

const formData = ref({
    name: '',
    email: '',
    message: ''
})

const router = useRouter()
const config = useRuntimeConfig()

const handleSubmit = async () => {
    try {
        const response = await fetch(config.public.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData.value)
        })

        if (response.ok) {
            router.push('/success')  // Redirect to the success page
        } else {
            alert('Failed to submit form')
        }
    } catch (error) {
        console.error('Error submitting form:', error)
        alert('An error occurred')
    }
}
</script>
