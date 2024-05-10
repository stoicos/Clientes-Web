<script>
import MainH1 from '../components/MainH1.vue';
import { login } from '../services/auth';

export default {
    name: 'Login',
    components: {MainH1},
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            loading: false,
        };
    },
    methods: {
        async handleSubmit() {
            this.loading = true;
            try {
                await login(this.user.email, this.user.password);
                this.$router.push({
                    path: '/perfil',
                });
            } catch (error) {
                   // TODO: Manejar el error.
            }
            this.loading = false;
        }
    }
}
</script>

<template>
    <MainH1>Iniciar Sesión</MainH1>

<form 
    action="#"
    @submit.prevent="handleSubmit"
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
            :disabled="loading"
            v-model="user.email"
        >
    </div>
    <div class="mb-3">
        <label 
            for="password"
            class="block mb-2"
        >Contraseña</label>
        <input
            type="password"
            id="password"
            class="w-full p-2 border border-gray-300 rounded disabled:bg-gray-100"
            :disabled="loading"
            v-model="user.password"
        >
    </div>
    <button 
        type="submit" 
        class="transition-all w-full px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 active:bg-blue-800 disabled:bg-blue-200 text-white disabled:black"
    >
        Ingresar
    </button>
</form>
</template>