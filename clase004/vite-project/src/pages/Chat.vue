<script>
import MainHeader from '../components/MainHeader.vue'

export default {
    name: 'Chat',
    components: {MainHeader}
}
</script>

<template>
    <section>
        <MainHeader>Chat</MainHeader>
        <div class="flex justify-between gap-4">
            <section class="w-9/12">
                <h2 class="sr-only">Lista de mensajes</h2>

                <div class=" border rounded p-4 min-h-[400px]">
                    <!--Mensajes-->
                </div>
            </section>
            <section class="w-3/12">
                <h2 class="font-bold text-xl mb-4">Enviar un mensaje</h2>
                <form action="">
                    <div class="mb-3">
                        <label
                            for="email"
                            class="block mb-2"
                        >Email</label>
                        <input
                            type="email"
                            id="email"
                            class="w-full p-2 border border-gray-300 rounded"
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