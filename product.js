document.addEventListener('DOMContentLoaded', function() {
    const skySelector = document.querySelector('.sky-selector');
    const skyPanorama = document.querySelector('.sky-panorama');
    const skyBackdrop = document.querySelector('.sky-backdrop');
    const skyOptions = document.querySelectorAll('.sky-option');
    const orbEmoji = document.querySelector('.orb-emoji');
    const orbInner = document.querySelector('.orb-inner');
    
    const scrollContainer = document.querySelector('.scroll-container');
    const progressSteps = document.querySelectorAll('.progress-step');
    const sections = document.querySelectorAll('.experience-section');
    
    const visualDots = document.querySelectorAll('.visual-dot');
    const mainVisual = document.getElementById('main-product-visual');
    
    const sizeOptions = document.querySelectorAll('.size-option');
    const infoTabs = document.querySelectorAll('.info-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    const addBagButton = document.querySelector('.add-bag-button');
    const saveButton = document.querySelector('.save-button');
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    
    // Add touch device class if applicable
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
    
    // Sky Selector Interactions
    if (skySelector && skyPanorama && skyBackdrop) {
        // Toggle sky panorama
        skySelector.onclick = function(e) {
            e.preventDefault();
            skyPanorama.classList.toggle('open');
            skyBackdrop.classList.toggle('active');
        };
        
        // Close sky panorama when backdrop is clicked
        skyBackdrop.onclick = function() {
            skyPanorama.classList.remove('open');
            skyBackdrop.classList.remove('active');
        };
        
        // Sky option selection
        if (skyOptions.length > 0 && orbEmoji && orbInner) {
            skyOptions.forEach(option => {
                option.onclick = function(e) {
                    e.preventDefault();
                    const skyType = this.getAttribute('data-sky');
                    const skyIcon = this.querySelector('.sky-icon').textContent;
                    
                    // Update orb emoji
                    orbEmoji.textContent = skyIcon;
                    orbEmoji.style.opacity = '1';
                    orbInner.style.opacity = '0';
                    
                    // Update body class for sky type
                    document.body.className = 'product-experience';
                    document.body.classList.add(`sky-${skyType}`);
                    
                    // Close panorama after selection
                    setTimeout(function() {
                        skyPanorama.classList.remove('open');
                        skyBackdrop.classList.remove('active');
                    }, 300);
                };
            });
        }
        
        // Hover interactions for sky selector (non-touch devices)
        if (skySelector && orbEmoji && orbInner) {
            skySelector.onmouseenter = function() {
                if (!isTouchDevice) {
                    orbEmoji.style.opacity = '1';
                    orbInner.style.opacity = '0';
                }
            };
            
            skySelector.onmouseleave = function() {
                if (!isTouchDevice && orbEmoji.textContent === '🌤️') {
                    orbEmoji.style.opacity = '0';
                    orbInner.style.opacity = '1';
                }
            };
        }
    }
    
    // Scroll Progress and Navigation
    if (scrollContainer && sections.length > 0 && progressSteps.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        // Intersection Observer for progress tracking
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentSection = entry.target.id;
                    updateProgress(currentSection);
                }
            });
        }, observerOptions);
        
        // Observe all sections
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Update progress step active state
        function updateProgress(currentSectionId) {
            progressSteps.forEach(step => {
                step.classList.remove('active');
                if (step.getAttribute('data-section') === currentSectionId) {
                    step.classList.add('active');
                }
            });
        }
        
        // Progress step click navigation
        progressSteps.forEach(step => {
            step.addEventListener('click', function() {
                const targetSection = document.getElementById(this.getAttribute('data-section'));
                if (targetSection) {
                    if (window.innerWidth >= 1024) {
                        targetSection.scrollIntoView({ behavior: 'smooth', inline: 'start' });
                    } else {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
    
    // Product Image Interactions
    if (visualDots.length > 0 && mainVisual) {
        // Visual dot click to change image
        visualDots.forEach(dot => {
            dot.addEventListener('click', function() {
                visualDots.forEach(d => d.classList.remove('active'));
                this.classList.add('active');
                
                const imageUrl = this.getAttribute('data-image');
                
                mainVisual.style.opacity = 0;
                setTimeout(() => {
                    mainVisual.src = imageUrl;
                    mainVisual.style.opacity = 1;
                }, 300);
            });
        });
        
        // Swipe interactions for touch devices
        if (isTouchDevice) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            mainVisual.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            mainVisual.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const currentDot = document.querySelector('.visual-dot.active');
                if (!currentDot) return;
                
                const allDots = Array.from(visualDots);
                const currentIndex = allDots.indexOf(currentDot);
                
                if (touchEndX < touchStartX - 50) {
                    const nextIndex = (currentIndex + 1) % allDots.length;
                    allDots[nextIndex].click();
                }
                
                if (touchEndX > touchStartX + 50) {
                    const prevIndex = (currentIndex - 1 + allDots.length) % allDots.length;
                    allDots[prevIndex].click();
                }
            }
        }
    }
    
    // Size Option Interactions
    if (sizeOptions.length > 0) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                sizeOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Info Tabs Interactions
    if (infoTabs.length > 0 && tabContents.length > 0) {
        infoTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                infoTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(`${this.getAttribute('data-tab')}-content`).classList.add('active');
            });
        });
    }
    
    // Add to Bag Button Interaction
    if (addBagButton) {
        addBagButton.addEventListener('click', function() {
            this.classList.add('adding');
            
            // Simulate adding to cart
            setTimeout(() => {
                this.classList.remove('adding');
                
                // Show cart success message
                const cartSuccess = document.createElement('div');
                cartSuccess.classList.add('cart-success', 'show');
                cartSuccess.textContent = 'Added to bag!';
                document.body.appendChild(cartSuccess);
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    cartSuccess.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(cartSuccess);
                    }, 300);
                }, 3000);
            }, 1000);
        });
    }
    
    // Save Button Interaction
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            this.classList.toggle('saved');
        });
    }
});
