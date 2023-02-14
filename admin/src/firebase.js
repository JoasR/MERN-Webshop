// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjgab0ZAdBTd3TfU4maRa2TPlT4HvthPQ",
  authDomain: "shop-ed0c7.firebaseapp.com",
  projectId: "shop-ed0c7",
  storageBucket: "shop-ed0c7.appspot.com",
  messagingSenderId: "267471442902",
  appId: "1:267471442902:web:2e38f1483993539052ca77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app