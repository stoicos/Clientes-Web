// Este archivo va a contener el router y su configuración.

import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Chat from "../pages/Chat.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import MyProfile from "../pages/MyProfile.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { subscribeToAuth } from "../services/auth";

// Definimos el array de rutas.
const routes = [
    { path: '/',                component: Home, },
    { path: '/chat',            component: Chat, },
    { path: '/iniciar-sesion',  component: Login, },
    { path: '/registro',        component: Register, },
    { path: '/perfil',          component: MyProfile, },
];

// Creamos el router, configurando las rutas y el sistema de historial que queremos usar.
const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

// Configuramos la restricción por estado de autenticación a nuestro router.
let authUser = {
    id: null,
    email: null,
}

subscribeToAuth(newUserData => authUser = newUserData);

router.beforeEach((to, from) => {
    console.log('[router] Navegando a la ruta... ', to.path);
    // Para acceder al chat, el usuario debe estar autenticado.
    if(authUser.id === null && to.path == '/chat') {
        return {
            path: '/iniciar-sesion',
        };
    }
});

// Exportamos el router.
export default router;