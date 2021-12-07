document.addEventListener("DOMContentLoaded", function () {
    //Nav Menu
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus,{ edge: "left" });
});