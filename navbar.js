// Dynamic Weather Navigation System
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.querySelector('.atmosphere-navbar');
    const weatherContainer = document.querySelector('.weather-container');
    const weatherToggle = document.querySelector('.weather-toggle');
    const mobileClose = document.querySelector('.mobile-close');
    const skyOptions = document.querySelectorAll('.sky-option');
    const brandContainer = document.querySelector('.brand-container');
    
    // Check if elements exist
    if (!navbar || !weatherContainer || !skyOptions) {
        console.error('Required elements missing');
        return;
    }
    
    // State
    let currentSky = null;
    
    // Initialize
    initializeNavigation();
    
    // Scroll event for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (weatherToggle) {
        weatherToggle.addEventListener('click', function() {
            weatherContainer.classList.add('active');
        });
    }
    
    // Mobile menu close
    if (mobileClose) {
        mobileClose.addEventListener('click', function() {
            weatherContainer.classList.remove('active');
        });
    }
    
    // Brand/logo click
    if (brandContainer) {
        brandContainer.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize navigation behavior
    function initializeNavigation() {
        // Set up initial state - clear blue sky as default
        if (!currentSky) {
            const defaultSky = 'clear-blue';
            const defaultOption = document.querySelector(`.sky-option[data-sky="${defaultSky}"]`);
            
            if (defaultOption) {
                currentSky = defaultSky;
                document.body.classList.add(`sky-${defaultSky}`);
                updateNavbarTheme(defaultSky);
                defaultOption.classList.add('active');
            }
        }
        
        // Add click handlers to sky options
        skyOptions.forEach(option => {
            option.addEventListener('click', function() {
                const skyType = this.getAttribute('data-sky');
                changeSkyTheme(skyType, this);
                
                // Close mobile menu if open
                weatherContainer.classList.remove('active');
            });
        });
    }
    
    // Change sky theme
    function changeSkyTheme(skyType, optionElement) {
        // Skip if already current theme
        if (currentSky === skyType) return;
        
        // Remove current theme class from body
        if (currentSky) {
            document.body.classList.remove(`sky-${currentSky}`);
        }
        
        // Remove active class from all options
        skyOptions.forEach(option => {
            option.classList.remove('active');
        });
        
        // Set new theme
        currentSky = skyType;
        document.body.classList.add(`sky-${skyType}`);
        
        // Set active class on selected option
        if (optionElement) {
            optionElement.classList.add('active');
        }
        
        // Update navbar theme
        updateNavbarTheme(skyType);
        
        // Add visual feedback for the selection
        addSelectionFeedback(optionElement);
    }
    
    // Update navbar appearance based on theme
    function updateNavbarTheme(skyType) {
        // First, reset to default
        navbar.style.background = 'rgba(255, 255, 255, 0.85)';
        navbar.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.05)';
        navbar.style.color = 'rgb(30, 35, 45)';
        
        // Then apply theme-specific styles
        switch(skyType) {
            case 'clear-blue':
                // Default is fine
                break;
                
            case 'sunset-glow':
                navbar.style.background = 'rgba(255, 250, 245, 0.85)';
                break;
                
            case 'storm-brewing':
                navbar.style.background = 'rgba(235, 235, 240, 0.85)';
                navbar.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.1)';
                break;
                
            case 'starry-night':
                navbar.style.background = 'rgba(20, 30, 45, 0.85)';
                navbar.style.color = 'rgb(250, 250, 255)';
                navbar.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.2)';
                break;
                
            case 'rainbow-sky':
                navbar.style.background = 'rgba(245, 245, 255, 0.85)';
                break;
        }
    }
    
    // Add visual feedback when selecting a theme
    function addSelectionFeedback(element) {
        if (!element) return;
        
        // Add pulse animation
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = '';
        }, 300);
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '1';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.zIndex = '5';
        ripple.style.pointerEvents = 'none';
        
        // Add animation
        ripple.style.animation = 'skyRipple 0.8s forwards';
        
        // Create keyframes for the ripple animation
        if (!document.querySelector('#ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `
                @keyframes skyRipple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to option and remove after animation
        const preview = element.querySelector('.sky-preview');
        if (preview) {
            preview.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 800);
        }
        
        // Also create page transition effect
        const pageTransition = document.createElement('div');
        pageTransition.style.position = 'fixed';
        pageTransition.style.top = '0';
        pageTransition.style.left = '0';
        pageTransition.style.width = '100%';
        pageTransition.style.height = '100%';
        pageTransition.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        pageTransition.style.pointerEvents = 'none';
        pageTransition.style.zIndex = '999';
        pageTransition.style.opacity = '0';
        
        // Add to body and animate
        document.body.appendChild(pageTransition);
        
        // Fade in quickly then fade out
        setTimeout(() => {
            pageTransition.style.transition = 'opacity 0.3s ease';
            pageTransition.style.opacity = '0.15';
            
            setTimeout(() => {
                pageTransition.style.opacity = '0';
                
                // Remove after animation
                setTimeout(() => {
                    pageTransition.remove();
                }, 300);
            }, 300);
        }, 10);
    }
    
    // Create animated brand icon based on current sky theme
    function updateBrandIcon(skyType) {
        const skyIcon = document.querySelector('.sky-icon');
        if (!skyIcon) return;
        
        // Update icon appearance based on theme
        switch(skyType) {
            case 'clear-blue':
                skyIcon.style.background = 'linear-gradient(135deg, rgba(120, 170, 255, 0.8), rgba(150, 200, 255, 0.5))';
                break;
                
            case 'sunset-glow':
                skyIcon.style.background = 'linear-gradient(135deg, rgba(255, 140, 50, 0.8), rgba(255, 180, 70, 0.5))';
                break;
                
            case 'storm-brewing':
                skyIcon.style.background = 'linear-gradient(135deg, rgba(60, 70, 90, 0.8), rgba(90, 100, 120, 0.5))';
                break;
                
            case 'starry-night':
                skyIcon.style.background = 'linear-gradient(135deg, rgba(20, 30, 60, 0.8), rgba(30, 50, 90, 0.5))';
                break;
                
            case 'rainbow-sky':
                skyIcon.style.background = 'linear-gradient(135deg, rgba(100, 180, 255, 0.8), rgba(170, 120, 255, 0.5))';
                break;
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape' && weatherContainer.classList.contains('active')) {
            weatherContainer.classList.remove('active');
        }
        
        // Arrow keys to navigate between sky options
        if (e.key.startsWith('Arrow')) {
            e.preventDefault();
            
            const activeIndex = Array.from(skyOptions).findIndex(option => 
                option.classList.contains('active')
            );
            
            let newIndex = activeIndex;
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                newIndex = (activeIndex + 1) % skyOptions.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                newIndex = (activeIndex - 1 + skyOptions.length) % skyOptions.length;
            }
            
            if (newIndex !== activeIndex) {
                const newOption = skyOptions[newIndex];
                const skyType = newOption.getAttribute('data-sky');
                changeSkyTheme(skyType, newOption);
            }
        }
    });
});
