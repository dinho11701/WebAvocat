// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuZYqabRwDGGxmYm8FmQmvPFbGSS0RvAI",
  authDomain: "webavocat-681d1.firebaseapp.com",
  projectId: "webavocat-681d1",
  storageBucket: "webavocat-681d1.appspot.com",
  messagingSenderId: "998021539401",
  appId: "1:998021539401:web:090ada55186b71b0c50198",
  measurementId: "G-1SZ0S053ZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  