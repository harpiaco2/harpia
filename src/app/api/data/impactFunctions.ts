import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setImpact(formId: any, questionText: any, resp: any) {
    try {
        const impactSetDocRef = doc(db, "questions", "impact");

        await setDoc(impactSetDocRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/impact' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addImpact(formId: any, questionText: any, resp: any) {
    try {
        const impactAddCollectionRef = collection(db, "impact");

        const docRef = await addDoc(impactAddCollectionRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/impact' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getImpact() {
    try {
        const impactGetDocRef = doc(db, "questions/impact");
        const impactDocSnap = await getDoc(impactGetDocRef);

        if (impactDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/impact' - method: get`);
            return impactDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateImpact(docId: any, resp: any) {
    try {
        const impactUpdtDocRef = doc(db, "questions/impact", docId);
        await updateDoc(impactUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/impact' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteImpact(docId: any) {
    try {
        const impactDelDocRef = doc(db, "questions/impact", docId);
        await deleteDoc(
            impactDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/impact' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};