import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setMeasure(formId: any, questionText: any, resp: any) {
    try {
        const measureSetDocRef = doc(db, "questions", "measure");

        await setDoc(measureSetDocRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/measure' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addMeasure(formId: any, questionText: any, resp: any) {
    try {
        const measureAddCollectionRef = collection(db, "measure");

        const docRef = await addDoc(measureAddCollectionRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/measure' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getMeasure() {
    try {
        const measureGetDocRef = doc(db, "questions/measure");
        const measureDocSnap = await getDoc(measureGetDocRef);

        if (measureDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/measure' - method: get`);
            return measureDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateMeasure(docId: any, resp: any) {
    try {
        const measureUpdtDocRef = doc(db, "questions/measure", docId);
        await updateDoc(measureUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/measure' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteMeasure(docId: any) {
    try {
        const measureDelDocRef = doc(db, "questions/measure", docId);
        await deleteDoc(
            measureDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/measure' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};