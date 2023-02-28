// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fir-course-ba6c2.firebaseapp.com",
  projectId: "fir-course-ba6c2",
  storageBucket: "fir-course-ba6c2.appspot.com",
  messagingSenderId: "423231625260",
  appId: "1:423231625260:web:88f7e73f6ca45b95209989",
  measurementId: "G-KJFHF0LBE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app)