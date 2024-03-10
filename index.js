// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAuZYqabRwDGGxmYm8FmQmvPFbGSS0RvAI',
  authDomain: 'webavocat-681d1.firebaseapp.com',
  projectId: 'webavocat-681d1',
  storageBucket: 'webavocat-681d1.appspot.com',
  messagingSenderId: '998021539401',
  appId: '1:998021539401:web:090ada55186b71b0c50198',
  measurementId: 'G-1SZ0S053ZZ'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const auth = firebase.auth()

// Fonction pour inscrire un nouvel utilisateur
function registerUser (email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Inscription réussie
      const user = userCredential.user
      console.log(`Utilisateur créé avec succès : ${user.uid}`)
    })
    .catch((error) => {
      // Gestion des erreurs
      const errorCode = error.code
      const errorMessage = error.message
      console.error(`Erreur lors de la création de l'utilisateur : ${errorCode}`, errorMessage)
      throw error
    })
}

// Fonction pour connecter un utilisateur
function loginUser (email, password) {
  return auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(`Utilisateur connecté avec succès : ${user.uid}`)
    })
    .catch((error) => {
      console.error(`Erreur lors de la connexion : ${error.code}`, error.message)
      throw error
    })
}

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form')
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value
      registerUser(email, password)
        .then(() => {
          window.location.href = 'index.html'
        })
        .catch((error) => {
          alert(`Erreur lors de l'inscription: ${error.message}`)
        })
    })
  }

  const loginForm = document.getElementById('login-form')
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const email = document.getElementById('email-phone').value
      const password = document.getElementById('password').value
      loginUser(email, password)
        .then(() => {
          window.location.href = 'index.html' // Redirigez vers une page appropriée après la connexion
        })
        .catch((error) => {
          alert(`Erreur lors de la connexion: ${error.message}`)
        })
    })
  }
})

document.getElementById('signup-form').addEventListener('submit', function (event) {
  event.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  // Sign up the user with Firebase Authentication
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User has been signed up and the Firebase Function will trigger the email
      console.log('User signed up:', userCredential.user.email)
      // You can redirect the user to another page if needed
    })
    .catch((error) => {
      console.error('Error signing up:', error)
      alert(`Erreur lors de l'inscription: ${error.message}`)
    })
})
