// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc, query, where, onSnapshot,  enableIndexedDbPersistence} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
        // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    




    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyB8V3qS7UMbD16-ZyhxjPhmS_Rdn6fA6hU",
        authDomain: "pwa-final-app.firebaseapp.com",
        projectId: "pwa-final-app",
        storageBucket: "pwa-final-app.appspot.com",
        messagingSenderId: "728229900503",
        appId: "1:728229900503:web:9d4b8676115292a6e58092"
    };
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




enableIndexedDbPersistence(db)
.catch((err) => {
    if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.

        console.log('Persistence Failed');
    } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        console.log('Persistence is Not Valid');
    }
});

// Get a list of bookmarks from your database
async function getBookmarks(db) {
    const bookmarkCol = collection(db, 'bookmarks');
    const bookmarkSnapShot = await getDocs(bookmarkCol);
    const bookmarkList = bookmarkSnapShot.docs.map(doc => doc.data());
    return bookmarkList;
}


const bookmarkList = document.querySelector('#user_bookmarks');
const form = document.querySelector('#add-bookmark-form');



// Delete bookmarks

const bookmark_container = document.querySelector('.user_bookmarks');
bookmark_container.addEventListener('click', (event)=>{
    if(event.target.tagName === 'BUTTON') {
        event.stopPropagation();
        let id = event.target.parentElement.getAttribute('data-id');
        deleteDoc(doc(db, 'bookmarks', id));
    }
});


// Update bookmark

// li.addEventListener('click', (e) => {
//     let id = e.target.parentElement.getAttribute('data-id');
//     const upDoc = doc(db, 'bookmarks', id);
//     updateDoc(upDoc, {
//         title: form.title.value,
//         description: form.description.value,
//         link: form.link.value
//     })
// });

// }


// Create New Bookmark 
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


// Read Bookmark by title
    let search_button = document.getElementById('keyword_search_bttn');
    search_button.addEventListener ('click', async (e) => {
        e.preventDefault();
        let keyword_value = document.getElementById('keyword_search').value;
        const q = query(collection(db, 'bookmarks'), where('title', '==', `${keyword_value}`));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    })
})

const unsub = onSnapshot(collection(db, 'bookmarks'), (doc) => {
    doc.docChanges().forEach((change) => {
        if(change.type === 'added') {
    let data = change.doc.data();
    let id = change.doc.id;
    renderBookmark(data, id);
        } 

        if(change.type === 'removed') {
            removeBookmark(change.doc.id);
        }
    });
});