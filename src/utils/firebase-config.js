import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5uksUuty6dFe2v8PJBhZ2avUf7eeWTIM",
  authDomain: "react-netflix-clone-7beaa.firebaseapp.com",
  projectId: "react-netflix-clone-7beaa",
  storageBucket: "react-netflix-clone-7beaa.appspot.com",
  messagingSenderId: "327269169431",
  appId: "1:327269169431:web:c5da3e373cb40e773c5f52",
  measurementId: "G-LQPRQRD46Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
