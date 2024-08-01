import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setAccessibilitie(formId: any, questionId: any, resp: any) {
    try {
        const accessibilitiesSetDocRef = doc(db, "questions", "accessibilities");

        await setDoc(accessibilitiesSetDocRef, {
            formId: formId,
            questionId: questionId,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/accessibilities' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addAccessibilitie(formId: any, questionId: any, resp: any) {
    try {
        const accessibilitiesAddCollectionRef = collection(db, "accessibilities");

        const docRef = await addDoc(accessibilitiesAddCollectionRef, {
            formId: formId,
            questionId: questionId,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/accessibilities' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getAccessibilitie() {
    try {
        const accessibilitiesGetDocRef = doc(db, "questions/accessibilities");
        const accessibilitiesDocSnap = await getDoc(accessibilitiesGetDocRef);

        if (accessibilitiesDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/accessibilities' - method: get`);
            return accessibilitiesDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateAccessibilitie(docId: any, resp: any) {
    try {
        const accessibilitiesUpdtDocRef = doc(db, "questions/accessibilities", docId);
        await updateDoc(accessibilitiesUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/accessibilities' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteAccessibilitie(docId: any) {
    try {
        const accessibilitiesDelDocRef = doc(db, "questions/accessibilities", docId);
        await deleteDoc(
            accessibilitiesDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/accessibilities' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};