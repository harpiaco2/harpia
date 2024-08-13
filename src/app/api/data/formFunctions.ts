import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setForm(formId: any, questionText: any, resp: any) {
    try {
        const formSetDocRef = doc(db, "form");

        await setDoc(formSetDocRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'form' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addForm(formId: any, questionText: any, resp: any) {
    try {
        const formAddCollectionRef = collection(db, "form");

        const docRef = await addDoc(formAddCollectionRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'form' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function geForm() {
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

export async function updateForm(docId: any, resp: any) {
    try {
        const formUpdtDocRef = doc(db, "form", docId);
        await updateDoc(formUpdtDocRef, {
            response: resp,
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