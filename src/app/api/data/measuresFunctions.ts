import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setMeasure(formId: string, questionId: string, resp: string | number) {
    try {
        const measuresSetDocRef = doc(db, "questions", "measures");

        await setDoc(measuresSetDocRef, {
            formId: formId,
            questionId: questionId,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/measures' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addMeasure(formId: string, questionId: string, resp: string | number) {
    try {
        const measuresAddCollectionRef = collection(db, "measures");

        const docRef = await addDoc(measuresAddCollectionRef, {
            formId: formId,
            questionId: questionId,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/measures' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getMeasure() {
    try {
        const measuresGetDocRef = doc(db, "questions/measures");
        const measuresDocSnap = await getDoc(measuresGetDocRef);

        if (measuresDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/measures' - method: get`);
            return measuresDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateMeasure(docId: string, resp: string | number) {
    try {
        const measuresUpdtDocRef = doc(db, "questions/measures", docId);
        await updateDoc(measuresUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/measures' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteMeasure(docId: string) {
    try {
        const measuresDelDocRef = doc(db, "questions/measures", docId);
        await deleteDoc(
            measuresDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/measures' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};