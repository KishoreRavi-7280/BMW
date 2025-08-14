//toggle Menu
// function toggleMenu(){
//     const menu = document.querySelector('.menu');
//     const nav = document.querySelector('.nav');
//     menu.classList.toggle('active')
//     nav.classList.toggle('active')
// }

// function changeVideo(name){
//     const bgVideoList = document.querySelectorAll('.bg-video');
//     const trailers = document.querySelectorAll('.trailer');
//     const models = document.querySelectorAll('.model');

//     bgVideoList.forEach(video => {
//         video.classList.remove('.active');
//         if(video.classList.contains(name)){
//             video.classList.add('active')
//         }
//     });

//     models.forEach(video => {
//         model.classList.remove('.active');
//         if(model.classList.contains(name)){
//             model.classList.add('active')
//         }
//     });

//     trailers.forEach(video => {
//         video.classList.remove('.active');
//         if(video.classList.contains(name)){
//             video.classList.add('active')
//         }
//     });

// }



// Toggle menu button
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const nav = document.querySelector('.nav');
    if (menu) menu.classList.toggle('active');
    if (nav) nav.classList.toggle('active');
}

// Change the background video when clicking on the gallery
function changeVideo(names) {
    const bgVideoList = document.querySelectorAll('.bg-video');
    const trailers = document.querySelectorAll('.trailer');
    const models = document.querySelectorAll('.model');

    // Change background videos
    bgVideoList.forEach(video => {
        video.classList.remove('active');
        if (video.classList.contains(names)) {
            video.classList.add('active');
        }
    });

    // Change model name
    models.forEach(model => {
        model.classList.remove('active');
        if (model.classList.contains(names)) {
            model.classList.add('active');
        }
    });

    // Change trailers
    trailers.forEach(trailer => {
        trailer.classList.remove('active');
        if (trailer.classList.contains(names)) {
            trailer.classList.add('active');
        }
    });
}
