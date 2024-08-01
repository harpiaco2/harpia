import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setInfra(formId: any, questionId: any, resp: any) {
    try {
        const infraestructureSetDocRef = doc(db, "questions", "infraestructure");

        await setDoc(infraestructureSetDocRef, {
            formId: formId,
            questionId: questionId,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/infraestructure' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addInfra(formId: any, questionId: any, resp: any) {
    try {
        const infraestructureAddCollectionRef = collection(db, "infraestructure");

        const docRef = await addDoc(infraestructureAddCollectionRef, {
            formId: formId,
            questionId: questionId,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/infraestructure' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getInfra() {
    try {
        const infraestructureGetDocRef = doc(db, "questions/infraestructure");
        const infraestructureDocSnap = await getDoc(infraestructureGetDocRef);

        if (infraestructureDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/infraestructure' - method: get`);
            return infraestructureDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateInfra(docId: any, resp: any) {
    try {
        const infraestructureUpdtDocRef = doc(db, "questions/infraestructure", docId);
        await updateDoc(infraestructureUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/infraestructure' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteInfra(docId: any) {
    try {
        const infraestructureDelDocRef = doc(db, "questions/infraestructure", docId);
        await deleteDoc(
            infraestructureDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/infraestructure' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};