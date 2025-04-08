// Sky selection menu functionality
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
    
    // State
    let isOpen = false;
    let currentSky = null;
    
    // Initialize sky options - make them visible as soon as menu opens
    skyOptions.forEach(option => {
        // Initially hide the options for animation
        option.style.opacity = '0';
        option.style.transform = 'translateY(20px)';
    });
    
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
            
            // Create a ripple effect on the orb
            window.createRipple(selectorOrb, 'rgba(0, 0, 0, 0.05)');
            
            // Rotate orb text
            orbInner.style.transform = 'rotateX(180deg)';
            
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
            
            // Reset orb text
            orbInner.style.transform = 'rotateX(0)';
            
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
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get sky data
            const skyType = this.getAttribute('data-sky');
            const skyIcon = this.querySelector('.sky-icon img').cloneNode(true);
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
            window.applySkyEffect(skyType);
        });
        
        // Add hover effect to create dynamic reflections
        option.addEventListener('mouseenter', function() {
            const preview = this.querySelector('.sky-preview');
            const reflection = this.querySelector('.sky-reflection');
            
            // Add a subtle glow based on the sky type
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
                    glowColor = 'rgba(0, 0, 0, 0.2)';
            }
            
            preview.style.boxShadow = `0 5px 20px ${glowColor}`;
        });
        
        option.addEventListener('mouseleave', function() {
            const preview = this.querySelector('.sky-preview');
            preview.style.boxShadow = '';
        });
    });
    
    // Update orb with sky selection
    function updateOrbWithSelection(sky) {
        if (!sky) return;
        
        // Change orb content to show selection
        orbInner.style.opacity = '0';
        orbEmoji.innerHTML = '';
        
        if (sky.icon instanceof HTMLImageElement) {
            orbEmoji.appendChild(sky.icon);
        } else {
            orbEmoji.innerHTML = `<div style="font-size: 1.5rem;">${sky.icon}</div>`;
        }
        
        orbEmoji.style.opacity = '1';
        
        // Create a ripple effect with the color of the selection
        window.createRipple(selectorOrb, 'rgba(0, 0, 0, 0.1)');
    }
    
    // Hover effects for the orb
    skySelector.addEventListener('mouseenter', function() {
        orbEmoji.style.opacity = '1';
        orbInner.style.opacity = '0';
    });
    
    skySelector.addEventListener('mouseleave', function() {
        // Only show the text if no sky is selected
        if (!currentSky) {
            orbEmoji.style.opacity = '0';
            orbInner.style.opacity = '1';
        }
    });
});
