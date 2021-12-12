// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";



    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyB8V3qS7UMbD16-ZyhxjPhmS_Rdn6fA6hU",
        authDomain: "pwa-final-app.firebaseapp.com",
        projectId: "pwa-final-app",
        storageBucket: "pwa-final-app.appspot.com",
        messagingSenderId: "728229900503",
        appId: "1:728229900503:web:9d4b8676115292a6e58092"
    };
    
// Initialize firebase
    const app = initializeApp(firebaseConfig);
// Connect App with Auth in Firebase
    const auth = getAuth(app);

// Listen for auth changes

onAuthStateChanged(auth, (user) => {
    if(user) {
        console.log('user logged in');
        getBookmarks.then((snapshot) => {
            setupBookmarks(snapshot);

        });
        setupUI(user);
        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            
// Create New Bookmark 
const form = document.querySelector('form');
form.addEventListener(('submit'), (e) => {
    e.preventDefault();
    const docRef = addDoc(collection(db, 'bookmarks'), {
        title: form.title.value,
        description: form.description.value,
        link: form.link.value
    }).catch((error) => console.log(error));
        form.title.value = "";
        form.description.value= "";
        form.link.value= "";
});
        })
    } else {
        console.log('user has logged out');
        setupUI();
        setupBookmarks([]);
    }
})

// SignUp

const signupform = document.querySelector('#signup-form');
signupform.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get user info
    const email = signupform['signup-email'].value;
    const password = signupform['signup-password'].value;

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed In 
        const user = userCredential.user;
        console.log(user);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupform.reset();
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
});


// Logout

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        console.log('User has signed out');
    }).catch((error) => {
        console.log(error);
    })
});

// Login

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed In 
        const user = userCredential.user;
        console.log(user);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
});