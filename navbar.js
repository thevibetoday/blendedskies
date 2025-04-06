document.addEventListener('DOMContentLoaded', function() {
    const skySelector = document.querySelector('.sky-selector');
    const selectorOrb = document.querySelector('.selector-orb');
    const skyPanorama = document.querySelector('.sky-panorama');
    const skyOptions = document.querySelectorAll('.sky-option');
    const skyBackdrop = document.querySelector('.sky-backdrop');
    const starsContainer = document.querySelector('.stars-container');
    const skyParticles = document.querySelector('.sky-particles');
    const cosmosOverlay = document.querySelector('.cosmos-overlay');
    const navbar = document.querySelector('.cosmic-navbar');
    const orbInner = document.querySelector('.orb-inner');
    const orbEmoji = document.querySelector('.orb-emoji');
    const contentArea = document.querySelector('.content-area');
    
    let isOpen = false;
    let currentSky = null;
    let transitionInProgress = false;
    
    createStars();
    
    function toggleMenu() {
        if (transitionInProgress) return;
        transitionInProgress = true;
        
        isOpen = !isOpen;
        
        if (isOpen) {
            selectorOrb.classList.add('active');
            skyPanorama.classList.add('open');
            skyBackdrop.classList.add('active');
            starsContainer.classList.add('active');
            navbar.classList.add('expanded');
            
            setTimeout(() => {
                skyOptions.forEach((option, index) => {
                    setTimeout(() => {
                        option.style.opacity = '1';
                        option.style.transform = 'translateY(0)';
                    }, 50 * index);
                });
                transitionInProgress = false;
            }, 200);
        } else {
            selectorOrb.classList.remove('active');
            skyPanorama.classList.remove('open');
            skyBackdrop.classList.remove('active');
            
            setTimeout(() => {
                starsContainer.classList.remove('active');
                navbar.classList.remove('expanded');
                
                skyOptions.forEach(option => {
                    option.style.opacity = '';
                    option.style.transform = '';
                });
                transitionInProgress = false;
            }, 300);
        }
    }
    
    skySelector.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    skySelector.addEventListener('touchend', function(e) {
        if (!this.isScrolling) {
            e.preventDefault();
            toggleMenu();
        }
    });
    
    skySelector.addEventListener('touchstart', function() {
        this.isScrolling = false;
    });
    
    skySelector.addEventListener('touchmove', function() {
        this.isScrolling = true;
    });
    
    skyBackdrop.addEventListener('click', function() {
        if (isOpen) toggleMenu();
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isOpen) {
            toggleMenu();
        }
    });
    
    skyOptions.forEach(option => {
        option.style.opacity = '0';
        option.style.transform = 'translateY(20px)';
        
        option.addEventListener('click', function(e) {
            e.preventDefault();
            selectSky(this);
        });
        
        option.addEventListener('touchend', function(e) {
            if (!this.isScrolling) {
                e.preventDefault();
                selectSky(this);
            }
        });
        
        option.addEventListener('touchstart', function() {
            this.isScrolling = false;
        });
        
        option.addEventListener('touchmove', function() {
            this.isScrolling = true;
        });
    });
    
    function selectSky(selectedOption) {
        if (transitionInProgress) return;
        transitionInProgress = true;
        
        const skyType = selectedOption.getAttribute('data-sky');
        const skyImage = selectedOption.querySelector('.sky-preview img');
        
        skyOptions.forEach(opt => opt.classList.remove('active'));
        selectedOption.classList.add('active');
        
        currentSky = skyType;
        
        updateOrbWithSelection(skyImage);
        applySkyEffect(skyType);
        
        setTimeout(() => {
            if (isOpen) toggleMenu();
            setTimeout(() => transitionInProgress = false, 300);
        }, 400);
    }
    
    function updateOrbWithSelection(skyImage) {
        if (!skyImage) return;
        
        orbEmoji.innerHTML = '';
        const clone = skyImage.cloneNode(true);
        orbEmoji.appendChild(clone);
        
        orbEmoji.style.opacity = '1';
        orbInner.style.opacity = '0';
        
        createRippleEffect(selectorOrb);
    }
    
    function createRippleEffect(element) {
        for (let i = 0; i < 3; i++) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            ripple.style.borderRadius = '50%';
            ripple.style.position = 'absolute';
            ripple.style.top = '0';
            ripple.style.left = '0';
            ripple.style.backgroundColor = 'rgba(135, 206, 250, 0.2)';
            ripple.style.transform = 'scale(0.95)';
            ripple.style.opacity = '1';
            ripple.style.animation = `ripple 1.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.3}s`;
            ripple.style.zIndex = '-1';
            
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1500 + i * 300);
        }
    }
    
    function applySkyEffect(skyType) {
        document.body.className = '';
        document.body.classList.add(`sky-${skyType}`);
        
        clearSkyParticles();
        
        switch(skyType) {
            case 'clear-blue':
                applyTransitionEffect('rgb(240, 248, 255)', 'linear-gradient(to bottom, rgba(135, 206, 235, 0.2), rgba(255, 255, 255, 0.5))');
                createClouds();
                break;
            case 'sunset-glow':
                applyTransitionEffect('rgb(255, 222, 173)', 'linear-gradient(to bottom, rgba(255, 111, 0, 0.2), rgba(255, 222, 173, 0.5))');
                createSunsetParticles();
                break;
            case 'storm-brewing':
                applyTransitionEffect('rgb(211, 211, 211)', 'linear-gradient(to bottom, rgba(105, 105, 105, 0.3), rgba(211, 211, 211, 0.5))');
                createStormElements();
                cosmosOverlay.classList.add('active');
                break;
            case 'starry-night':
                applyTransitionEffect('rgb(25, 25, 112)', 'linear-gradient(to bottom, rgba(25, 25, 112, 0.7), rgba(25, 25, 112, 0.3))');
                createStars(true);
                createShootingStars();
                navbar.style.backgroundColor = 'rgba(25, 25, 112, 0.7)';
                navbar.style.color = 'white';
                contentArea.querySelectorAll('p').forEach(p => p.style.color = '#ccc');
                cosmosOverlay.classList.add('active');
                break;
            case 'rainbow-sky':
                applyTransitionEffect('rgb(255, 250, 250)', 'linear-gradient(to bottom, rgba(255, 250, 250, 0.7), rgba(255, 250, 250, 0.5))');
                createRainbowEffect();
                break;
        }
        
        animateContentTransition();
    }
    
    function applyTransitionEffect(bgColor, backdropGradient) {
        document.body.style.backgroundColor = bgColor;
        skyBackdrop.style.background = backdropGradient;
        
        if (currentSky === 'starry-night') {
            cosmosOverlay.classList.remove('active');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            navbar.style.color = '';
            contentArea.querySelectorAll('p').forEach(p => p.style.color = '');
        }
    }
    
    function clearSkyParticles() {
        skyParticles.innerHTML = '';
    }
    
    function createStars(night = false) {
        starsContainer.innerHTML = '';
        const starsCount = window.innerWidth < 768 ? 50 : (night ? 150 : 100);
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const size = Math.random() * (night ? 4 : 3) + (night ? 1 : 1);
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
            
            if (night) {
                star.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px rgba(255, 255, 255, 0.8)`;
            }
            
            starsContainer.appendChild(star);
        }
    }
    
    function createClouds() {
        for (let i = 0; i < 4; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            
            const size = Math.random() * 100 + 50;
            const top = Math.random() * 40;
            const left = Math.random() * 100 - 20;
            const duration = Math.random() * 60 + 60;
            const delay = Math.random() * 10;
            
            cloud.style.width = `${size}px`;
            cloud.style.height = `${size / 2}px`;
            cloud.style.top = `${top}%`;
            cloud.style.left = `${left}%`;
            cloud.style.opacity = '0.8';
            cloud.style.backgroundColor = 'white';
            cloud.style.borderRadius = '50%';
            cloud.style.position = 'absolute';
            cloud.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8)';
            cloud.style.animation = `float-horizontal ${duration}s linear ${delay}s infinite`;
            
            skyParticles.appendChild(cloud);
            
            const innerCloud1 = document.createElement('div');
            innerCloud1.style.width = `${size * 0.7}px`;
            innerCloud1.style.height = `${size * 0.4}px`;
            innerCloud1.style.backgroundColor = 'white';
            innerCloud1.style.borderRadius = '50%';
            innerCloud1.style.position = 'absolute';
            innerCloud1.style.top = '-30%';
            innerCloud1.style.left = '20%';
            
            const innerCloud2 = document.createElement('div');
            innerCloud2.style.width = `${size * 0.5}px`;
            innerCloud2.style.height = `${size * 0.35}px`;
            innerCloud2.style.backgroundColor = 'white';
            innerCloud2.style.borderRadius = '50%';
            innerCloud2.style.position = 'absolute';
            innerCloud2.style.top = '-15%';
            innerCloud2.style.left = '50%';
            
            cloud.appendChild(innerCloud1);
            cloud.appendChild(innerCloud2);
        }
    }
    
    function createSunsetParticles() {
        for (let i = 0; i < 15; i++) {
            const ember = document.createElement('div');
            ember.className = 'ember';
            
            const size = Math.random() * 8 + 2;
            const bottom = Math.random() * 30;
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            ember.style.width = `${size}px`;
            ember.style.height = `${size}px`;
            ember.style.bottom = `${bottom}%`;
            ember.style.left = `${left}%`;
            ember.style.opacity = `${Math.random() * 0.5 + 0.3}`;
            ember.style.backgroundColor = `rgba(${Math.floor(Math.random() * 55 + 200)}, ${Math.floor(Math.random() * 100)}, 0)`;
            ember.style.borderRadius = '50%';
            ember.style.position = 'absolute';
            ember.style.boxShadow = `0 0 ${size * 2}px rgba(255, ${Math.floor(Math.random() * 150)}, 0, 0.8)`;
            ember.style.animation = `float-up ${duration}s ease-in ${delay}s infinite`;
            
            skyParticles.appendChild(ember);
        }
        
        const sunsetGlow = document.createElement('div');
        sunsetGlow.className = 'sunset-glow';
        sunsetGlow.style.position = 'absolute';
        sunsetGlow.style.bottom = '0';
        sunsetGlow.style.left = '0';
        sunsetGlow.style.width = '100%';
        sunsetGlow.style.height = '40%';
        sunsetGlow.style.background = 'linear-gradient(to top, rgba(255, 102, 0, 0.4), rgba(255, 102, 0, 0))';
        sunsetGlow.style.pointerEvents = 'none';
        
        skyParticles.appendChild(sunsetGlow);
    }
    
    function createStormElements() {
        for (let i = 0; i < 2; i++) {
            setTimeout(() => {
                createLightning();
            }, Math.random() * 5000);
        }
        
        for (let i = 0; i < 50; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            
            const height = Math.random() * 15 + 15;
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = Math.random() * 0.7 + 0.7;
            
            raindrop.style.width = '1px';
            raindrop.style.height = `${height}px`;
            raindrop.style.left = `${left}%`;
            raindrop.style.top = '-50px';
            raindrop.style.opacity = `${Math.random() * 0.4 + 0.3}`;
            raindrop.style.backgroundColor = 'rgba(200, 200, 255, 0.8)';
            raindrop.style.position = 'absolute';
            raindrop.style.borderRadius = '0 0 1px 1px';
            raindrop.style.animation = `fall ${duration}s linear ${delay}s infinite`;
            
            skyParticles.appendChild(raindrop);
        }
        
        const stormCloud1 = document.createElement('div');
        stormCloud1.className = 'storm-cloud';
        stormCloud1.style.position = 'absolute';
        stormCloud1.style.top = '10%';
        stormCloud1.style.left = '20%';
        stormCloud1.style.width = '200px';
        stormCloud1.style.height = '100px';
        stormCloud1.style.backgroundColor = 'rgba(80, 80, 80, 0.8)';
        stormCloud1.style.borderRadius = '50px';
        stormCloud1.style.boxShadow = 'inset 0 -20px 30px rgba(50, 50, 50, 0.5)';
        stormCloud1.style.animation = 'float-slow 20s ease-in-out infinite';
        
        const stormCloud2 = document.createElement('div');
        stormCloud2.className = 'storm-cloud';
        stormCloud2.style.position = 'absolute';
        stormCloud2.style.top = '5%';
        stormCloud2.style.right = '10%';
        stormCloud2.style.width = '250px';
        stormCloud2.style.height = '120px';
        stormCloud2.style.backgroundColor = 'rgba(70, 70, 70, 0.7)';
        stormCloud2.style.borderRadius = '60px';
        stormCloud2.style.boxShadow = 'inset 0 -25px 30px rgba(40, 40, 40, 0.6)';
        stormCloud2.style.animation = 'float-slow 25s ease-in-out 5s infinite reverse';
        
        skyParticles.appendChild(stormCloud1);
        skyParticles.appendChild(stormCloud2);
    }
    
    function createLightning() {
        if (currentSky !== 'storm-brewing') return;
        
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        lightning.style.position = 'absolute';
        lightning.style.top = '0';
        lightning.style.left = `${Math.random() * 80 + 10}%`;
        lightning.style.width = '3px';
        lightning.style.height = '100px';
        lightning.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        lightning.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(200, 200, 255, 0.8)';
        lightning.style.zIndex = '150';
        lightning.style.opacity = '0';
        
        document.body.appendChild(lightning);
        
        const branch1 = document.createElement('div');
        branch1.className = 'lightning-branch';
        branch1.style.position = 'absolute';
        branch1.style.top = `${Math.random() * 40 + 20}%`;
        branch1.style.left = '0';
        branch1.style.width = '100%';
        branch1.style.height = '2px';
        branch1.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        branch1.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(200, 200, 255, 0.8)';
        branch1.style.transform = `rotate(${Math.random() * 30 + 20}deg)`;
        branch1.style.transformOrigin = 'left center';
        
        const branch2 = document.createElement('div');
        branch2.className = 'lightning-branch';
        branch2.style.position = 'absolute';
        branch2.style.top = `${Math.random() * 30 + 60}%`;
        branch2.style.left = '0';
        branch2.style.width = '70%';
        branch2.style.height = '2px';
        branch2.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        branch2.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(200, 200, 255, 0.8)';
        branch2.style.transform = `rotate(${Math.random() * -30 - 20}deg)`;
        branch2.style.transformOrigin = 'left center';
        
        lightning.appendChild(branch1);
        lightning.appendChild(branch2);
        
        setTimeout(() => {
            lightning.style.opacity = '1';
            
            setTimeout(() => {
                lightning.style.opacity = '0';
                
                setTimeout(() => {
                    lightning.style.opacity = '0.7';
                    
                    setTimeout(() => {
                        lightning.style.opacity = '0';
                        
                        setTimeout(() => {
                            lightning.remove();
                            
                            if (currentSky === 'storm-brewing') {
                                setTimeout(() => {
                                    createLightning();
                                }, Math.random() * 8000 + 2000);
                            }
                        }, 50);
                    }, 50);
                }, 50);
            }, 100);
        }, 100);
    }
    
    function createShootingStars() {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                if (currentSky !== 'starry-night') return;
                
                const shootingStar = document.createElement('div');
                shootingStar.className = 'shooting-star';
                
                const startLeft = Math.random() * 80 + 10;
                const startTop = Math.random() * 40 + 5;
                const angle = Math.random() * 30 + 30;
                
                shootingStar.style.position = 'absolute';
                shootingStar.style.left = `${startLeft}%`;
                shootingStar.style.top = `${startTop}%`;
                shootingStar.style.width = '80px';
                shootingStar.style.height = '2px';
                shootingStar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                shootingStar.style.borderRadius = '2px';
                shootingStar.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
                shootingStar.style.transform = `rotate(${angle}deg)`;
                shootingStar.style.opacity = '0';
                
                const tail = document.createElement('div');
                tail.className = 'star-tail';
                tail.style.position = 'absolute';
                tail.style.top = '0';
                tail.style.right = '-20px';
                tail.style.width = '20px';
                tail.style.height = '2px';
                tail.style.background = 'linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))';
                
                shootingStar.appendChild(tail);
                skyParticles.appendChild(shootingStar);
                
                setTimeout(() => {
                    shootingStar.style.opacity = '1';
                    shootingStar.style.transition = 'transform 1.5s linear, opacity 0.3s ease-in 1.2s';
                    shootingStar.style.transform = `rotate(${angle}deg) translateX(-${Math.random() * 30 + 20}vw)`;
                    
                    setTimeout(() => {
                        shootingStar.remove();
                        
                        if (currentSky === 'starry-night') {
                            createShootingStars();
                        }
                    }, 1500);
                }, 100);
            }, i * 4000 + Math.random() * 2000);
        }
    }
    
    function createRainbowEffect() {
        const rainbow = document.createElement('div');
        rainbow.className = 'rainbow';
        rainbow.style.position = 'absolute';
        rainbow.style.bottom = '-20%';
        rainbow.style.left = '-10%';
        rainbow.style.width = '120%';
        rainbow.style.height = '150%';
        rainbow.style.borderRadius = '50%';
        rainbow.style.border = '10px solid transparent';
        rainbow.style.borderTop = '10px solid rgba(255, 0, 0, 0.2)';
        rainbow.style.boxShadow = `
            0 0 0 10px rgba(255, 165, 0, 0.15),
            0 0 0 20px rgba(255, 255, 0, 0.1),
            0 0 0 30px rgba(0, 128, 0, 0.1),
            0 0 0 40px rgba(0, 0, 255, 0.1),
            0 0 0 50px rgba(75, 0, 130, 0.1),
            0 0 0 60px rgba(238, 130, 238, 0.1)
        `;
        rainbow.style.opacity = '0';
        rainbow.style.transition = 'opacity 1s ease-in';
        
        skyParticles.appendChild(rainbow);
        
        setTimeout(() => {
            rainbow.style.opacity = '1';
        }, 100);
        
        for (let i = 0; i < 30; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            
            const size = Math.random() * 5 + 2;
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 15;
            
            snowflake.style.position = 'absolute';
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            snowflake.style.left = `${left}%`;
            snowflake.style.top = '-20px';
            snowflake.style.opacity = `${Math.random() * 0.7 + 0.3}`;
            snowflake.style.borderRadius = '50%';
            snowflake.style.backgroundColor = 'white';
            snowflake.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.8)';
            snowflake.style.animation = `snowfall ${duration}s linear ${delay}s infinite`;
            
            skyParticles.appendChild(snowflake);
        }
    }
    
    function animateContentTransition() {
        contentArea.style.transform = 'translateY(10px)';
        setTimeout(() => {
            contentArea.style.transform = 'translateY(0)';
        }, 300);
    }
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
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
    
    document.addEventListener('mousemove', function(e) {
        if (!starsContainer.classList.contains('active')) return;
        
        const stars = document.querySelectorAll('.star');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        stars.forEach(star => {
            const depth = parseFloat(star.style.width) / 3;
            const moveX = (mouseX - 0.5) * depth * 3;
            const moveY = (mouseY - 0.5) * depth * 3;
            
            star.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    window.addEventListener('resize', function() {
        starsContainer.innerHTML = '';
        createStars();
        
        if (currentSky === 'starry-night') {
            createStars(true);
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-horizontal {
            from { transform: translateX(0); }
            to { transform: translateX(calc(100vw + 200px)); }
        }
        
        @keyframes float-up {
            0% { transform: translateY(0) scale(1); opacity: 0.8; }
            100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        }
        
        @keyframes fall {
            0% { transform: translateY(0); }
            100% { transform: translateY(100vh); }
        }
        
        @keyframes snowfall {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(360deg); }
        }
        
        @keyframes float-slow {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(50px); }
        }
    `;
    document.head.appendChild(style);
    
    selectorOrb.addEventListener('mouseenter', function() {
        orbEmoji.style.opacity = '1';
        orbInner.style.opacity = '0';
    });
    
    selectorOrb.addEventListener('mouseleave', function() {
        if (!selectorOrb.classList.contains('active')) {
            orbEmoji.style.opacity = '0';
            orbInner.style.opacity = '1';
        }
    });
});
