import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setHistorical(formId: any, questionText: any, resp: any) {
    try {
        const historicalSetDocRef = doc(db, "questions", "historical");

        await setDoc(historicalSetDocRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/historical' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addHistorical(formId: any, questionText: any, resp: any) {
    try {
        const historicalAddCollectionRef = collection(db, "historical");

        const docRef = await addDoc(historicalAddCollectionRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/historical' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getHistorical() {
    try {
        const historicalGetDocRef = doc(db, "questions/historical");
        const historicalDocSnap = await getDoc(historicalGetDocRef);

        if (historicalDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/historical' - method: get`);
            return historicalDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateHistorical(docId: any, resp: any) {
    try {
        const historicalUpdtDocRef = doc(db, "questions/historical", docId);
        await updateDoc(historicalUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/historical' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteHistorical(docId: any) {
    try {
        const historicalDelDocRef = doc(db, "questions/historical", docId);
        await deleteDoc(
            historicalDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/historical' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};