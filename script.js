document.addEventListener('DOMContentLoaded', function() {
    // Image slider functionality
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds per slide
    let slideTimer;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to the current slide
        slides[index].classList.add('active');
        currentSlide = index;
    }

    // Function to show the next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Function to show the previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners for next and previous buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetSlideTimer();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetSlideTimer();
        });
    }

    // Function to start the automatic slideshow
    function startSlideTimer() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    // Function to reset the automatic slideshow
    function resetSlideTimer() {
        clearInterval(slideTimer);
        startSlideTimer();
    }

    // Start the automatic slideshow
    startSlideTimer();

    // Add mobile menu toggle functionality
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (header && nav) {
        header.insertBefore(mobileMenuToggle, nav);
        
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Toggle nav display
            if (nav.style.display === 'none' || nav.style.display === '') {
                nav.style.display = 'block';
            } else {
                nav.style.display = 'none';
            }
        });
    }
});