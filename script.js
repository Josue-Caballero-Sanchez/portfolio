const main = (() =>{

    const headerToggleButton = document.querySelector(".header-toggle-button");
    const navbarLinks = document.querySelector(".navbar-links");
    const titles = document.querySelectorAll(".title");

    headerToggleButton.addEventListener("click", () =>{
        if (navbarLinks.classList.contains("active")) {
            navbarLinks.classList.remove("active");
            navbarLinks.classList.add("active-reverse");

            navbarLinks.addEventListener("animationend", () => {
                navbarLinks.style.display = "none";
            }, { once: true });
        } 
        else {
            navbarLinks.classList.remove("active-reverse");
            navbarLinks.classList.add("active");

            navbarLinks.style.display = "flex";
        }
    });

    function titleAnimation(index){
        titles[index].classList.add("title-animation");
    }

    titleAnimation(0);
    titleAnimation(1);

    


})();