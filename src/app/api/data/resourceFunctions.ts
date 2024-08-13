import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setResource(formId: any, questionText: any, resp: any) {
    try {
        const resourceSetDocRef = doc(db, "questions", "resource");

        await setDoc(resourceSetDocRef, {
            formID: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/resource' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addResource(formId: any, questionText: any, resp: any) {
    try {
        const resourceAddCollectionRef = collection(db, "resource");

        const docRef = await addDoc(resourceAddCollectionRef, {
            formId: formId,
            questionText: questionText,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/resource' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getResource() {
    try {
        const resourceGetDocRef = doc(db, "questions/resource");
        const resourceDocSnap = await getDoc(resourceGetDocRef);

        if (resourceDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/resource' - method: get`);
            return resourceDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateResource(docId: any, resp: any) {
    try {
        const resourceUpdtDocRef = doc(db, "questions/resource", docId);
        await updateDoc(resourceUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/resource' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteResource(docId: any) {
    try {
        const resourceDelDocRef = doc(db, "questions/resource", docId);
        await deleteDoc(
            resourceDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/resource' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};