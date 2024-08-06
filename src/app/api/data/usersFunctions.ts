import { db } from "@/firebaseConfig";
import {
    doc,
    setDoc,
    addDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    collection,
    serverTimestamp
} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth
} from "firebase/auth";

// Função para criar usuário no Firebase Authentication e salvar no Firestore
export async function registerUser(userName: string, email: string, password: string, phone: string) {
    const auth = getAuth();
    try {
        
        if (password.length < 6) {
            throw new Error("A senha deve ter pelo menos 6 caracteres.");
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const usersCollectionRef = collection(db, "users");
        await setDoc(doc(usersCollectionRef, user.uid), {
            uid: user.uid,
            userName: userName,
            email: email,
            phone: phone,
            dateTimeInsertion: serverTimestamp()
        });

        console.log(`User created and saved successfully. - user:${userName} | 'users' - method: create`);
        return user; 
    } catch (error) {
        console.error("Error creating user: ", error);
        throw error; 
    }
}

// Função para login do usuário usando Firebase Authentication
export async function loginUser(email: string, password: string) {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(`Login successful. - user:${user.email} | 'users' - method: login`);
        return user;
    } catch (error) {
        console.error("Error logging in: ", error);
        throw error; 
    }
}


// Função para atualizar dados do usuário no Firestore
export async function updateUser(docId: string, userName: string, email: string, phone: string) {
    try {
        const usersUpdtDocRef = doc(db, "users", docId);
        await updateDoc(usersUpdtDocRef, {
            userName: userName,
            email: email,
            phone: phone,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'users' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error;
    }
}

// Função para deletar usuário no Firestore
export async function deleteUser(docId: string) {
    try {
        const usersDelDocRef = doc(db, "users", docId);
        await deleteDoc(usersDelDocRef);
        console.log(`Deletion successful. - docId: ${docId} | 'users' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw error; 
    }
}
