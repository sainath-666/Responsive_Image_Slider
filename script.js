// script.js
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Initialize accessibility attributes for buttons
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

prevButton.setAttribute('aria-label', 'Previous slide');
prevButton.setAttribute('title', 'Previous slide');
nextButton.setAttribute('aria-label', 'Next slide');
nextButton.setAttribute('title', 'Next slide');

// Event listeners for navigation
prevButton.addEventListener('click', () => changeSlide(-1));
nextButton.addEventListener('click', () => changeSlide(1));

// Add event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.setAttribute('title', `Go to slide ${index + 1}`);
});

function changeSlide(direction) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

function goToSlide(index) {
    if (index === currentIndex) return;
    
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    currentIndex = index;
    
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

// Autoplay functionality with pause on hover
let autoplayInterval;

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Start autoplay initially
startAutoplay();

// Pause autoplay on hover
document.querySelector('.slider').addEventListener('mouseenter', stopAutoplay);
document.querySelector('.slider').addEventListener('mouseleave', startAutoplay);

// Pause autoplay on focus of controls for accessibility
prevButton.addEventListener('focus', stopAutoplay);
nextButton.addEventListener('focus', stopAutoplay);
prevButton.addEventListener('blur', startAutoplay);
nextButton.addEventListener('blur', startAutoplay);

// Add swipe support for touch devices
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
const slider = document.querySelector('.slider');

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    stopAutoplay(); // Stop autoplay on touch
}, false);

slider.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
}, false);

slider.addEventListener('touchend', () => {
    const horizontalDiff = touchStartX - touchEndX;
    const verticalDiff = touchStartY - touchEndY;
    
    // Only register as swipe if horizontal movement is greater than vertical
    // and greater than minimum threshold (50px)
    if (Math.abs(horizontalDiff) > Math.abs(verticalDiff) && Math.abs(horizontalDiff) > 50) {
        if (horizontalDiff > 0) {
            changeSlide(1); // Swipe left, go to next slide
        } else {
            changeSlide(-1); // Swipe right, go to previous slide
        }
    }
    
    startAutoplay(); // Resume autoplay after touch
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form - in a real application, your message would be sent.');
        contactForm.reset();
    });
}
