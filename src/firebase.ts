// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOSU_ibSDPssQ3eUDmn8ENohlA1w-w2m8",
  authDomain: "project6-fd3b6.firebaseapp.com",
  projectId: "project6-fd3b6",
  storageBucket: "project6-fd3b6.appspot.com",
  messagingSenderId: "391108146744",
  appId: "1:391108146744:web:84762317a5b174536918cd",
  measurementId: "G-RL7K652JDG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
