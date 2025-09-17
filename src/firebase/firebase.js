// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "private",
  authDomain: "expense-tracker-dc0fd.firebaseapp.com",
  projectId: "expense-tracker-dc0fd",
  storageBucket: "expense-tracker-dc0fd.firebasestorage.app",
  messagingSenderId: "656759321097",
  appId: "1:656759321097:web:d4b62c3a7d4fa7d4b9bed8",
  measurementId: "G-E1X4N2RFW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth}
