import { storage } from "@/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(file: File, formId: string): Promise<string | null> {
    const storageRef = ref(storage, `images/${formId}/${file.name}`);
    
    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('Image uploaded successfully:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null; // Retorna null ou uma string de erro dependendo do caso
    }
}
