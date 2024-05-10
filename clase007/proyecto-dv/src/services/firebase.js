// Acá vamos a hacer la conexión a nuestro servidor de Firebase.
// Y también registrar los módulos que queremos usar (ej: Firestore, Auth).
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnAQ7VBq_uJflScIPiMwwGf71wMtximmA",
  authDomain: "dv-cwm-2024-1-n.firebaseapp.com",
  projectId: "dv-cwm-2024-1-n",
  storageBucket: "dv-cwm-2024-1-n.appspot.com",
  messagingSenderId: "736057099112",
  appId: "1:736057099112:web:21c6f0ee53b163fda08cdd"
};

// Inicializamos Firebase.
export const app = initializeApp(firebaseConfig);

// Conectamos a Firestore.
export const db = getFirestore(app);

export const auth = getAuth(app);