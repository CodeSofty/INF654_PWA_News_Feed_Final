// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
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

// Get a list of bookmarks from your database
async function getBookmarks(db) {
    const bookmarkCol = collection(db, 'bookmarks');
    const bookmarkSnapShot = await getDocs(bookmarkCol);
    const bookmarkList = bookmarkSnapShot.docs.map(doc => doc.data());
    return bookmarkList;
}


const bookmarkList = document.querySelector('#user_bookmarks');
const form = document.querySelector('#add-bookmark-form');

// Creates new list elements and adds them to the DOM, fills them with doc data
function renderBookmarks(dcs) {
    let li = document.createElement('li');
    let title = document.createElement('span');
    let description = document.createElement('p');
    let source = document.createElement('span');
    let delete_bttn = document.createElement('button');

    li.setAttribute('data-id', dcs.id);
    title.textContent = dcs.data().title;
    description.textContent = dcs.data().description;
    source.textContent = dcs.data().link;
    delete_bttn.textContent = 'DELETE';
    delete_bttn.style.cursor = 'pointer';
    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(source);
    li.appendChild(delete_bttn);
    delete_bttn.classList.add = 'waves-effect waves-light btn';

    li.classList.add = 'collection-item';


    bookmarkList.appendChild(li);

// Delete bookmarks

delete_bttn.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    deleteDoc(doc(db, 'bookmarks', id));
})

}

//Get snapshot of doc data, then pass it to the renderBookmarks function
const bookmarks = getDocs(collection(db, 'bookmarks')).then((snapshot) => {
    snapshot.forEach((doc) => {
        renderBookmarks(doc);
    })
})

// Create New Bookmark 
form.addEventListener(('submit'), (e) => {
    e.preventDefault();
    const docRef = addDoc(collection(db, 'bookmarks'), {
        title: form.title.value,
        description: form.description.value,
        link: form.link.value
    });


// Read Bookmark by title
    let search_button = document.getElementById('keyword_search_bttn');
    search_button.addEventListener('click', (e) => {
        e.preventDefault();
        let keyword_value = document.getElementById('keyword_search').value;
        const q = query(collection(db, 'bookmarks'), where('title', '==', 'test'));
        const querySnapShot =  getDocs(q);
        querySnapShot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    })
})
