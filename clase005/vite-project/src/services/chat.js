import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import {db} from './firebase.js';


/**
 * Graba un mensaje de chat
 * @param {{email: string, content: string}} data 
 * @returns {Promise}
 */
export function saveMessage(data) {
    const refChat = collection(db, 'chat');
    return addDoc(refChat, {
        ...data,
    })
    .then(doc => {

    });
}

export function suscribeToChatMessages(callback) {
    const refChat = collection(db, 'chat');
    onSnapshot(refChat, snapshot => {
        console.log("snapshot ", snapshot);
        console.log("snapshot documentos ", snapshot.docs);

        const messages = snapshot.docs.map(doc => {
            return {
                email: doc.data().email,
                content: doc.data().content,
            }
        });

        callback(messages)
    })
}