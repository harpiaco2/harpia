import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setProblem(formId: any, questionText: any, resp: any) {
    try {
        const problemSetDocRef = doc(db, "questions", "problem");

        await setDoc(problemSetDocRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/problem' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addProblem(formId: any, questionText: any, resp: any) {
    try {
        const problemAddCollectionRef = collection(db, "problem");

        const docRef = await addDoc(problemAddCollectionRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/problem' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getProblem() {
    try {
        const problemGetDocRef = doc(db, "questions/problem");
        const problemDocSnap = await getDoc(problemGetDocRef);

        if (problemDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/problem' - method: get`);
            return problemDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateProblem(docId: any, resp: any) {
    try {
        const problemUpdtDocRef = doc(db, "questions/problem", docId);
        await updateDoc(problemUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/problem' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteProblem(docId: any) {
    try {
        const problemDelDocRef = doc(db, "questions/problem", docId);
        await deleteDoc(
            problemDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/problem' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};