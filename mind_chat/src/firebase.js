// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5L91e8WVmHMMbnwjsFmUis_UuMpkUIUE",
  authDomain: "mindchat-a217d.firebaseapp.com",
  projectId: "mindchat-a217d",
  storageBucket: "mindchat-a217d.appspot.com",
  messagingSenderId: "69595802401",
  appId: "1:69595802401:web:7ef6c0a90a51aa496cec60",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//회원가입 인증용
export const auth = getAuth();
//회원가입시 유저명을 적용하려면 firebase에서 storage를 이용해야함
export const storage = getStorage();
