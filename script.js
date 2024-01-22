const main = (() => {

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
        titles[index].style.color = "white";
    }

    titleAnimation(0);
    setTimeout(function() {
        titleAnimation(1);
    }, 400);
    
    const imageList = document.querySelector(".container .image-list");
    const slideButtons = document.querySelectorAll(".container .slide-button");
    const container = document.querySelector(".container");
    
    let isCarouselInMotion = false;
    const screenWidth = window.screen.width;
    let scrollTimeout;
    let isDragging = false;
    let startX;
    let scrollLeft;

    let multiplier = 0.15;
    let scrollMultiplier = 0.15;

    if(screenWidth < 501){
        multiplier = 0.35;
        scrollMultiplier = 0.35;
    }

    imageList.addEventListener("scroll", () => {
        isCarouselInMotion = true;
    });

    function handleScrollEnd() {
        isCarouselInMotion = false;
    }

    imageList.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScrollEnd, 200); 
    });

    function moveCarousell(){
        const maxScroll = imageList.scrollWidth - imageList.clientWidth;
        const scrollAmount = imageList.clientWidth * scrollMultiplier;
        const targetScroll = imageList.scrollLeft + scrollAmount;
        let finalScroll;

        if(scrollMultiplier > 0){
            finalScroll = Math.min(targetScroll, maxScroll);
        }
        else if(scrollMultiplier < 0){
            finalScroll = Math.max(targetScroll, 0);
        }

        if(finalScroll === maxScroll || finalScroll <= 0){
            scrollMultiplier = scrollMultiplier * -1;
        }
        if(isCarouselInMotion || isDragging){
            return;
        }

        imageList.scrollTo({ left: finalScroll, behavior: "smooth" });
    }

    setInterval(moveCarousell, 1500);

    slideButtons.forEach(button =>{
        button.addEventListener("click", () =>{
            const direction = button.id === "prev-slide" ? -multiplier : multiplier;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
        })
    })

    container.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - imageList.offsetLeft;
        scrollLeft = imageList.scrollLeft;
      });

      container.addEventListener("mouseleave", () => {
        isDragging = false;
      });
    
      container.addEventListener("mouseup", () => {
        isDragging = false;
      });
    
      container.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - imageList.offsetLeft;
        const walk = (x - startX) * 1;
        imageList.scrollLeft = scrollLeft - walk;
      });

})();
