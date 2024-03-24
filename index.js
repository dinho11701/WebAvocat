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
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      let password = document.getElementById('password').value;

      // Check if password contains spaces
      if (/\s/.test(password)) {
        alert('Le mot de passe ne doit pas contenir d\'espaces.');
        return;
      }

      // Further checks for password could go here (length, special characters, etc.)

      registerUser(email, password)
        .then(() => {
          window.location.href = 'login.html'; // Redirect to login after successful signup
        })
        .catch((error) => {
          alert(`Erreur lors de l'inscription: ${error.message}`);
        });
    });
  }

  const loginForm = document.getElementById('login-form')
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const email = document.getElementById('email-phone').value
      const password = document.getElementById('password').value
      loginUser(email, password)
        .then(() => {
          window.location.href = 'Atema_Free_Website_Template_-_Free-CSS.com/html/index.html' // Redirigez vers une page appropriée après la connexion
        })
        .catch((error) => {
          alert(`Erreur lors de la connexion: ${error.message}`)
        })
    })
  }
})


// Function to toggle login/logout button based on user authentication state
function toggleLoginLogout() {
    const loginLogoutButton = document.getElementById('loginLogoutButton');
    const loginLogoutText = document.getElementById('loginLogoutText');

    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in, change to logout icon/button
            loginLogoutText.innerHTML = 'Profil'; // Change the text to "Profile" or something appropriate
            loginLogoutButton.querySelector('a').href = 'profile.html'; // Assuming 'profile.html' is your profile page
            loginLogoutButton.querySelector('a').innerHTML = `<span class="user_icon"><i class="fa fa-user" aria-hidden="true"></i></span> ${loginLogoutText.innerHTML}`; // Update the innerHTML to include the user icon and "Profil"
        } else {
            // No user is signed in, show login button
            loginLogoutText.innerHTML = 'Login';
            loginLogoutButton.querySelector('a').href = 'login.html'; // Change back to login page
            loginLogoutButton.querySelector('a').innerHTML = `<span class="user_icon"><i class="fa fa-user" aria-hidden="true"></i></span> ${loginLogoutText.innerHTML}`; // Reset innerHTML to show "Login"
        }
    });
}

// Initialize toggle function on document load
document.addEventListener('DOMContentLoaded', () => {
  toggleLoginLogout();

  // Existing code for handling form submissions remains unchanged...
});


