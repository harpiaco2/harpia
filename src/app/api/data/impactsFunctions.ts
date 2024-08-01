import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setImpact(formId: any, questionId: any, resp: any) {
    try {
        const impactsSetDocRef = doc(db, "questions", "impacts");

        await setDoc(impactsSetDocRef, {
            formId: formId,
            questionId: questionId,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/impacts' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addImpact(formId: any, questionId: any, resp: any) {
    try {
        const impactsAddCollectionRef = collection(db, "impacts");

        const docRef = await addDoc(impactsAddCollectionRef, {
            formId: formId,
            questionId: questionId,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/impacts' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getImpact() {
    try {
        const impactsGetDocRef = doc(db, "questions/impacts");
        const impactsDocSnap = await getDoc(impactsGetDocRef);

        if (impactsDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/impacts' - method: get`);
            return impactsDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateImpact(docId: any, resp: any) {
    try {
        const impactsUpdtDocRef = doc(db, "questions/impacts", docId);
        await updateDoc(impactsUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/impacts' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteImpact(docId: any) {
    try {
        const impactsDelDocRef = doc(db, "questions/impacts", docId);
        await deleteDoc(
            impactsDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/impacts' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};