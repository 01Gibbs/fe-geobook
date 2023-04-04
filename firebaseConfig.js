// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPC6yEizL-tLbjhFsyccrhnN_uYN14cFI",
  authDomain: "geobook2.firebaseapp.com",
  projectId: "geobook2",
  storageBucket: "geobook2.appspot.com",
  messagingSenderId: "560997793981",
  appId: "1:560997793981:web:3df422b622883d600bb7d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app
