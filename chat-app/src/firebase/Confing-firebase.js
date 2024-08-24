// import { initializeApp } from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
// import firebase from "firebase/compat/app";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAgGfKyW_ZfFSZohlBVCnhgQYOCYGBOKqU",
//   authDomain: "crud-react-redux-74ca6.firebaseapp.com",
//   projectId: "crud-react-redux-74ca6",
//   storageBucket: "crud-react-redux-74ca6.appspot.com",
//   messagingSenderId: "46244592051",
//   appId: "1:46244592051:web:e8a07fc2b1f53112f3f3c6",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const db = firebase.firestore();
// const googleAuthProvider = firebase.auth.GoogleAuthProvider();

// export { app, db, googleAuthProvider };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgGfKyW_ZfFSZohlBVCnhgQYOCYGBOKqU",
  authDomain: "crud-react-redux-74ca6.firebaseapp.com",
  projectId: "crud-react-redux-74ca6",
  storageBucket: "crud-react-redux-74ca6.appspot.com",
  messagingSenderId: "46244592051",
  appId: "1:46244592051:web:e8a07fc2b1f53112f3f3c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { app, db, auth, googleAuthProvider };
