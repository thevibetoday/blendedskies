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
    
    // Add dot pattern
    createPattern();
    
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
                }, 50 + (index * 50));
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
    
    // Handle sky selection
    skyOptions.forEach(option => {
        // Initially hide the options for animation
        option.style.opacity = '0';
        option.style.transform = 'translateY(10px)';
        
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get sky data
            const skyType = this.getAttribute('data-sky');
            
            // Navigate to the corresponding page based on sky type
            setTimeout(() => {
                if (skyType) {
                    navigateToSkyPage(skyType);
                }
            }, 300);
        });
        
        // Also handle touch events for mobile
        option.addEventListener('touchend', function(e) {
            // Prevent default only if this isn't a scroll
            if (!this.isScrolling) {
                e.preventDefault();
                
                // Get sky data
                const skyType = this.getAttribute('data-sky');
                
                // Navigate to the corresponding page
                setTimeout(() => {
                    if (skyType) {
                        navigateToSkyPage(skyType);
                    }
                }, 300);
            }
        });
        
        // Track if user is scrolling
        option.addEventListener('touchmove', function() {
            this.isScrolling = true;
        });
        
        option.addEventListener('touchstart', function() {
            this.isScrolling = false;
        });
    });
    
    // Navigate to sky pages
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
    
    // Create dot pattern
    function createPattern() {
        const dotsCount = window.innerWidth < 768 ? 100 : 200;
        
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            
            // Random dot properties
            const size = 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            dot.style.width = `${size}px`;
            dot.style.height = `${size}px`;
            dot.style.left = `${x}%`;
            dot.style.top = `${y}%`;
            dot.style.position = 'absolute';
            dot.style.background = '#e2e8f0';
            dot.style.borderRadius = '50%';
            
            starsContainer.appendChild(dot);
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
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            navbar.style.borderBottom = '1px solid #edf2f7';
            
            if (window.innerWidth > 480) {
                navbar.style.height = '60px';
            } else {
                navbar.style.height = '55px';
            }
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid #edf2f7';
            
            if (window.innerWidth > 480) {
                navbar.style.height = '70px';
            } else {
                navbar.style.height = '60px';
            }
        }
    });
    
    // Add subtle parallax effect
    document.addEventListener('mousemove', function(e) {
        if (!starsContainer.classList.contains('active')) return;
        
        const dots = document.querySelectorAll('.dot');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        dots.forEach(dot => {
            const moveX = (mouseX - 0.5) * 5;
            const moveY = (mouseY - 0.5) * 5;
            
            dot.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Adjust pattern for window size
        starsContainer.innerHTML = '';
        createPattern();
        
        // Adjust navbar height
        if (window.innerWidth <= 480) {
            navbar.style.height = '60px';
        } else {
            navbar.style.height = '70px';
        }
    });
});
