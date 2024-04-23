<script>
import Home from './pages/Home.vue'
import Chat from './pages/Chat.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';

export default {
    name: 'App',
    components: {Home, Chat, Login, Register},
}
</script>
<template>
    <div class="grid grid-rows-layout h-[100%]">
        <nav class="flex justify-between bg-slate-200 p-4 text-gray-900">
        <p>Dv Social</p>
        <ul class="flex gap-4">
            <li><router-link to="/">Inicio</router-link></li>
            <li><router-link to="/chat">Chat Público</router-link></li>
            <li><router-link to="/iniciar-sesion">Iniciar Sesión</router-link></li>
            <li><router-link to="/registro">Registro</router-link></li>
        </ul>
        </nav>
        <main class="container mx-auto p-4">
            <router-view />
        </main>
        <footer class="flex justify-center items-center h-footer bg-slate-900 text-white">
            <p>Copyright &copy; Marcelo Daniel Anavia 2024</p>
        </footer>
    </div>
</template>