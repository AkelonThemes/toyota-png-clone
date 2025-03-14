document.addEventListener('DOMContentLoaded', function() {
    // Image slider functionality
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds per slide
    let slideTimer;
    let touchStartX = 0;
    let touchEndX = 0;

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
            resetSlideTimer(); // Reset the timer when manually changing slides
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetSlideTimer(); // Reset the timer when manually changing slides
        });
    }

    // Add touch swipe functionality for mobile
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        sliderContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }

    // Handle swipe direction
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left, show next slide
            nextSlide();
            resetSlideTimer();
        } else if (touchEndX > touchStartX) {
            // Swipe right, show previous slide
            prevSlide();
            resetSlideTimer();
        }
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

    // Browser upgrade notification
    const noThanksBtn = document.querySelector('.no-thanks');
    const browserUpgrade = document.querySelector('.browser-upgrade');

    if (noThanksBtn && browserUpgrade) {
        noThanksBtn.addEventListener('click', function() {
            browserUpgrade.style.display = 'none';
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

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
                // Add slide down animation
                nav.style.animation = 'slideDown 0.3s ease-in-out forwards';
            } else {
                // Add slide up animation
                nav.style.animation = 'slideUp 0.3s ease-in-out forwards';
                setTimeout(() => {
                    nav.style.display = 'none';
                }, 300);
            }
        });
        
        // Add media query for mobile menu
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        function handleMediaChange(e) {
            if (e.matches) {
                // Mobile view
                nav.style.display = 'none';
                mobileMenuToggle.style.display = 'block';
            } else {
                // Desktop view
                nav.style.display = 'block';
                mobileMenuToggle.style.display = 'none';
                nav.style.animation = 'none';
            }
        }
        
        // Initial check
        handleMediaChange(mediaQuery);
        
        // Add listener for changes
        mediaQuery.addEventListener('change', handleMediaChange);
    }

    // Add animation for cards on scroll
    const cards = document.querySelectorAll('.card');
    
    function checkScroll() {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.8) {
                card.classList.add('visible');
            }
        });
    }
    
    // Add visible class to cards for animation
    cards.forEach(card => {
        card.classList.add('card-animation');
    });
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Initial check
    checkScroll();
});

// CSS for mobile menu toggle and card animations is now in style.css