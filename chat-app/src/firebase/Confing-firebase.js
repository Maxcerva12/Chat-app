import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpSRhEq2lqLP9xDJwz12QqheHeleusIPg",
  authDomain: "chat-app-2d2f6.firebaseapp.com",
  projectId: "chat-app-2d2f6",
  storageBucket: "chat-app-2d2f6.appspot.com",
  messagingSenderId: "923043405567",
  appId: "1:923043405567:web:3096000479105fecb476ca",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { app, db, auth, googleAuthProvider };
