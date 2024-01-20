const main = (() =>{
    const headerToggleButton = document.querySelector(".header-toggle-button");
    const navbarLinks = document.querySelector(".navbar-links");

    headerToggleButton.addEventListener("click", () =>{
        navbarLinks.classList.toggle("active");
    });
})();