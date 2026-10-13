// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgGhoECRAKNurIp_kTyiVuGkQzYV0t3-E",
  authDomain: "react-course-fcee3.firebaseapp.com",
  projectId: "react-course-fcee3",
  storageBucket: "react-course-fcee3.appspot.com",
  messagingSenderId: "113616135335",
  appId: "1:113616135335:web:ddefc38ac445ed8265a782",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
