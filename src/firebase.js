// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBzxmJJ-n2sCQ8RvlonoUaT80tELhyVoY",
  authDomain: "alert-vortex-384217.firebaseapp.com",
  projectId: "alert-vortex-384217",
  storageBucket: "alert-vortex-384217.appspot.com",
  messagingSenderId: "897906126708",
  appId: "1:897906126708:web:b6154ee4775c30416d0621",
  measurementId: "G-ZDHNM6SXCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);