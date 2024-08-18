import { getAuth } from "@firebase/auth";

export function getUser() {
    const auth = getAuth();
    return auth.currentUser?.uid;
}