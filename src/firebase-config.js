// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaxcbj9OA4hz5Ljwe7JBH3Z69Gj0r7O1o",
  authDomain: "chat-app-406df.firebaseapp.com",
  projectId: "chat-app-406df",
  storageBucket: "chat-app-406df.appspot.com",
  messagingSenderId: "500293411459",
  appId: "1:500293411459:web:1e108de30517d87f20f1b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)