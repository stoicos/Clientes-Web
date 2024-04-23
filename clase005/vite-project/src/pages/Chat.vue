<script>
import MainHeader from '../components/MainHeader.vue';
import { saveMessage, suscribeToChatMessages } from '../services/chat';

export default {
    name: 'Chat',
    components: {MainHeader},
    data() {
        return {
            formMessage: {
                email: '',
                content: '',
            },
            messages: [],
        }
    },
    methods: {
        sendMessage() {
                saveMessage({
                    email: this.formMessage.email,
                    content: this.formMessage.content,
                })
            this.formMessage.content = "";
        }
    },
    mounted() {
        suscribeToChatMessages(newMessages => this.messages = newMessages)
    },

}
</script>

<template>
    <section>
        <MainHeader>Chat</MainHeader>

        <div class="flex justify-between gap-4">
            <section class="w-9/12">
                <h2 class="sr-only">Lista de mensajes</h2>

                <ul class=" border rounded p-4 min-h-[400px]">
                    <li v-for="message in messages">
                        <p><b>{{ message.email }} dijo:</b></p>
                        <p>{{ message.content }}</p>
                    </li>
                </ul>
            </section>
            <section class="w-3/12">
                <h2 class="font-bold text-xl mb-4">Enviar un mensaje</h2>
                <form
                    action=""
                    @submit.prevent="sendMessage"
                >
                    <div class="mb-3">
                        <label
                            for="email"
                            class="block mb-2"
                        >Email</label>
                        <input
                            type="email"
                            id="email"
                            class="w-full p-2 border border-gray-300 rounded"
                            v-model="formMessage.email"
                        >
                    </div>
                    <div class="mb-3">
                        <label
                            for="message"
                            class="block mb-2"
                        >Message</label>
                        <textarea
                            id="message"
                            class="w-full p-2 border border-gray-300 rounded"
                            v-model="formMessage.content"
                        ></textarea>

                    </div>
                    <button
                        type="submit"
                        class="transition-all w-full py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded"
                    >Enviar</button>
                </form>
            </section>
        </div>
    </section>
</template>