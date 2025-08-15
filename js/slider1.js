const bmwTrack = document.querySelector(".bmw-slider-track");
const bmwPrev = document.querySelector(".bmw-prev");
const bmwNext = document.querySelector(".bmw-next");

let bmwIndex = 0;
const bmwSlides = document.querySelectorAll(".bmw-slide");
const bmwSlideWidth = bmwSlides[0].offsetWidth + 40; // includes margin

function bmwUpdateSlider() {
    bmwTrack.style.transform = `translateX(-${bmwIndex * bmwSlideWidth}px)`;
}

bmwNext.addEventListener("click", () => {
    if (bmwIndex < bmwSlides.length - 3) {
        bmwIndex++;
        bmwUpdateSlider();
    }
});

bmwPrev.addEventListener("click", () => {
    if (bmwIndex > 0) {
        bmwIndex--;
        bmwUpdateSlider();
    }
});

// Swipe support for mobile
let bmwStartX = 0;
bmwTrack.addEventListener("touchstart", (e) => {
    bmwStartX = e.touches[0].clientX;
});

bmwTrack.addEventListener("touchend", (e) => {
    let bmwEndX = e.changedTouches[0].clientX;
    if (bmwStartX - bmwEndX > 50 && bmwIndex < bmwSlides.length - 1) {
        bmwIndex++;
    } else if (bmwEndX - bmwStartX > 50 && bmwIndex > 0) {
        bmwIndex--;
    }
    bmwUpdateSlider();
});
