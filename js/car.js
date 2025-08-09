// Toggle menu button
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const nav = document.querySelector('.nav');
    if (menu && nav) {
        menu.classList.toggle('active');
        nav.classList.toggle('active');
    }
}

// Change the background video when clicking on the gallery
function changeVideo(names) {
    const bgVideoList = document.querySelectorAll('.bg-video');
       const trailers = document.querySelectorAll('.trailer');
    const models = document.querySelectorAll('.model');

    bgVideoList.forEach(video => {
        video.classList.remove('active');
        if (video.classList.contains(names)) {
            video.classList.add('active');
        }
    });

    models.forEach(model => {
        model.classList.remove('active');
        if (model.classList.contains(names)) {
            model.classList.add('active');
        }
    });

    trailers.forEach(trailer => {
        trailer.classList.remove('active');
        if (trailer.classList.contains(names)) {
            trailer.classList.add('active');
        }
    });
}