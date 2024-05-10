// Acá vamos a definir todas las funciones que tengan que ver con el chat público global.
// Trabajar con archivos de "servicios" (o similar) es una práctica muy común.
// El servicio publica funciones que pueden realizar las acciones que queremos proveer.
// Los componentes, otros servicios o cualquier otra parte de nuestro código, pueden luego
// invocar a estas funciones.
// Esto tiene algunos beneficios:
// - Nos permite respetar el Principio de Responsabilidad Única (Single-Responsibility Principle).
//  El SRP nos dice que un elemento del sistema (clase, biblioteca, componente, etc) debe tener una
//  única responsabilidad. O dicho más específicamente, una "única razón para cambiar".
// - Esto permite una separación más clara del código. Por ejemplo, si queremos cambiar algo
//  de cómo se presenta la información en la interfaz, sabemos que tenemos que mirar el 
//  componente. Si cambia algo de cómo se guardan o se consumen los datos del backend, entonces
//  tocaremos el servicio.
// - Esto a su vez facilita lo que es el testing del código.
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Graba un mensaje de chat.
 * 
 * @param {{email: string, content: string}} data 
 * @returns {Promise<null>}
 */
export function saveMessage(data) {
    // Obtenemos la referecia a la collection del chat donde queremos grabar el mensaje.
    const refChat = collection(db, 'chat');

    return addDoc(refChat, {
        ...data,
        // Agregamos la fecha de creación del mensaje.
        // Para asegurarnos de que todos los usuarios del chat se manejen con una única fecha,
        // vamos a pedirle al servidor de Firestore que genere la fecha.
        // La función serverTimestamp() nos va a servir para esto.
        created_at: serverTimestamp(),
    })
        .then(doc => {
            // Esto por ahora queda vacío. Solo está para eliminar la referecia del documento del retorno.
        });
}

/**
 * Ejecuta el callback cada vez que los mensajes de chat cambien.
 * El callback va a recibir como argumento la nueva lista de mensajes.
 * 
 * @param {(messages: {email: string, content: string}[]) => null} callback 
 */
export function subscribeToChatMessages(callback) {
    const refChat = collection(db, 'chat');

    // Nosotros queremos tener los mensajes ordenados por su fecha de creación. Cosa de que
    // los más nuevos vengan al final.
    // Para agregar cualquier tipo de requerimiento a una collection al consultarla, necesitamos
    // usar un "query".
    // Los queries permiten definir la lista de requisitos que deben aplicarse para traer los
    // resultados que se buscan.
    // Por ejemplo, vamos a crear un query que busque en la collection de chat (que recién
    // definimos la referencia) y pedirle que los resultados vengan ordenados por fecha de
    // creación.
    const q = query(refChat, orderBy('created_at'));

    // Seteamos una "subscripción" para "escuchar" (es decir, ser notificados) cada vez que 
    // haya cambios en los mensajes.
    // onSnapshot es la función que queremos usar.
    // Recibe 2 argumentos:
    // 1. La referencia de lo que queremos escuchar. Esto puede también ser un query.
    // 2. El callback que debe ejecutarse cada vez que recibamos una notificación de cambio
    //  en la información. El callback va a recibir como argumento el "snapshot".
    onSnapshot(q, snapshot => {
        console.log("Snapshot: ", snapshot);
        console.log("Snapshot documentos: ", snapshot.docs);

        // Transformamos el snapshot y sus documentos a un array de datos puros.
        const messages = snapshot.docs.map(doc => {
            return {
                email: doc.data().email,
                content: doc.data().content,
                // Obteemos la fecha de creción y la transformamos a un objeo Date.
                created_at: doc.data().created_at.toDate(),
            }
        });

        // Invocamos al callback que nos pasaron en la función.
        callback(messages);
    });
}
