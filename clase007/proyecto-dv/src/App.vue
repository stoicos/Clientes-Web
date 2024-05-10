<script>
import { onAuthStateChanged } from 'firebase/auth';
import Home from './pages/Home.vue';
import { auth } from './services/firebase';
import { logout, subscribeToAuth } from './services/auth';

export default {
    name: 'App',
    components: {Home},
    data() {
        return {
            authUser: {
                id: null,
                email: null,
            }
        };
    },
    methods: {
        handleLogout() {
            logout();
            this.$router.push({
                path: '/iniciar-sesion',
            });
        }
    },
    mounted() {
        // Pedimos ser informados del estado de autenticación del usuario.
        subscribeToAuth(newUserData => this.authUser = newUserData);
    }
}
</script>

<template>
    <!-- <div class="grid grid-rows-[60px_1fr_100px] h-full"> -->
    <div class="grid grid-rows-layout h-full">
        <!-- Los [] en las clases de Tailwind representan un valor arbitrario. Es decir, podemos asignar cualquier valor que
        queramos al estilo, y Tailwind va a generar una clase para el mismo.
        Están pensados para estilos "one-off", es decir, que se usan una única vez en el proyecto. -->
        <nav class="flex justify-between h-[60px] bg-slate-300 p-4 text-gray-900">
            <p>DV Social</p>
            <ul class="flex gap-4">
                <li><router-link to="/">Inicio</router-link></li>
                <template v-if="authUser.id === null">
                    <li><router-link to="/iniciar-sesion">Iniciar Sesión</router-link></li>
                    <li><router-link to="/registro">Registro</router-link></li>
                </template>
                <template v-else>
                    <li><router-link to="/chat">Chat Público</router-link></li>
                    <li><router-link to="/perfil">Mi Perfil</router-link></li>
                    <li>
                        <form action="#" @submit.prevent="handleLogout">
                            <button type="submit">{{ authUser.email }} (Cerrar Sesión)</button>
                        </form>
                    </li>
                </template>
            </ul>
        </nav>
        <main class="container p-4 mx-auto">
            <router-view />
        </main>
        <footer class="flex justify-center items-center h-footer bg-slate-900 text-white">
            <p>Copyright &copy; Da Vinci 2024</p>
        </footer>
    </div>
</template>