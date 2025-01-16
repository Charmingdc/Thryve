import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebase-config";

const App = initializeApp(firebaseConfig);
export const db = getFirestore(App);
export const auth = getAuth(App);
