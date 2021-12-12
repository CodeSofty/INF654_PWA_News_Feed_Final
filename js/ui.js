// Setup Materialize Components 
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
})

const user_bookmarks = document.getElementById('user_bookmarks');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
    if(user) {
    // Toggle UI Elements
        loggedOutLinks.forEach((item) => (item.style.display = "none"));
        loggedInLinks.forEach((item) => (item.style.display = "block"));
    } else {
        loggedOutLinks.forEach((item) => (item.style.display = "block"));
        loggedInLinks.forEach((item) => (item.style.display = "none"));
    }
}

document.addEventListener("DOMContentLoaded", function () {
    //Nav Menu
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus,{ edge: "left" });
});

const renderBookmark = (data, id) => {
    // DOM Manipulation

    const html = 
    `<li class='bookmark' data-id ="${id}">
    <span>${data.title}</span>
    <p>${data.description}</p>
    <span>${data.link}</span>
    <button id = "delete_bttn" class="waves-effect waves-light btn">DELETE</button>
    </li>`;
// console.log(user_bookmarks.innerHTML);
    user_bookmarks.innerHTML += html;
};


// Populate Data when Logged In
const setupBookmarks = (data) => {
    let html = "";
    data.forEach((doc) => {
        const bookmarks = doc.data();
        const li =
        `<li class='bookmark' data-id ="${bookmark.id}">
        <span>${bookmark.title}</span>
        <p>${bookmark.description}</p>
        <span>${bookmark.link}</span>
        <button id = "delete_bttn" class="waves-effect waves-light btn">DELETE</button>
        </li>`;

        html += li;
    })

    bookmarks.innerHTML = html;
}

const removeBookmark = (id) => {
    const bookmark = document.querySelector(`.bookmark[data-id = "${id}"]`);
    bookmark.remove();
};