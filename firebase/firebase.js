import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAbZX23fYS8_U8aRio9C027Jq6-Xch2Gpw",
    authDomain: "sevicedeskapp.firebaseapp.com",
    projectId: "sevicedeskapp",
    storageBucket: "sevicedeskapp.appspot.com",
    messagingSenderId: "608701317594",
    appId: "1:608701317594:web:b0879d294737bd4dafc0e3",
    measurementId: "G-ZC8VLT4J4F"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
