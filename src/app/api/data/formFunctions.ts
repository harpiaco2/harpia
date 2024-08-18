import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 
import { getUser } from "../auth/user";

export async function setForm(userInserction: any) {
    try {
        const formSetDocRef = doc(db, "form");

        await setDoc(formSetDocRef, {
            userInserction: userInserction,
            dateTimeInsertion: serverTimestamp()
        });

        const documentPath = formSetDocRef.path;
        console.log(`Insertion successful. - form:${documentPath} | 'form' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addForm() {
    try {
        const formAddCollectionRef = collection(db, "form");

        const docRef = await addDoc(formAddCollectionRef, {
            userInserction: getUser(),
            dateTimeInsertion: serverTimestamp()
        });
        const documentPath:string = docRef.path;
        console.log(`Creation successful. - form:${documentPath} | 'form' - method: add`);
        return documentPath;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getForm() {
    try {
        const formGetDocRef = doc(db, "form");
        const formDocSnap = await getDoc(formGetDocRef);

        if (formDocSnap.exists()) {
            console.log(`Successful data recovery. | 'form' - method: get`);
            return formDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateForm(docId: any, userUpdate: any) {
    try {
        const formUpdtDocRef = doc(db, "form", docId);
        await updateDoc(formUpdtDocRef, {
            userUpdate: userUpdate,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'form' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteForm(docId: any) {
    try {
        const formDelDocRef = doc(db, "form", docId);
        await deleteDoc(
            formDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'form' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};