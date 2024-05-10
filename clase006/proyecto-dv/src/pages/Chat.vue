<script>
import Loader from '../components/Loader.vue';
import MainH1 from '../components/MainH1.vue';
import { saveMessage, subscribeToChatMessages } from '../services/chat';

// Simulamos los mensajes de chat.
// const defaultMessages = [
//     {
//         email: 'sara@za.com',
//         content: '¡Hola mundo!',
//     },
//     {
//         email: 'pepe@trueno.com',
//         content: 'hola, q tal?',
//     },
//     {
//         email: 'sara@za.com',
//         content: 'Hola Pepe. ¿Cómo andás?',
//     },
// ];

export default {
    name: 'Chat',
    components: {MainH1, Loader},
    // data() {
    data: function() {
        return {
            newMessage: {
                email: '',
                content: '',
            },
            sendingMessage: false,
            messages: [],
            messagesLoaded: false,
        }
    },
    methods: {
        sendMessage() {
            this.sendingMessage = true;

            saveMessage({
                email: this.newMessage.email,
                content: this.newMessage.content,
            }).then(() => this.sendingMessage = false);
            this.newMessage.content = "";
        },
        /**
         * 
         * @param {Date} date 
         */
        formatDate(date) {
            // console.log("El valor que recibimos es: ", date)
            // Transformamos el objeto Date a una fecha con formato AAAA-MM-DD HH:mm:ss
            
            return Intl.DateTimeFormat('es', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
            }).format(date).replace(',', '');
        },
    },
    // Seteamos el mounted para cargar los mensajes iniciales.
    mounted() {
        // this.messages = defaultMessages;
        // Nos suscribimos para ser notificados de los cambios en los mensajes.
        subscribeToChatMessages(newMessages => {
            this.messages = newMessages;
            this.messagesLoaded = true;
        });
    }
}
</script>

<template>
    <section>
        <MainH1>Chat Global de DV</MainH1>
        
        <div class="flex gap-8 justify-between">
            <section class="w-9/12">
                <h2 class="sr-only">Lista de Mensajes</h2>

                <div 
                    class="border rounded p-4 min-h-[400px]"
                >
                    <ul 
                        v-if="messagesLoaded"
                    >
                        <li v-for="message in messages">
                            <p><b>{{ message.email }} dijo:</b></p>
                            <p>{{ message.content }}</p>
                            <p>{{ formatDate(message.created_at) }}</p>
                        </li>
                    </ul>
                    <Loader 
                        v-else 
                    />
                </div>
            </section>
            <section class="w-3/12">
                <h2 class="text-xl mb-4">Enviar un Mensaje</h2>
                <form 
                    action="#"
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
                            class="w-full p-2 border border-gray-300 rounded disabled:bg-gray-100"
                            :disabled="sendingMessage"
                            v-model="newMessage.email"
                        >
                    </div>
                    <div class="mb-3">
                        <label 
                            for="message"
                            class="block mb-2"
                        >Mensaje</label>
                        <textarea 
                            id="message"
                            class="w-full p-2 border border-gray-300 rounded disabled:bg-gray-100"
                            :disabled="sendingMessage"
                            v-model="newMessage.content"
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        class="transition-all w-full px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 active:bg-blue-800 disabled:bg-blue-200 text-white disabled:black"
                        :disabled="sendingMessage"
                    >
                        <template   v-if="!sendingMessage">Enviar</template>
                        <Loader     v-else />
                    </button>
                </form>
            </section>
        </div>
    </section>
</template>