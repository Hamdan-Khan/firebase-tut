// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAW3erCETIQemGEBklLEeMK86ata2RxQPw",
  authDomain: "fir-tutorial-5a016.firebaseapp.com",
  projectId: "fir-tutorial-5a016",
  storageBucket: "fir-tutorial-5a016.appspot.com",
  messagingSenderId: "618073758234",
  appId: "1:618073758234:web:2285ee25e71f4c30d00fa3",
  measurementId: "G-DVLZEXJCYS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
