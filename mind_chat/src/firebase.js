// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrDjfTd93NXR3yZ3alyE6bKtLso8kNfGw",
  authDomain: "jisoochat.firebaseapp.com",
  projectId: "jisoochat",
  storageBucket: "jisoochat.appspot.com",
  messagingSenderId: "515216029328",
  appId: "1:515216029328:web:556bb32e9a0c58ffba8a15",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//회원가입 인증용
export const auth = getAuth();
//회원가입시 유저명을 적용하려면 firebase에서 storage를 이용해야함
export const storage = getStorage();

export const db = getFirestore();
