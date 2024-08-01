import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setUser(userName: string, email: string, password: string, phone: string) {
    try {
        const usersSetDocRef = doc(db, "users", "users");

        await setDoc(usersSetDocRef, {
            userName: "",
            email: "",
            password: "",
            phone: "", 
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - user:${userName} | 'users' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addUser(userName: string, email: string, password: string, phone: string) {
    try {
        const usersAddCollectionRef = collection(db, "users");

        const docRef = await addDoc(usersAddCollectionRef, {
            userName: userName,
            email: email,
            password: password,
            phone: phone, 
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - user:${userName} | 'users' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getUser() {
    try {
        const usersGetDocRef = doc(db, "users");
        const usersDocSnap = await getDoc(usersGetDocRef);

        if (usersDocSnap.exists()) {
            console.log(`Successful data recovery. | 'users' - method: get`);
            return usersDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateUser(docId: string, userName: string, email: string, password: string, phone: string) {
    try {
        const usersUpdtDocRef = doc(db, "users", docId);
        await updateDoc(usersUpdtDocRef, {
            userName: userName,
            email: email,
            password: password,
            phone: phone, 
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'users' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteUser(docId: string) {
    try {
        const usersDelDocRef = doc(db, "users", docId);
        await deleteDoc(
            usersDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'users' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};