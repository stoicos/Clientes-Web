// Este archivo va a contener el router y su configuración.

import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Chat from "../pages/Chat.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

// Definimos el array de rutas.
const routes = [
    { path: '/',                component: Home, },
    { path: '/chat',            component: Chat, },
    { path: '/iniciar-sesion',  component: Login, },
    { path: '/registro',        component: Register, },
];

// Creamos el router, configurando las rutas y el sistema de historial que queremos usar.
const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

// Exportamos el router.
export default router;