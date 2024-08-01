import { db } from "@/firebaseConfig";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore"; 

export async function setResource(formId: any, questionId: any, resp: any) {
    try {
        const resourcesSetDocRef = doc(db, "questions", "resources");

        await setDoc(resourcesSetDocRef, {
            formID: formId,
            questionID: questionId,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/resources' - method: set`);
    } catch (error) {
        console.error("Error setting document: ", error);
    }
};

export async function addResource(formId: any, questionId: any, resp: any) {
    try {
        const resourcesAddCollectionRef = collection(db, "resources");

        const docRef = await addDoc(resourcesAddCollectionRef, {
            formId: formId,
            questionId: questionId,
            response: resp,
            dateTimeInsertion: serverTimestamp()
        });
        console.log(`Insertion successful. - form:${formId} | 'questions/resources' - method: add`);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getResource() {
    try {
        const resourcesGetDocRef = doc(db, "questions/resources");
        const resourcesDocSnap = await getDoc(resourcesGetDocRef);

        if (resourcesDocSnap.exists()) {
            console.log(`Successful data recovery. | 'questions/resources' - method: get`);
            return resourcesDocSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

export async function updateResource(docId: any, resp: any) {
    try {
        const resourcesUpdtDocRef = doc(db, "questions/resources", docId);
        await updateDoc(resourcesUpdtDocRef, {
            response: resp,
            dateTimeUpdate: serverTimestamp()
        });

        console.log(`Successful update. - docId: ${docId} | 'questions/resources' - method: update`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

export async function deleteResource(docId: any) {
    try {
        const resourcesDelDocRef = doc(db, "questions/resources", docId);
        await deleteDoc(
            resourcesDelDocRef
        );
        console.log(`Deletion successful. - docId: ${docId} | 'questions/resources' - method: delete`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};