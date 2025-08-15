const track = document.querySelector(".slider-track");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");

let currentIndex = 0;
const cards = document.querySelectorAll(".blog-box");
const cardWidth = cards[0].offsetWidth + 30; // includes margin

function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener("click", () => {
    if (currentIndex < cards.length -3) {
        currentIndex++;
        updateSlider();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

// Optional: Swipe for mobile
let startX = 0;
track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
        if (currentIndex < cards.length - 1) currentIndex++;
    } else if (endX - startX > 50) {
        if (currentIndex > 0) currentIndex--;
    }
    updateSlider();
});
