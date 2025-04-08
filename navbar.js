// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.cosmic-navbar');
    const starsContainer = document.querySelector('.stars-container');
    const brandName = document.querySelector('.brand-name');
    
    // Handle scroll effects
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and reduce height on scroll
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.height = '60px';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.height = '70px';
        }
    });
    
    // Brand name click - scroll to top
    if (brandName) {
        brandName.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Create ripple effect - used by multiple components
    window.createRipple = function(element, color) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = color;
        ripple.style.transform = 'scale(0)';
        ripple.style.opacity = '1';
        ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        
        element.appendChild(ripple);
        
        // Trigger the animation
        setTimeout(() => {
            ripple.style.transform = 'scale(3)';
            ripple.style.opacity = '0';
        }, 10);
        
        // Remove the ripple element after animation
        setTimeout(() => {
            element.removeChild(ripple);
        }, 700);
    };
