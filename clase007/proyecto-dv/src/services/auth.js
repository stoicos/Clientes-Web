import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

const EMPTY_USER_DATA = {
    id: null,
    email: null,
}

// Definimos la variable para los datos del usuario (el "subject" de nuestro observer).
let userData = EMPTY_USER_DATA;

// Definimos la variable para los observers.
let observers = [];

// Actualizamos el estado del usuario dependiendo de su estado en Firestore Authentication.
onAuthStateChanged(auth, user => {
    if(user) {
        userData = {
            id: user.uid,
            email: user.email,
        }
    } else {
        userData = EMPTY_USER_DATA;
    }
    // Notificamos a los observers de los datos del usuario.
    notifyAll();
});

/**
 * Crea una cuenta de usuario, y lo autentica.
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<void>}
 */
export function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            console.log("Usuario creado. ID: ", userCredentials.user.uid);
        })
        .catch(error => {
            console.error("[auth.js register] Error al crear una cuenta: ", error.code);
            throw error;
        });
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<void>}
 */
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            console.log("Usuario autenticado. ID: ", userCredentials.user.uid);
        })
        .catch(error => {
            console.error("[auth.js login] Error al crear una cuenta: ", error.code);
            throw error;
        });
}

/**
 * 
 * @returns {Promise<void>}
 */
export function logout() {
    return signOut(auth);
}


/*-------------------------------------------------------------------------
| Implementación de Observer para el estado de autenticación
+--------------------------------------------------------------------------
| Para informar el estado de autenticación al proyecto (ej: los componentes,
| el router, etc), vamos a hacer nuestra propia implementación del patrón de
| diseño Observer.
|
| ¿Cómo es el patrón Observer?
| El patrón Observer nos permite aplicar una estrategia donde múltiples 
| elementos del sistema (los "observers") necesitan enterarse de los cambios
| o eventos ocurridos en otro elemento (el "subject").
|
| En nuestro caso puntual, el "subject" va a ser una variable "userData" que
| vamos a definir en este servicio y va a contener los datos del usuario
| autenticado.
| Luego, vamos a definir otra variable llamada "observers" que va a ser un
| array que guarde los callbacks (los "observers") que piden ser notificados
| de los cambios en "userData".
|
| Finalmente, vamos a crear una función "subscribeToAuth" que reciba un
| callback/observer, que se va a guardar en el array, y se le va a notificar
| el estado de autenticación del usuario.
|
| Nota: El proceso de agregar un observer se suele llamar "suscripción".
| Aunque también lo pueden ver llamado "listen", "watch" o "attach".
+--------------------------------------------------------------------------*/
/**
 * Suscribe un observer (el callback) para la autenticación.
 * Este callback va a ejecutarse cada vez que el estado cambie, y cuando se
 * suscribe.
 * 
 * @param {() => {}} callback 
 */
export function subscribeToAuth(callback) {
    // TODO: Cancelación de suscripción.
    // Agregamos el callback al stack de observers.
    observers.push(callback);

    // Le notificamos los datos actuales.
    notify(callback);
}

/**
 * Notifica a un observer de los datos actuales del usuario.
 * 
 * @param {() => {})} observer 
 */
function notify(observer) {
    observer({...userData});
}

/**
 * Notifica a todos los observers.
 * 
 * Esta función debe invocarse cada vez que la variable userData cambie.
 */
function notifyAll() {
    observers.forEach(observer => notify(observer));
}