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

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);