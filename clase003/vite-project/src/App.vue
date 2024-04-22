<script>
import Home from './pages/Home.vue'

export default {
    name: 'App',
    components: {Home},
}
</script>
<template>
    <nav class="flex justify-between bg-slate-200 p-4 text-gray-900">
        <p>Dv Social</p>
        <ul class="flex gap-4">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Chat Público</a></li>
            <li><a href="#">Iniciar Sesión</a></li>
            <li><a href="#">Registro</a></li>
        </ul>
    </nav>
    <main>
        <Home />
    </main>
    <footer>
        <p>Copyright &copy; Marcelo Daniel Anavia 2024</p>
    </footer>
</template>