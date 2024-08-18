import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setAccessibilitie(formId: any, questionText: any, resp: any) {
    try {
        const accessibilitieSetDocRef = doc(db, "questions", "accessibilitie");

        await setDoc(accessibilitieSetDocRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/accessibilitie' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addAccessibilitie(formId: any, questionText: any, resp: any) {
    try {
        const accessibilitieAddCollectionRef = collection(db, "accessibilitie");

        const docRef = await addDoc(accessibilitieAddCollectionRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/accessibilitie' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getAccessibilitie() {
    try {
        const accessibilitieGetDocRef = doc(db, "questions/accessibilitie");
        const accessibilitieDocSnap = await getDoc(accessibilitieGetDocRef);

        if (accessibilitieDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/accessibilitie' - method: get`);
            return accessibilitieDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateAccessibilitie(docId: any, resp: any) {
    try {
        const accessibilitieUpdtDocRef = doc(db, "questions/accessibilitie", docId);
        await updateDoc(accessibilitieUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/accessibilitie' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteAccessibilitie(docId: any) {
    try {
        const accessibilitieDelDocRef = doc(db, "questions/accessibilitie", docId);
        await deleteDoc(
            accessibilitieDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/accessibilitie' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};