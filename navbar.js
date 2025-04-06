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
    
    // Create stars with more varied appearance
    createStars();
    
    // Add subtle page entrance animation
    animatePageEntrance();
    
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
            
            // More refined staggered animation
            skyOptions.forEach((option, index) => {
                setTimeout(() => {
                    option.style.opacity = '1';
                    option.style.transform = 'translateY(0)';
                }, 80 + (index * 60)); // Slightly faster, more spread out
            });
        } else {
            // Close menu with smoother transition
            selectorOrb.classList.remove('active');
            
            // Fade out options first
            skyOptions.forEach((option, index) => {
                option.style.opacity = '0';
                option.style.transform = 'translateY(10px)';
            });
            
            // Then close the menu after a short delay
            setTimeout(() => {
                skyPanorama.classList.remove('open');
                skyBackdrop.classList.remove('active');
                starsContainer.classList.remove('active');
                navbar.classList.remove('expanded');
            }, 200);
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
            
            // Add click feedback animation
            this.style.transform = 'translateY(-4px)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px)';
            }, 150);
            
            // Get sky data
            const skyType = this.getAttribute('data-sky');
            const skyIcon = this.querySelector('.sky-preview img');
            const skyName = this.querySelector('h3').textContent;
            
            // Update selected sky
            currentSky = {
                type: skyType,
                icon: skyIcon.src,
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
                const skyIcon = this.querySelector('.sky-preview img');
                const skyName = this.querySelector('h3').textContent;
                
                // Update selected sky
                currentSky = {
                    type: skyType,
                    icon: skyIcon.src,
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
        
        // Add hover effect with more subtle interactions
        option.addEventListener('mouseenter', function() {
            const preview = this.querySelector('.sky-preview');
            const skyType = this.getAttribute('data-sky');
            let glowColor;
            
            switch(skyType) {
                case 'clear-blue':
                    glowColor = 'rgba(135, 206, 235, 0.3)';
                    break;
                case 'sunset-glow':
                    glowColor = 'rgba(255, 111, 0, 0.3)';
                    break;
                case 'storm-brewing':
                    glowColor = 'rgba(105, 105, 105, 0.3)';
                    break;
                case 'starry-night':
                    glowColor = 'rgba(25, 25, 112, 0.3)';
                    break;
                case 'rainbow-sky':
                    glowColor = 'rgba(255, 105, 180, 0.3)';
                    break;
                default:
                    glowColor = 'rgba(135, 206, 250, 0.2)';
            }
            
            preview.style.boxShadow = `0 12px 28px ${glowColor}`;
        });
        
        option.addEventListener('mouseleave', function() {
            const preview = this.querySelector('.sky-preview');
            preview.style.boxShadow = '';
        });
    });
    
    // Create stars in the background with more variety
    function createStars() {
        const starsCount = window.innerWidth < 768 ? 50 : 100;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random star properties with more variety
            const size = Math.random() * 2.5 + 0.5; // Smaller on average
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 4;
            const duration = Math.random() * 3 + 2;
            
            // Add slight blur variation
            const blur = Math.random() * 1.5 + 0.2;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.filter = `blur(${blur}px)`;
            star.style.animationDelay = `${delay}s`;
            star.style.setProperty('--twinkle-duration', `${duration}s`);
            
            // Add occasional colored stars for more visual interest
            if (Math.random() > 0.9) {
                const hue = Math.floor(Math.random() * 360);
                star.style.background = `hsl(${hue}, 70%, 80%)`;
            }
            
            starsContainer.appendChild(star);
        }
    }
    
    // Update orb with sky selection
    function updateOrbWithSelection(sky) {
        if (!sky) return;
        
        // Update emoji to match selection - now handling image
        if (orbEmoji.querySelector('img')) {
            orbEmoji.querySelector('img').src = sky.icon;
        } else {
            const img = document.createElement('img');
            img.src = sky.icon;
            img.alt = sky.name;
            orbEmoji.innerHTML = '';
            orbEmoji.appendChild(img);
        }
        
        // Keep the emoji visible after selection
        orbEmoji.style.opacity = '1';
        orbEmoji.style.transform = 'scale(1)';
        
        // Hide the text
        orbInner.style.opacity = '0';
        
        // Add subtle animation effect
        const img = orbEmoji.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.2)';
            setTimeout(() => {
                img.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    // Apply sky effect to page with smoother transitions
    function applySkyEffect(skyType) {
        // Reset any previous effects
        document.body.className = '';
        
        // Apply effect based on sky type
        document.body.classList.add(`sky-${skyType}`);
        
        // Subtle background color transition
        let bgColor;
        
        switch(skyType) {
            case 'clear-blue':
                bgColor = 'rgba(240, 248, 255, 0.2)';
                break;
            case 'sunset-glow':
                bgColor = 'rgba(255, 222, 173, 0.2)';
                break;
            case 'storm-brewing':
                bgColor = 'rgba(211, 211, 211, 0.2)';
                break;
            case 'starry-night':
                bgColor = 'rgba(25, 25, 112, 0.03)';
                break;
            case 'rainbow-sky':
                bgColor = 'rgba(255, 250, 250, 0.2)';
                break;
            default:
                bgColor = 'rgba(250, 249, 247, 1)';
        }
        
        document.body.style.backgroundColor = bgColor;
        
        // More subtle content animation
        const contentArea = document.querySelector('.content-area');
        if (contentArea) {
            contentArea.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            contentArea.style.opacity = '0.8';
            contentArea.style.transform = 'translateY(8px)';
            
            setTimeout(() => {
                contentArea.style.opacity = '1';
                contentArea.style.transform = 'translateY(0)';
            }, 100);
        }
    }
    
    // Handle scroll effects with smoother transitions
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and reduce height on scroll with smoother transition
        if (scrollTop > 20) {
            navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.06)';
            if (window.innerWidth > 480) {
                navbar.style.height = '60px';
            } else {
                navbar.style.height = '50px';
            }
        } else {
            navbar.style.boxShadow = scrollTop > 5 ? '0 4px 16px rgba(0, 0, 0, 0.03)' : 'none';
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
            const depth = parseFloat(star.style.width) / 2.2; // Less movement for more subtle effect
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
            navbar.style.height = window.pageYOffset > 20 ? '50px' : '60px';
        } else {
            navbar.style.height = window.pageYOffset > 20 ? '60px' : '70px';
        }
    });
    
    // Add subtle page entrance animation
    function animatePageEntrance() {
        // Add subtle fade-in effect to navbar
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            navbar.style.transition = 'opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            navbar.style.opacity = '1';
            navbar.style.transform = 'translateY(0)';
        }, 100);
    }
});
