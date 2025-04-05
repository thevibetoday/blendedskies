document.addEventListener('DOMContentLoaded', function() {
    // Core Elements
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
        console.error('Neural interface components missing. System disruption detected.');
        return; // Exit early if elements are missing
    }
    
    // State
    let isOpen = false;
    let currentSky = null;
    
    // Create quantum field
    createQuantumField();
    
    // Add biometric scan sound
    const scanSound = new Audio();
    scanSound.src = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT18A';
    scanSound.volume = 0.3;
    
    // Toggle neural interface
    function toggleInterface() {
        isOpen = !isOpen;
        
        if (isOpen) {
            // Play subtle interface sound
            try {
                scanSound.currentTime = 0;
                scanSound.play().catch(e => console.log('Audio disabled by browser policy'));
            } catch (e) {
                console.log('Audio context error');
            }
            
            // Open interface
            selectorOrb.classList.add('active');
            skyPanorama.classList.add('open');
            skyBackdrop.classList.add('active');
            starsContainer.classList.add('active');
            navbar.classList.add('expanded');
            
            // Neural particles
            activateParticles();
            
            // Staggered option reveal
            skyOptions.forEach((option, index) => {
                setTimeout(() => {
                    option.style.opacity = '1';
                    option.style.transform = 'translateY(0)';
                }, 100 + (index * 70));
            });
        } else {
            // Close interface
            selectorOrb.classList.remove('active');
            skyPanorama.classList.remove('open');
            skyBackdrop.classList.remove('active');
            starsContainer.classList.remove('active');
            navbar.classList.remove('expanded');
            
            // Deactivate particles
            deactivateParticles();
            
            // Reset sky options
            skyOptions.forEach(option => {
                option.style.opacity = '';
                option.style.transform = '';
            });
        }
    }
    
    // Toggle interface when clicking the selector
    skySelector.addEventListener('click', function(e) {
        e.preventDefault();
        toggleInterface();
        
        // Create quantum pulse effect on click
        createQuantumPulse(e);
    });
    
    // Also handle touch events for mobile quantum interfaces
    skySelector.addEventListener('touchend', function(e) {
        e.preventDefault();
        toggleInterface();
        
        // Create quantum pulse on touch
        const touch = e.changedTouches[0];
        createQuantumPulse({clientX: touch.clientX, clientY: touch.clientY});
    });
    
    // Close interface when clicking the backdrop
    skyBackdrop.addEventListener('click', function() {
        if (isOpen) toggleInterface();
    });
    
    // Close interface with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isOpen) {
            toggleInterface();
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
            
            // Create selection pulse effect
            createSelectionPulse(this);
            
            // Navigate to the corresponding page based on sky type
            setTimeout(() => {
                if (skyType) {
                    navigateToSkyPage(skyType);
                }
            }, 600);
        });
        
        // Also handle touch events for mobile
        option.addEventListener('touchend', function(e) {
            // Prevent default only if this isn't a scroll
            if (!this.isScrolling) {
                e.preventDefault();
                
                // Get sky data
                const skyType = this.getAttribute('data-sky');
                
                // Create selection pulse effect
                createSelectionPulse(this);
                
                // Navigate to the corresponding page
                setTimeout(() => {
                    if (skyType) {
                        navigateToSkyPage(skyType);
                    }
                }, 600);
            }
        });
        
        // Track if user is scrolling
        option.addEventListener('touchmove', function() {
            this.isScrolling = true;
        });
        
        option.addEventListener('touchstart', function() {
            this.isScrolling = false;
        });
        
        // Add hover effect with audio cue
        option.addEventListener('mouseenter', function() {
            playHoverSound();
        });
    });
    
    // Create quantum pulse effect
    function createQuantumPulse(e) {
        // Create pulse element
        const pulse = document.createElement('div');
        pulse.className = 'quantum-pulse';
        
        // Position at click/touch point
        const rect = selectorOrb.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Add pulse styling
        pulse.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 10px;
            height: 10px;
            background: rgba(0, 238, 255, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            z-index: 2000;
            box-shadow: 0 0 20px rgba(0, 238, 255, 0.8);
            pointer-events: none;
            animation: scan-animation 0.6s forwards cubic-bezier(0.16, 1, 0.3, 1);
        `;
        
        preview.appendChild(scan);
        
        // Remove after animation completes
        setTimeout(() => {
            pulse.remove();
            preview.style.boxShadow = '';
            preview.style.borderColor = '';
            if (document.querySelector('.scan-line')) {
                document.querySelector('.scan-line').remove();
            }
        }, 1000);
    }
    
    // Add pulse animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-animation {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
        }
        
        @keyframes scan-animation {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(100px); opacity: 0; }
        }
        
        @keyframes particle-float {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(var(--random-x), var(--random-y), 0); }
        }
    `;
    document.head.appendChild(style);
    
    // Play hover sound
    function playHoverSound() {
        const hoverSound = new Audio();
        hoverSound.src = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT18A';
        hoverSound.volume = 0.1;
        try {
            hoverSound.play().catch(e => console.log('Audio disabled by browser policy'));
        } catch (e) {
            console.log('Audio context error');
        }
    }
    
    // Play select sound
    function playSelectSound() {
        const selectSound = new Audio();
        selectSound.src = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT18A';
        selectSound.volume = 0.2;
        try {
            selectSound.play().catch(e => console.log('Audio disabled by browser policy'));
        } catch (e) {
            console.log('Audio context error');
        }
    }
    
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
    
    // Create quantum field
    function createQuantumField() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'quantum-particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 102;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(particlesContainer);
        
        // Create quantum particles
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            
            // Random particle properties
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const randomX = (Math.random() - 0.5) * 40;
            const randomY = (Math.random() - 0.5) * 40;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            const color = Math.random() > 0.5 ? '#00eeff' : '#d800ff';
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                background: ${color};
                border-radius: 50%;
                box-shadow: 0 0 ${size * 2}px ${color};
                opacity: 0.7;
                --random-x: ${randomX}px;
                --random-y: ${randomY}px;
                animation: particle-float ${duration}s infinite ease-in-out;
                animation-delay: ${delay}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Activate quantum particles
    function activateParticles() {
        const particles = document.querySelector('.quantum-particles');
        if (particles) particles.style.opacity = '1';
    }
    
    // Deactivate quantum particles
    function deactivateParticles() {
        const particles = document.querySelector('.quantum-particles');
        if (particles) particles.style.opacity = '0';
    }
    
    // Add parallax effect to the quantum particles
    document.addEventListener('mousemove', function(e) {
        if (!isOpen) return;
        
        const particles = document.querySelectorAll('.quantum-particles > div');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach(particle => {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            particle.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
        
        // Also add subtle parallax to the grid
        if (starsContainer.classList.contains('active')) {
            starsContainer.style.transform = `perspective(1000px) rotateX(60deg) translateY(${mouseY * 20}px)`;
        }
    });
    
    // Handle scroll effects
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and reduce height on scroll
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 0 20px rgba(0, 238, 255, 0.2)';
            navbar.style.borderBottom = '1px solid rgba(0, 238, 255, 0.3)';
            
            if (window.innerWidth > 480) {
                navbar.style.height = '60px';
            } else {
                navbar.style.height = '55px';
            }
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(0, 238, 255, 0.2)';
            
            if (window.innerWidth > 480) {
                navbar.style.height = '70px';
            } else {
                navbar.style.height = '60px';
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Adjust grid and particles for window size
        const particles = document.querySelector('.quantum-particles');
        if (particles) {
            particles.innerHTML = '';
            createQuantumField();
        }
        
        // Adjust navbar height
        if (window.innerWidth <= 480) {
            navbar.style.height = '60px';
        } else {
            navbar.style.height = '70px';
        }
    });
});: pulse-animation 0.8s forwards cubic-bezier(0.16, 1, 0.3, 1);
        `;
        
        document.body.appendChild(pulse);
        
        // Remove after animation completes
        setTimeout(() => {
            pulse.remove();
        }, 800);
    }
    
    // Create selection pulse effect
    function createSelectionPulse(element) {
        if (!element) return;
        
        // Play selection sound
        playSelectSound();
        
        // Create pulse element
        const preview = element.querySelector('.sky-preview');
        if (!preview) return;
        
        // Add glow effect
        preview.style.boxShadow = '0 0 30px rgba(0, 238, 255, 0.8)';
        preview.style.borderColor = '#00eeff';
        
        // Add pulse animation
        const rect = preview.getBoundingClientRect();
        const pulse = document.createElement('div');
        pulse.className = 'selection-pulse';
        
        pulse.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
            width: 10px;
            height: 10px;
            background: rgba(0, 238, 255, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            z-index: 2000;
            box-shadow: 0 0 30px rgba(0, 238, 255, 0.8);
            pointer-events: none;
            animation: pulse-animation 1s forwards cubic-bezier(0.16, 1, 0.3, 1);
        `;
        
        document.body.appendChild(pulse);
        
        // Add scanning line animation
        const scan = document.createElement('div');
        scan.className = 'scan-line';
        
        scan.style.cssText = `
           position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: #00eeff;
            box-shadow: 0 0 10px #00eeff;
            transform: translateY(0);
            animation: scan-animation 0.6s forwards cubic-bezier(0.16, 1, 0.3, 1);
        `;
        
        preview.appendChild(scan);
        
        // Remove after animation completes
        setTimeout(() => {
            pulse.remove();
            preview.style.boxShadow = '';
            preview.style.borderColor = '';
            if (document.querySelector('.scan-line')) {
                document.querySelector('.scan-line').remove();
            }
        }, 1000);
    }
    
    // Add pulse animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-animation {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
        }
        
        @keyframes scan-animation {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(100px); opacity: 0; }
        }
        
        @keyframes particle-float {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(var(--random-x), var(--random-y), 0); }
        }
    `;
    document.head.appendChild(style);
    
    // Play hover sound
    function playHoverSound() {
        const hoverSound = new Audio();
        hoverSound.src = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT18A';
        hoverSound.volume = 0.1;
        try {
            hoverSound.play().catch(e => console.log('Audio disabled by browser policy'));
        } catch (e) {
            console.log('Audio context error');
        }
    }
    
    // Play select sound
    function playSelectSound() {
        const selectSound = new Audio();
        selectSound.src = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT18A';
        selectSound.volume = 0.2;
        try {
            selectSound.play().catch(e => console.log('Audio disabled by browser policy'));
        } catch (e) {
            console.log('Audio context error');
        }
    }
    
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
    
    // Create quantum field
    function createQuantumField() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'quantum-particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 102;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(particlesContainer);
        
        // Create quantum particles
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            
            // Random particle properties
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const randomX = (Math.random() - 0.5) * 40;
            const randomY = (Math.random() - 0.5) * 40;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            const color = Math.random() > 0.5 ? '#00eeff' : '#d800ff';
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                background: ${color};
                border-radius: 50%;
                box-shadow: 0 0 ${size * 2}px ${color};
                opacity: 0.7;
                --random-x: ${randomX}px;
                --random-y: ${randomY}px;
                animation: particle-float ${duration}s infinite ease-in-out;
                animation-delay: ${delay}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Activate quantum particles
    function activateParticles() {
        const particles = document.querySelector('.quantum-particles');
        if (particles) particles.style.opacity = '1';
    }
    
    // Deactivate quantum particles
    function deactivateParticles() {
        const particles = document.querySelector('.quantum-particles');
        if (particles) particles.style.opacity = '0';
    }
    
    // Add parallax effect to the quantum particles
    document.addEventListener('mousemove', function(e) {
        if (!isOpen) return;
        
        const particles = document.querySelectorAll('.quantum-particles > div');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach(particle => {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            particle.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
        
        // Also add subtle parallax to the grid
        if (starsContainer.classList.contains('active')) {
            starsContainer.style.transform = `perspective(1000px) rotateX(60deg) translateY(${mouseY * 20}px)`;
        }
    });
    
    // Handle scroll effects
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and reduce height on scroll
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 0 20px rgba(0, 238, 255, 0.2)';
            navbar.style.borderBottom = '1px solid rgba(0, 238, 255, 0.3)';
            
            if (window.innerWidth > 480) {
                navbar.style.height = '60px';
            } else {
                navbar.style.height = '55px';
            }
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(0, 238, 255, 0.2)';
            
            if (window.innerWidth > 480) {
                navbar.style.height = '70px';
            } else {
                navbar.style.height = '60px';
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Adjust grid and particles for window size
        const particles = document.querySelector('.quantum-particles');
        if (particles) {
            particles.innerHTML = '';
            createQuantumField();
        }
        
        // Adjust navbar height
        if (window.innerWidth <= 480) {
            navbar.style.height = '60px';
        } else {
            navbar.style.height = '70px';
        }
    });
});
