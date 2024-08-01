import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setQuestion(questionId: string, questionText: string) {
    try {
        const questionsSetDocRef = doc(db, "questions");

        await setDoc(questionsSetDocRef, {
            questionId: questionId,
            questionText: questionText,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - questionId:${questionId} | 'questions' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addQuestion(questionId: string, questionText: string) {
    try {
        const questionsAddCollectionRef = collection(db, "questions");

        const docRef = await addDoc(questionsAddCollectionRef, {
            questionId: questionId,
            questionText: questionText,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - questionId:${questionId} | 'questions' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getQuestion() {
    try {
        const questionsGetDocRef = doc(db, "questions");
        const questionsDocSnap = await getDoc(questionsGetDocRef);

        if (questionsDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions' - method: get`);
            return questionsDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateQuestion(docId: string, questionText: string) {
    try {
        const questionsUpdtDocRef = doc(db, "questions", docId);
        await updateDoc(questionsUpdtDocRef, {
            questionText: questionText,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteQuestion(docId: string) {
    try {
        const questionsDelDocRef = doc(db, "questions/questions", docId);
        await deleteDoc(
            questionsDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};