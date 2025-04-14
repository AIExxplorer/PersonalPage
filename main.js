// Initialize Swiper with enhanced touch support
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    var swiper = new Swiper(".swiper", {
        effect: "cube",
        allowTouchMove: true,
        grabCursor: true,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        mousewheel: {
            enabled: true,
            sensitivity: 1,
        },
        keyboard: {
            enabled: true,
        },
        speed: 800,
        preventInteractionOnTransition: false,
        touchStartPreventDefault: false,
        on: {
            init: function() {
                checkScreenSize();
                updateActiveNavItem(this.activeIndex);
            },
            slideChange: function() {
                updateActiveNavItem(this.activeIndex);
            },
            resize: function() {
                checkScreenSize();
            }
        }
    });

    // Function to update active navigation item
    function updateActiveNavItem(index) {
        document.querySelectorAll(".nav-item").forEach((el, i) => {
            if (i === index) {
                el.classList.add("activeLink");
            } else {
                el.classList.remove("activeLink");
            }
        });
    }

    // Function to navigate to specific slide
    function navigateTo(index) {
        swiper.slideTo(index, 800, true);
    }

    // Set up navigation click handlers for the li elements and their children
    document.querySelectorAll('.nav-item').forEach(item => {
        // Add click handler to the li element
        item.addEventListener('click', function(e) {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            navigateTo(slideIndex);
        });
        
        // Add click handlers to child elements (icon and text)
        const childElements = item.querySelectorAll('i, p');
        childElements.forEach(childEl => {
            childEl.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent double firing
                const parentLi = this.closest('.nav-item');
                if (parentLi) {
                    const slideIndex = parseInt(parentLi.getAttribute('data-slide'));
                    navigateTo(slideIndex);
                }
            });
        });
    });

    // Check screen size for mobile optimization
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            swiper.params.allowTouchMove = true;
            swiper.params.mousewheel.enabled = false;
        } else {
            swiper.params.mousewheel.enabled = true;
        }
        swiper.update();
    }

    // Mobile viewport fix
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover';
    }
    
    // iOS detection
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
        document.documentElement.classList.add('ios');
    }
    
    // Button link handling
    document.querySelectorAll('.btn-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const button = this.querySelector('button');
            if (button && e.target === button) {
                e.preventDefault();
                window.location.href = this.href;
            }
        });
    });

    // Expose the navigate function globally
    window.Navigate = navigateTo;
});
