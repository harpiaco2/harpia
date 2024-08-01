import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBGk8wO3dvFsfO5FRBeg2k-re7K_ssjQMM",
  authDomain: "harpiaco2-860e9.firebaseapp.com",
  projectId: "harpiaco2-860e9",
  storageBucket: "harpiaco2-860e9.appspot.com",
  messagingSenderId: "694628900772",
  appId: "1:694628900772:web:5dd9f410bc25acd167eb31",
  measurementId: "G-CTHNQJQRWP"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // Exporta a instância de autenticação
