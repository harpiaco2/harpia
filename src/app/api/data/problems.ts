import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setProblem(formId: string, questionId: string, resp: string | number) {
    try {
        const problemsSetDocRef = doc(db, "questions", "problems");

        await setDoc(problemsSetDocRef, {
            formId: formId,
            questionId: questionId,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/problems' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addProblem(formId: string, questionId: string, resp: string | number) {
    try {
        const problemsAddCollectionRef = collection(db, "problems");

        const docRef = await addDoc(problemsAddCollectionRef, {
            formId: formId,
            questionId: questionId,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/problems' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getProblem() {
    try {
        const problemsGetDocRef = doc(db, "questions/problems");
        const problemsDocSnap = await getDoc(problemsGetDocRef);

        if (problemsDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/problems' - method: get`);
            return problemsDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateProblem(docId: string, resp: string | number) {
    try {
        const problemsUpdtDocRef = doc(db, "questions/problems", docId);
        await updateDoc(problemsUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/problems' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteProblem(docId: string) {
    try {
        const problemsDelDocRef = doc(db, "questions/problems", docId);
        await deleteDoc(
            problemsDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/problems' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};