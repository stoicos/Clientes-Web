<script>
import Home from './pages/Home.vue';

export default {
    name: 'App',
    components: {Home},
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
                <li><router-link to="/chat">Chat Público</router-link></li>
                <li><router-link to="/iniciar-sesion">Iniciar Sesión</router-link></li>
                <li><router-link to="/registro">Registro</router-link></li>
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