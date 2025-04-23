// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnybYBih-e5c__ZcgiYAdkBgD9drofwVE",
  authDomain: "sunstar-91eef.firebaseapp.com",
  projectId: "sunstar-91eef",
  storageBucket: "sunstar-91eef.firebasestorage.app",
  messagingSenderId: "677874868131",
  appId: "1:677874868131:web:6903515eba3edce19a8416",
  measurementId: "G-M3W50FNJ3X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
