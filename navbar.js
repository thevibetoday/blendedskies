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
    
    // Handle sky selection
    skyOptions.forEach(option => {
        // Initially hide the options for animation
        option.style.opacity = '0';
        option.style.transform = 'translateY(20px)';
        
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get sky data
            const skyType = this.getAttribute('data-sky');
            const skyIcon = this.querySelector('.sky-icon').textContent;
            const skyName = this.querySelector('h3').textContent;
            
            // Update selected sky
            currentSky = {
                type: skyType,
                icon: skyIcon,
                name: skyName
            };
            
            // Update orb appearance
            updateOrbWithSelection(currentSky);
            
            // Close the menu
            setTimeout(() => {
                if (isOpen) toggleMenu();
            }, 300);
            
            // Apply sky effect to the page
            applySkyEffect(skyType);
        });
        
        // Also handle touch events for mobile
        option.addEventListener('touchend', function(e) {
            // Prevent default only if this isn't a scroll
            if (!this.isScrolling) {
                e.preventDefault();
                
                // Get sky data
                const skyType = this.getAttribute('data-sky');
                const skyIcon = this.querySelector('.sky-icon').textContent;
                const skyName = this.querySelector('h3').textContent;
                
                // Update selected sky
                currentSky = {
                    type: skyType,
                    icon: skyIcon,
                    name: skyName
                };
                
                // Update orb appearance
                updateOrbWithSelection(currentSky);
                
                // Close the menu
                setTimeout(() => {
                    if (isOpen) toggleMenu();
                }, 300);
                
                // Apply sky effect to the page
                applySkyEffect(skyType);
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
    
    // Apply sky effect to page
    function applySkyEffect(skyType) {
        // Reset any previous effects
        document.body.className = '';
        
        // Apply effect based on sky type
        document.body.classList.add(`sky-${skyType}`);
        
        // Subtle background color transition
        let bgColor;
        
        switch(skyType) {
            case 'clear-blue':
                bgColor = 'rgba(240, 248, 255, 0.3)';
                break;
            case 'sunset-glow':
                bgColor = 'rgba(255, 222, 173, 0.3)';
                break;
            case 'storm-brewing':
                bgColor = 'rgba(211, 211, 211, 0.3)';
                break;
            case 'starry-night':
                bgColor = 'rgba(25, 25, 112, 0.05)';
                break;
            case 'rainbow-sky':
                bgColor = 'rgba(255, 250, 250, 0.3)';
                break;
            default:
                bgColor = 'rgba(255, 255, 255, 1)';
        }
        
        document.body.style.backgroundColor = bgColor;
        
        // Animation to show the effect was applied
        const contentArea = document.querySelector('.content-area');
        if (contentArea) {
            contentArea.style.transition = 'transform 0.5s ease';
            contentArea.style.transform = 'translateY(5px)';
            
            setTimeout(() => {
                contentArea.style.transform = 'translateY(0)';
            }, 500);
        }
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
