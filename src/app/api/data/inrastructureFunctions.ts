import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setInfra(formId: any, questionText: any, resp: any) {
    try {
        const infrastructureSetDocRef = doc(db, "questions", "infrastructure");

        await setDoc(infrastructureSetDocRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/infrastructure' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addInfra(formId: any, questionText: any, resp: any) {
    try {
        const infrastructureAddCollectionRef = collection(db, "infrastructure");

        const docRef = await addDoc(infrastructureAddCollectionRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/infrastructure' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getInfra() {
    try {
        const infrastructureGetDocRef = doc(db, "questions/infrastructure");
        const infrastructureDocSnap = await getDoc(infrastructureGetDocRef);

        if (infrastructureDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/infrastructure' - method: get`);
            return infrastructureDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateInfra(docId: any, resp: any) {
    try {
        const infrastructureUpdtDocRef = doc(db, "questions/infrastructure", docId);
        await updateDoc(infrastructureUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/infrastructure' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteInfra(docId: any) {
    try {
        const infrastructureDelDocRef = doc(db, "questions/infrastructure", docId);
        await deleteDoc(
            infrastructureDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/infrastructure' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};