// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import { getAuth, onAuthStateChanged } from 'firebase/auth'

//inscrire user avec email et password
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


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

const auth = getAuth(app);

// Fonction pour inscrire un nouvel utilisateur
function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Inscription réussie
      const user = userCredential.user;
      console.log(`Utilisateur créé avec succès : ${user.uid}`);
      // Vous pouvez ici rediriger l'utilisateur ou afficher un message de succès
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Erreur lors de la création de l'utilisateur : ${errorCode}`, errorMessage);
      // Affichez ici un message d'erreur à l'utilisateur
    });
}

// Ajout d'un écouteur d'événement au formulaire d'inscription
window.onload = function () {
  const form = document.querySelector('form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Récupération des valeurs du formulaire
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    registerUser(email, password);
  });
};