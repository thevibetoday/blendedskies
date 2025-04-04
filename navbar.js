// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const skySelector = document.querySelector('.sky-selector');
    const selectorOrb = document.querySelector('.selector-orb');
    const skyPanorama = document.querySelector('.sky-panorama');
    const skyOptions = document.querySelectorAll('.sky-option');
    const skyBackdrop = document.querySelector('.sky-backdrop');
    const starsContainer = document.querySelector('.stars-container');
    const navbar = document.querySelector('.cosmic-navbar');
    const orbInner = document.querySelector('.orb-inner');
    const orbEmoji = document.querySelector('.orb-emoji');
    
    // Check if all required elements exist
    if (!skySelector || !selectorOrb || !skyPanorama || !skyBackdrop || 
        !starsContainer || !navbar || !orbInner || !orbEmoji) {
        console.error('Some required elements are missing from the DOM.');
        return; // Exit early if elements are missing
    }
    
    // State
    let isOpen = false;
    let currentSky = null;
    
    // Create stars
    createStars();
    
    // Toggle menu function
    function toggleMenu() {
        isOpen = !isOpen;
        
        if (isOpen) {
            // Open menu
            selectorOrb.classList.add('active');
            skyPanorama.classList.add('open');
            skyBackdrop.classList.add('active');
            starsContainer.classList.add('active');
            navbar.classList.add('expanded');
            
            // Delay the appearance of each sky option for staggered animation
            skyOptions.forEach((option, index) => {
                setTimeout(() => {
                    option.style.opacity = '1';
                    option.style.transform = 'translateY(0)';
                }, 100 + (index * 50));
            });
        } else {
            // Close menu
            selectorOrb.classList.remove('active');
            skyPanorama.classList.remove('open');
            skyBackdrop.classList.remove('active');
            starsContainer.classList.remove('active');
            navbar.classList.remove('expanded');
            
            // Reset sky options
            skyOptions.forEach(option => {
                option.style.opacity = '';
                option.style.transform = '';
            });
        }
    }
    
    // Toggle menu when clicking the selector
    skySelector.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    // Also handle touch events for mobile
    skySelector.addEventListener('touchend', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    // Close menu when clicking the backdrop
    skyBackdrop.addEventListener('click', function() {
        if (isOpen) toggleMenu();
    });
    
    // Close menu with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isOpen) {
            toggleMenu();
        }
    });
    
    // Handle sky selection - MODIFIED FOR PAGE NAVIGATION
    skyOptions.forEach(option => {
        // Initially hide the options for animation
        option.style.opacity = '0';
        option.style.transform = 'translateY(20px)';
        
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get sky data
            const skyType = this.getAttribute('data-sky');
            
            // Navigate to the corresponding page based on sky type
            // This is the key change to enable page navigation
            if (skyType) {
                navigateToSkyPage(skyType);
            }
        });
        
        // Also handle touch events for mobile
        option.addEventListener('touchend', function(e) {
            // Prevent default only if this isn't a scroll
            if (!this.isScrolling) {
                e.preventDefault();
                
                // Get sky data
                const skyType = this.getAttribute('data-sky');
                
                // Navigate to the corresponding page
                if (skyType) {
                    navigateToSkyPage(skyType);
                }
            }
        });
        
        // Track if user is scrolling
        option.addEventListener('touchmove', function() {
            this.isScrolling = true;
        });
        
        option.addEventListener('touchstart', function() {
            this.isScrolling = false;
        });
        
        // Add hover effect to create dynamic reflections
        option.addEventListener('mouseenter', function() {
            const preview = this.querySelector('.sky-preview');
            const skyType = this.getAttribute('data-sky');
            let glowColor;
            
            switch(skyType) {
                case 'clear-blue':
                    glowColor = 'rgba(135, 206, 235, 0.5)';
                    break;
                case 'sunset-glow':
                    glowColor = 'rgba(255, 111, 0, 0.5)';
                    break;
                case 'storm-brewing':
                    glowColor = 'rgba(105, 105, 105, 0.5)';
                    break;
                case 'starry-night':
                    glowColor = 'rgba(25, 25, 112, 0.5)';
                    break;
                case 'rainbow-sky':
                    glowColor = 'rgba(255, 105, 180, 0.4)';
                    break;
                default:
                    glowColor = 'rgba(135, 206, 250, 0.3)';
            }
            
            preview.style.boxShadow = `0 5px 20px ${glowColor}`;
        });
        
        option.addEventListener('mouseleave', function() {
            const preview = this.querySelector('.sky-preview');
            preview.style.boxShadow = '';
        });
    });
    
    // NEW FUNCTION: Navigate to sky pages
    function navigateToSkyPage(skyType) {
        // Map sky types to their respective HTML pages
        const skyPages = {
            'clear-blue': 'sun.html',
            'sunset-glow': 'sunset.html', 
            'storm-brewing': 'storm.html',
            'starry-night': 'nighttime.html',
            'rainbow-sky': 'rainbow.html'
        };
        
        // Default page if the sky type doesn't match any in our mapping
        const defaultPage = 'index.html';
        
        // Get the page URL for the selected sky type or use the default
        const pageUrl = skyPages[skyType] || defaultPage;
        
        // Navigate to the page
        window.location.href = pageUrl;
    }
    
    // Create stars in the background
    function createStars() {
        const starsCount = window.innerWidth < 768 ? 50 : 100;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random star properties
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = Math.random() * 3 + 2;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.animationDelay = `${delay}s`;
            star.style.setProperty('--twinkle-duration', `${duration}s`);
            
            starsContainer.appendChild(star);
        }
    }
    
    // Update orb with sky selection
    function updateOrbWithSelection(sky) {
        if (!sky) return;
        
        // Update emoji to match selection
        orbEmoji.textContent = sky.icon;
        
        // Keep the emoji visible after selection
        orbEmoji.style.opacity = '1';
        orbEmoji.style.transform = 'scale(1)';
        
        // Hide the text
        orbInner.style.opacity = '0';
    }
    
    // Handle scroll effects
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and reduce height on scroll
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            if (window.innerWidth > 480) {
                navbar.style.height = '60px';
            } else {
                navbar.style.height = '50px';
            }
        } else {
            navbar.style.boxShadow = 'none';
            if (window.innerWidth > 480) {
                navbar.style.height = '70px';
            } else {
                navbar.style.height = '60px';
            }
        }
    });
    
    // Add a subtle parallax effect to the stars when moving mouse
    document.addEventListener('mousemove', function(e) {
        if (!starsContainer.classList.contains('active')) return;
        
        const stars = document.querySelectorAll('.star');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        stars.forEach(star => {
            const depth = parseFloat(star.style.width) / 3; // Bigger stars move more
            const moveX = (mouseX - 0.5) * depth;
            const moveY = (mouseY - 0.5) * depth;
            
            star.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Adjust stars for window size
        starsContainer.innerHTML = '';
        createStars();
        
        // Adjust navbar height
        if (window.innerWidth <= 480) {
            navbar.style.height = '60px';
        } else {
            navbar.style.height = '70px';
        }
    });
});
