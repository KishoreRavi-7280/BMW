let galleryItems = document.querySelectorAll('.gallery-slider .gallery-list .gallery-slide');
let galleryNext = document.getElementById('gallery-next');
let galleryPrev = document.getElementById('gallery-prev');
let galleryThumbs = document.querySelectorAll('.gallery-thumbs .gallery-thumb');

let galleryCount = galleryItems.length;
let galleryIndex = 0;

galleryNext.onclick = function () {
    galleryIndex++;
    if (galleryIndex >= galleryCount) {
        galleryIndex = 0;
    }
    showGallerySlide();
};

galleryPrev.onclick = function () {
    galleryIndex--;
    if (galleryIndex < 0) {
        galleryIndex = galleryCount - 1;
    }
    showGallerySlide();
};

let galleryInterval = setInterval(() => {
    galleryNext.click();
}, 5000);

function showGallerySlide() {
    document.querySelector('.gallery-slider .gallery-list .gallery-slide.gallery-active').classList.remove('gallery-active');
    document.querySelector('.gallery-thumbs .gallery-thumb.gallery-active').classList.remove('gallery-active');

    galleryItems[galleryIndex].classList.add('gallery-active');
    galleryThumbs[galleryIndex].classList.add('gallery-active');

    adjustGalleryThumbPosition();

    clearInterval(galleryInterval);
    galleryInterval = setInterval(() => {
        galleryNext.click();
    }, 5000);
}

function adjustGalleryThumbPosition() {
    let activeThumb = document.querySelector('.gallery-thumbs .gallery-thumb.gallery-active');
    let rect = activeThumb.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

galleryThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        galleryIndex = index;
        showGallerySlide();
    });
});
