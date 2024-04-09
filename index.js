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
function registerUser(email, password, firstName, lastName) {
  return auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Save user information in Firestore
      return firebase.firestore().collection('users').doc(user.uid).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
      }).then(() => {
        // Send verification email
        return user.sendEmailVerification();
      });
    })
    .then(() => {
      console.log("Verification email sent.");
      window.location.href = 'login.html'; // Redirect to login page
    })
    .catch((error) => {
      console.error(`Error: ${error.code}`, error.message);
      alert(`Error: ${error.message}`);
    });
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
      const password = document.getElementById('password').value;
      const firstName = document.getElementById('firstname').value;
      const lastName = document.getElementById('lastname').value;

      // Check if password contains spaces
      if (/\s/.test(password)) {
        alert('Le mot de passe ne doit pas contenir d\'espaces.');
        return;
      }

      // Further checks for password could go here (length, special characters, etc.)

      registerUser(email, password, firstName, lastName)
        .then(() => {
          //window.location.href = 'login.html'; // Redirect to login after successful signup
          
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


// Code pour détecter l'état de connexion de l'utilisateur
// Code to detect the user's login state
auth.onAuthStateChanged(user => {
  // Attempt to get both the loginLogoutButton and profileButton elements
  const loginLogoutButton = document.getElementById('loginLogoutButton');
  const profileButton = document.getElementById('profileButton');

  if (user) {
    // User is signed in
    if (profileButton) profileButton.style.display = 'block'; // Show the profile button only if it exists
    if (loginLogoutButton) loginLogoutButton.innerHTML = `
      <a href="javascript:void(0);" onclick="logoutUser()">
        <span class="user_icon"><i class="fa fa-sign-out" aria-hidden="true"></i></span>
        Logout
      </a>
    `;
  } else {
    // No user is signed in
    if (profileButton) profileButton.style.display = 'none'; // Hide the profile button only if it exists
    if (loginLogoutButton) loginLogoutButton.innerHTML = `
      <a href="../html/../../login.html">
        <span class="user_icon"><i class="fa fa-user" aria-hidden="true"></i></span>
        Login
      </a>
    `;
  }
});




// Fonction pour déconnecter l'utilisateur
function logoutUser() {
  auth.signOut().then(() => {
    console.log("L'utilisateur est déconnecté");
    // Redirigez vers la page de connexion
    window.location.href = '../html/../../login.html';
  }).catch((error) => {
    console.error("Erreur de déconnexion", error);
  });
}


// Assurez-vous d'appeler la fonction toggleLoginLogout au chargement du document
//document.addEventListener('DOMContentLoaded', toggleLoginLogout);


// Retrieving user data and updating profile page
// Call updateUserProfile when the profile page loads
document.addEventListener('DOMContentLoaded', function() {
  // Only run updateUserProfile if the elements exist
  if (document.getElementById('userFullName') && document.getElementById('userEmail')) {
    updateUserProfile();
  }
});
function updateUserProfile() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in, now get the user's document from Firestore
      firebase.firestore().collection('users').doc(user.uid).get()
        .then(function(doc) {
          if (doc.exists) {
            const userData = doc.data();
            // Now set the text content of the profile elements
            document.getElementById('userFullName').textContent = `${userData.firstName} ${userData.lastName}`;
            document.getElementById('userEmail').textContent = userData.email;

            //console.log(userData.email);

          } else {
            // Handle the case where the user data document doesn't exist
            console.log("No user data available");
          }
        }).catch(function(error) {
          // Handle any errors while fetching user data
          console.error("Error fetching user data:", error);
        });
    } else {
      // No user is signed in, handle the unsigned state or redirect to the login page
      console.log("User is not signed in");
      // Optionally redirect to the login page
      // window.location.href = 'login.html';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const resetPasswordForm = document.getElementById('reset-password-form');
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', function(event) {
      event.preventDefault();
      var emailAddress = document.getElementById('email').value;

      firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
        alert('A reset link has been sent to your email address.');
        window.location.href = 'login.html';
      }).catch(function(error) {
        if (error.code === 'auth/user-not-found') {
          alert('Email address is not registered. Please check and try again.');
        } else {
          alert('An error occurred. Please try again later.');
        }
      });
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const resetPasswordForm = document.getElementById('reset-password-form-admin');
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', function(event) {
      event.preventDefault();
      var emailAddress = document.getElementById('email-admin').value;

      firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
        alert('A reset link has been sent to your email address.');
        window.location.href = 'admin-login.html';
      }).catch(function(error) {
        if (error.code === 'auth/user-not-found') {
          alert('Email address is not registered. Please check and try again.');
        } else {
          alert('An error occurred. Please try again later.');
        }
      });
    });
  }
});

// Fonction pour inscrire un nouvel utilisateur
function registerAdmin(email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
    .then((adminCredential) => {
      const admin = adminCredential.user;
      // Save user information in Firestore
      return firebase.firestore().collection('admin').doc(admin.uid).set({
        email: email,
      }).then(() => {
        // Send verification email
        return admin.sendEmailVerification();
      });
    })
    .then(() => {
      console.log("Verification email sent.");
      window.location.href = 'admin-login.html'; // Redirect to login page
    })
    .catch((error) => {
      console.error(`Error: ${error.code}`, error.message);
      alert(`Error: ${error.message}`);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form1');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;


      // Check if password contains spaces
      if (/\s/.test(password)) {
        alert('Le mot de passe ne doit pas contenir d\'espaces.');
        return;
      }

      // Further checks for password could go here (length, special characters, etc.)

      registerAdmin(email, password)
        .then(() => {
          //window.location.href = 'login.html'; // Redirect to login after successful signup
          
        })
        .catch((error) => {
          alert(`Erreur lors de l'inscription: ${error.message}`);
        });
    });
  }

})

