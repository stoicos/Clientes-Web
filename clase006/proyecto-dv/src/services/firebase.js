// Acá vamos a hacer la conexión a nuestro servidor de Firebase.
// Y también registrar los módulos que queremos usar (ej: Firestore, Auth).
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYx5jNNpraeYTeS64gHZhKouoKFNUq1KI",
  authDomain: "mi-proyecto-bf3c1.firebaseapp.com",
  projectId: "mi-proyecto-bf3c1",
  storageBucket: "mi-proyecto-bf3c1.appspot.com",
  messagingSenderId: "765680600549",
  appId: "1:765680600549:web:194d6463a1202196469b0c"
};

// Inicializamos Firebase.
export const app = initializeApp(firebaseConfig);

// Conectamos a Firestore.
export const db = getFirestore(app);