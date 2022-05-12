// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7BfQ-Iou0HkyAcFN12o-aGQkz30qj5u4",
  authDomain: "desarrollo-fullstack.firebaseapp.com",
  projectId: "desarrollo-fullstack",
  storageBucket: "desarrollo-fullstack.appspot.com",
  messagingSenderId: "459081184824",
  appId: "1:459081184824:web:a21704f41406563865d8cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addUser = async (name, age, country) => {
  const user = await addDoc(collection(db, "users"), {
    name,
    age,
    country,
  });
  return user;
};

export const getUsers = async () => await getDocs(collection(db, "users"));

export const getUser = async (id) => await getDoc(doc(db, "users", id));

export const onGetUsers = async (news) =>
  await onSnapshot(collection(db, "users"), news);

export const updateUser = async (id, newData) =>
  updateDoc(doc(db, "users", id), newData);

export const deleteUser = async (id) => await deleteDoc(doc(db, "users", id));
