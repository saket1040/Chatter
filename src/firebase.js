// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOSkNcdCaGyQFFS7lYPDjEfa_ntwQwiMo",
  authDomain: "chat-3f439.firebaseapp.com",
  projectId: "chat-3f439",
  storageBucket: "chat-3f439.appspot.com",
  messagingSenderId: "642868977867",
  appId: "1:642868977867:web:5d8b29431ebe1332dd3b4e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider= new GoogleAuthProvider();
export const db=getFirestore(app);