import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setEmergency(formId: any, questionText: any, resp: any) {
    try {
        const emergencySetDocRef = doc(db, "questions", "emergency");

        await setDoc(emergencySetDocRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/emergency' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addEmergency(formId: any, questionText: any, resp: any) {
    try {
        const emergencyAddCollectionRef = collection(db, "emergency");

        const docRef = await addDoc(emergencyAddCollectionRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/emergency' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getEmergency() {
    try {
        const emergencyGetDocRef = doc(db, "questions/emergency");
        const emergencyDocSnap = await getDoc(emergencyGetDocRef);

        if (emergencyDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/emergency' - method: get`);
            return emergencyDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateEmergency(docId: any, resp: any) {
    try {
        const emergencyUpdtDocRef = doc(db, "questions/emergency", docId);
        await updateDoc(emergencyUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/emergency' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteEmergency(docId: any) {
    try {
        const emergencyDelDocRef = doc(db, "questions/emergency", docId);
        await deleteDoc(
            emergencyDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/emergency' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};