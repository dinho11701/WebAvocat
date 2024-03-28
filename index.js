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
      // Registration successful
      const user = userCredential.user;
      console.log(`User created successfully: ${user.uid}`);
      // You might want to save additional user information in Firestore here

      return firebase.firestore().collection('users').doc(user.uid).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
      })
      .then(() => {
        // Redirect after saving additional information
        window.location.href = 'login.html';
      });
    })
    .catch((error) => {
      // Error handling
      console.error(`Error during user creation: ${error.code}`, error.message);
      alert(`Error during signup: ${error.message}`);
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
  updateUserProfile();
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



const folderNameInput = document.getElementById('folder-name');
const folderList = document.getElementById('folder-list');
const createFolderBtn = document.getElementById('create-folder-btn');

createFolderBtn.addEventListener('click', () => {
  const folderName = folderNameInput.value;
  if (!folderName) {
    return;
  }
  // Appel au backend pour créer le dossier
  fetch(`/create-folder?folderName=${folderName}`)
    .then(res => res.text())
    .then(message => {
      const li = document.createElement('li');
      li.textContent = folderName;
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Supprimer';
      removeBtn.addEventListener('click', () => {
        // Appel au backend pour supprimer le dossier
        fetch(`/delete-folder?folderName=${folderName}`)
          .then(res => res.text())
          .then(message => {
            li.remove();
          });
      });
      li.appendChild(removeBtn);
      folderList.appendChild(li);
      folderNameInput.value = '';
    });
});

// Assuming you have an input element for file selection
const fileInput = document.getElementById('file-input');
const uploadFileBtn = document.getElementById('upload-file-btn');

uploadFileBtn.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (!file) {
    return;
  }

  const folderName = folderNameInput.value;
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`${folderName}/${file.name}`);

  fileRef.put(file).then(() => {
    console.log(`${file.name} uploaded successfully to ${folderName} folder.`);
    // Optional: Update the UI to show the uploaded file
  }).catch(error => {
    console.error("Error uploading file: ", error);
  });
});


const createFolder = (folderName) => {
  // Assuming 'folders' is your collection for storing folder data
  return firebase.firestore().collection('folders').doc(folderName).set({
    name: folderName,
    // Add any other folder attributes you might need
  });
};

createFolderBtn.addEventListener('click', () => {
  const folderName = folderNameInput.value.trim();
  if (!folderName) {
    alert('Please enter a folder name.');
    return;
  }
  
  createFolder(folderName)
    .then(() => {
      console.log('Folder created successfully');
      // Update UI accordingly
    })
    .catch(error => {
      console.error('Error creating folder:', error);
    });
});
