// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVLmm4k6jAU1AmmYgDY3oDsZrSE_lqCuo",
  authDomain: "socialnetwork-da3d8.firebaseapp.com",
  projectId: "socialnetwork-da3d8",
  storageBucket: "socialnetwork-da3d8.appspot.com",
  messagingSenderId: "708175261153",
  appId: "1:708175261153:web:313fab7ff0e5976c9e36a0",
  measurementId: "G-ZXKLNSJ7DZ",
  
};


// Initialize Firebase


export { auth };
export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
export const db = getFirestore(app);

