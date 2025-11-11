import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0u0JD85_UNzxwaUElZChO9jQKJUqZF5A",
  authDomain: "booklibraryapp-6578c.firebaseapp.com",
  projectId: "booklibraryapp-6578c",
  storageBucket: "booklibraryapp-6578c.firebasestorage.app",
  messagingSenderId: "370448482301",
  appId: "1:370448482301:web:c16caca63fd10ecf752394"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);