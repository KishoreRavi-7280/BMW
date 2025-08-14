let carSlides = document.querySelectorAll('.car-slider .car-slide-track .car-slide');
let carNext = document.getElementById('car-next');
let carPrev = document.getElementById('car-prev');
let carThumbs = document.querySelectorAll('.car-slider-thumbnails .car-thumb');

// config params
let totalCarSlides = carSlides.length;
let carActiveIndex = 0;

// Next button
carNext.onclick = function () {
    carActiveIndex++;
    if (carActiveIndex >= totalCarSlides) {
        carActiveIndex = 0;
    }
    showCarSlide();
};

// Prev button
carPrev.onclick = function () {
    carActiveIndex--;
    if (carActiveIndex < 0) {
        carActiveIndex = totalCarSlides - 1;
    }
    showCarSlide();
};

// Auto run slider
let carAutoPlay = setInterval(() => {
    carNext.click();
}, 10000);

// Show slide function
function showCarSlide() {
    // Remove old active
    document.querySelector('.car-slide.active').classList.remove('active');
    document.querySelector('.car-thumb.active').classList.remove('active');

    // Add new active
    carSlides[carActiveIndex].classList.add('active');
    carThumbs[carActiveIndex].classList.add('active');

    // Scroll to active thumbnail if needed
    setCarThumbPosition();

    // Reset autoplay
    clearInterval(carAutoPlay);
    carAutoPlay = setInterval(() => {
        carNext.click();
    }, 5000);
}

// Keep active thumbnail in view
function setCarThumbPosition() {
    let activeThumb = document.querySelector('.car-thumb.active');
    let rect = activeThumb.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// Thumbnail click event
carThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        carActiveIndex = index;
        showCarSlide();
    });
});
