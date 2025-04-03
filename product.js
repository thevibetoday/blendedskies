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
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
    
    if (skySelector && skyPanorama && skyBackdrop) {
        skySelector.onclick = function(e) {
            e.preventDefault();
            skyPanorama.classList.toggle('open');
            skyBackdrop.classList.toggle('active');
        };
        
        skyBackdrop.onclick = function() {
            skyPanorama.classList.remove('open');
            skyBackdrop.classList.remove('active');
        };
        
        if (skyOptions.length > 0 && orbEmoji && orbInner) {
            skyOptions.forEach(option => {
                option.onclick = function(e) {
                    e.preventDefault();
                    const skyType = this.getAttribute('data-sky');
                    const skyIcon = this.querySelector('.sky-icon').textContent;
                    
                    orbEmoji.textContent = skyIcon;
                    orbEmoji.style.opacity = '1';
                    orbInner.style.opacity = '0';
                    
                    document.body.className = '';
                    document.body.classList.add(`sky-${skyType}`);
                    
                    setTimeout(function() {
                        skyPanorama.classList.remove('open');
                        skyBackdrop.classList.remove('active');
                    }, 300);
                };
            });
        }
        
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
    
    if (scrollContainer && sections.length > 0 && progressSteps.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentSection = entry.target.id;
                    updateProgress(currentSection);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        function updateProgress(currentSectionId) {
            progressSteps.forEach(step => {
                step.classList.remove('active');
                if (step.getAttribute('data-section') === currentSectionId) {
                    step.classList.add('active');
                }
            });
        }
        
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
    
    if (visualDots.length > 0 && mainVisual) {
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
    
    if (sizeOptions.length > 0) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                sizeOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
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
    
    if (addBagButton) {
        addBagButton.addEventListener('click', function() {
            const selectedSize = document.querySelector('.size-option.active').getAttribute('data-size');
            
            this.classList.add('adding');
            
            setTimeout(() => {
                this.textContent = 'Added to Bag';
                
                const successMsg = document.createElement('div');
                successMsg.className = 'cart-success';
                successMsg.textContent = 'Item added to bag!';
                document.body.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.classList.add('show');
                }, 10);
                
                setTimeout(() => {
                    successMsg.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(successMsg);
                    }, 300);
                    
                    this.textContent = 'Add to bag';
                    this.classList.remove('adding');
                }, 2000);
            }, 500);
        });
    }
    
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            const svgPath = this.querySelector('svg path');
            
            if (this.classList.contains('saved')) {
                this.classList.remove('saved');
                svgPath.setAttribute('fill', 'none');
            } else {
                this.classList.add('saved');
                svgPath.setAttribute('fill', 'currentColor');
            }
        });
    }
    
    function checkStickySupport() {
        const testDiv = document.createElement('div');
        testDiv.style.position = 'sticky';
        testDiv.style.top = '0';
        
        const isSupported = testDiv.style.position.includes('sticky');
        if (!isSupported) {
            document.body.classList.add('no-sticky-support');
            
            const contextBar = document.querySelector('.context-bar');
            if (contextBar) {
                contextBar.style.position = 'fixed';
            }
        }
    }
    
    checkStickySupport();
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
    
    if (isTouchDevice && window.innerWidth >= 768 && window.innerWidth <= 1024) {
        const swipeIndicator = document.createElement('div');
        swipeIndicator.className = 'swipe-indicator';
        swipeIndicator.innerHTML = `
            <div class="swipe-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4L20 8L16 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4 12V8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <span>Scroll horizontally</span>
        `;
        
        document.querySelector('.experience-container').appendChild(swipeIndicator);
        
        setTimeout(() => {
            swipeIndicator.classList.add('hide');
            
            setTimeout(() => {
                swipeIndicator.parentNode.removeChild(swipeIndicator);
            }, 1000);
        }, 4000);
    }
    
    function setAppHeight() {
        const doc = document.documentElement;
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
        
        const mobileHeight = window.innerHeight;
        sections.forEach(section => {
            if (window.innerWidth <= 768) {
                section.style.minHeight = `${mobileHeight - 140}px`;
            }
        });
    }
    
    if (isTouchDevice) {
        setAppHeight();
        window.addEventListener('resize', setAppHeight);
        window.addEventListener('orientationchange', function() {
            setTimeout(setAppHeight, 300);
        });
        
        const touchElements = document.querySelectorAll('.size-option, .visual-dot, .add-bag-button, .save-button, .info-tab');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 100);
            }, { passive: true });
        });
    }
    
    if (!prefersReducedMotion) {
        const fadeInOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        };
        
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, fadeInOptions);
        
        document.querySelectorAll('.product-essence, .fabric-details, .story-narrative, .purchase-interface').forEach(block => {
            block.classList.add('fade-in-element');
            fadeInObserver.observe(block);
        });
    }
    
    sections.forEach(section => {
        section.setAttribute('aria-labelledby', `${section.id}-heading`);
        
        const heading = section.querySelector('h1, h2');
        if (heading) {
            heading.id = `${section.id}-heading`;
        }
    });
});
