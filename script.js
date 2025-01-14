// script.js
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('.next').addEventListener('click', () => changeSlide(1));

function changeSlide(direction) {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    slides[currentIndex].classList.add('active');
}

// Autoplay functionality
setInterval(() => {
    changeSlide(1);
}, 5000); // Change slide every 5 seconds

// Add swipe support for touch devices
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.slider').addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
}, false);

document.querySelector('.slider').addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
}, false);

document.querySelector('.slider').addEventListener('touchend', () => {
    if (touchStartX - touchEndX > 50) {
        changeSlide(1);
    }
    if (touchStartX - touchEndX < -50) {
        changeSlide(-1);
    }
});
