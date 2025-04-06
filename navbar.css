document.addEventListener('DOMContentLoaded', function() {
    const skyCanvas = document.querySelector('.sky-canvas');
    const weatherLayer = document.querySelector('.weather-layer');
    const interactiveElements = document.querySelector('.interactive-elements');
    const horizonNav = document.querySelector('.horizon-nav');
    const sunElement = document.querySelector('.sun-element');
    const moonElement = document.querySelector('.moon-element');
    const cloudCluster = document.querySelector('.cloud-cluster');
    const interactionZone = document.querySelector('.interaction-zone');
    const weatherSelector = document.querySelector('.weather-selector');
    const atmosphereContainer = document.querySelector('.atmosphere-container');
    const weatherScenes = document.querySelectorAll('.weather-scene');
    const logoPath = document.querySelector('.logo-path');
    const brandName = document.querySelector('.brand-name');
    const contentArea = document.querySelector('.content-area');
    
    let currentWeather = 'clear-day';
    let selectorOpen = false;
    let transitionInProgress = false;
    
    init();
    
    function init() {
        setupWeatherScene('clear-day');
        
        interactionZone.addEventListener('click', toggleWeatherSelector);
        
        weatherScenes.forEach(scene => {
            scene.addEventListener('click', function() {
                const weatherType = this.getAttribute('data-weather');
                changeWeather(weatherType);
            });
        });
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                horizonNav.style.height = '60px';
            } else {
                horizonNav.style.height = '80px';
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && selectorOpen) {
                toggleWeatherSelector();
            }
        });
    }
    
    function toggleWeatherSelector() {
        if (transitionInProgress) return;
        
        selectorOpen = !selectorOpen;
        transitionInProgress = true;
        
        if (selectorOpen) {
            weatherSelector.classList.add('open');
            setTimeout(() => {
                transitionInProgress = false;
            }, 800);
        } else {
            weatherSelector.classList.remove('open');
            setTimeout(() => {
                transitionInProgress = false;
            }, 800);
        }
    }
    
    function changeWeather(weatherType) {
        if (currentWeather === weatherType || transitionInProgress) return;
        
        transitionInProgress = true;
        
        clearWeatherEffects();
        setupWeatherScene(weatherType);
        
        setTimeout(() => {
            if (selectorOpen) {
                toggleWeatherSelector();
            }
            setTimeout(() => {
                transitionInProgress = false;
            }, 800);
        }, 400);
    }
    
    function clearWeatherEffects() {
        weatherLayer.innerHTML = '';
        interactiveElements.innerHTML = '';
    }
    
    function setupWeatherScene(weatherType) {
        currentWeather = weatherType;
        
        skyCanvas.className = 'sky-canvas';
        skyCanvas.classList.add(`sky-${weatherType}`);
        
        switch(weatherType) {
            case 'clear-day':
                setupClearDay();
                break;
            case 'sunset':
                setupSunset();
                break;
            case 'storm':
                setupStorm();
                break;
            case 'night':
                setupNight();
                break;
            case 'snow':
                setupSnow();
                break;
        }
    }
    
    function setupClearDay() {
        sunElement.style.opacity = '1';
        sunElement.style.transform = 'translate(0, 0)';
        moonElement.style.opacity = '0';
        moonElement.style.transform = 'translate(-50px, 0)';
        
        logoPath.style.fill = '#FFD700';
        brandName.style.color = '#333';
        
        createClouds(4);
    }
    
    function setupSunset() {
        sunElement.style.opacity = '1';
        sunElement.style.transform = 'translate(0, 15px)';
        moonElement.style.opacity = '0';
        moonElement.style.transform = 'translate(-50px, 0)';
        
        logoPath.style.fill = '#FF7E5F';
        brandName.style.color = '#333';
        
        createClouds(3, true);
    }
    
    function setupStorm() {
        sunElement.style.opacity = '0.3';
        sunElement.style.transform = 'translate(0, 0)';
        moonElement.style.opacity = '0';
        moonElement.style.transform = 'translate(-50px, 0)';
        
        logoPath.style.fill = '#64B5F6';
        brandName.style.color = '#ECEFF1';
        
        createStormClouds();
        createRain();
        createLightning();
    }
    
    function setupNight() {
        sunElement.style.opacity = '0';
        sunElement.style.transform = 'translate(50px, 0)';
        moonElement.style.opacity = '1';
        moonElement.style.transform = 'translate(0, 0)';
        
        logoPath.style.fill = '#ECEFF1';
        brandName.style.color = '#ECEFF1';
        
        createStars();
    }
    
    function setupSnow() {
        sunElement.style.opacity = '0.5';
        sunElement.style.transform = 'translate(0, 0)';
        moonElement.style.opacity = '0';
        moonElement.style.transform = 'translate(-50px, 0)';
        
        logoPath.style.fill = '#90CAF9';
        brandName.style.color = '#333';
        
        createSnowClouds();
        createSnowflakes();
    }
    
    function createClouds(count, sunset = false) {
        for (let i = 0; i < count; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud-particle';
            
            const size = Math.random() * 80 + 60;
            const top = Math.random() * 40 + 5;
            const speed = Math.random() * 60 + 80;
            const delay = Math.random() * 10;
            
            cloud.style.width = `${size}px`;
            cloud.style.height = `${size / 2}px`;
            cloud.style.top = `${top}%`;
            cloud.style.animationDuration = `${speed}s`;
            cloud.style.animationDelay = `${delay}s`;
            
            if (sunset) {
                cloud.style.background = 'linear-gradient(to bottom, #FFCC80, #FF8A65)';
            }
            
            const innerCloud1 = document.createElement('div');
            innerCloud1.style.position = 'absolute';
            innerCloud1.style.width = `${size * 0.7}px`;
            innerCloud1.style.height = `${size * 0.4}px`;
            innerCloud1.style.borderRadius = '50%';
            innerCloud1.style.top = '-30%';
            innerCloud1.style.left = '20%';
            innerCloud1.style.background = sunset ? '#FFCC80' : 'white';
            
            const innerCloud2 = document.createElement('div');
            innerCloud2.style.position = 'absolute';
            innerCloud2.style.width = `${size * 0.5}px`;
            innerCloud2.style.height = `${size * 0.35}px`;
            innerCloud2.style.borderRadius = '50%';
            innerCloud2.style.top = '-15%';
            innerCloud2.style.left = '50%';
            innerCloud2.style.background = sunset ? '#FFCC80' : 'white';
            
            cloud.appendChild(innerCloud1);
            cloud.appendChild(innerCloud2);
            
            weatherLayer.appendChild(cloud);
        }
    }
    
    function createStormClouds() {
        for (let i = 0; i < 5; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud-particle';
            
            const size = Math.random() * 100 + 80;
            const top = Math.random() * 30 + 5;
            const speed = Math.random() * 40 + 100;
            const delay = Math.random() * 5;
            
            cloud.style.width = `${size}px`;
            cloud.style.height = `${size / 1.5}px`;
            cloud.style.top = `${top}%`;
            cloud.style.background = 'linear-gradient(to bottom, #546E7A, #37474F)';
            cloud.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            cloud.style.animationDuration = `${speed}s`;
            cloud.style.animationDelay = `${delay}s`;
            
            const innerCloud1 = document.createElement('div');
            innerCloud1.style.position = 'absolute';
            innerCloud1.style.width = `${size * 0.7}px`;
            innerCloud1.style.height = `${size * 0.5}px`;
            innerCloud1.style.borderRadius = '50%';
            innerCloud1.style.top = '-20%';
            innerCloud1.style.left = '20%';
            innerCloud1.style.background = '#546E7A';
            
            const innerCloud2 = document.createElement('div');
            innerCloud2.style.position = 'absolute';
            innerCloud2.style.width = `${size * 0.6}px`;
            innerCloud2.style.height = `${size * 0.45}px`;
            innerCloud2.style.borderRadius = '50%';
            innerCloud2.style.top = '-10%';
            innerCloud2.style.left = '45%';
            innerCloud2.style.background = '#546E7A';
            
            cloud.appendChild(innerCloud1);
            cloud.appendChild(innerCloud2);
            
            weatherLayer.appendChild(cloud);
        }
    }
    
    function createRain() {
        const rainContainer = document.createElement('div');
        rainContainer.className = 'rain-container';
        rainContainer.style.position = 'absolute';
        rainContainer.style.top = '0';
        rainContainer.style.left = '0';
        rainContainer.style.width = '100%';
        rainContainer.style.height = '100%';
        rainContainer.style.overflow = 'hidden';
        rainContainer.style.pointerEvents = 'none';
        
        for (let i = 0; i < 100; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 0.5 + 0.7;
            
            raindrop.style.left = `${left}%`;
            raindrop.style.animationDuration = `${duration}s`;
            raindrop.style.animationDelay = `${delay}s`;
            
            rainContainer.appendChild(raindrop);
        }
        
        weatherLayer.appendChild(rainContainer);
    }
    
    function createLightning() {
        const createBolt = () => {
            if (currentWeather !== 'storm') return;
            
            const bolt = document.createElement('div');
            bolt.className = 'lightning-bolt';
            
            const startLeft = Math.random() * 80 + 10;
            const width = Math.random() * 2 + 2;
            const height = Math.random() * 100 + 100;
            const rotation = Math.random() * 20 - 10;
            
            bolt.style.position = 'absolute';
            bolt.style.top = '0';
            bolt.style.left = `${startLeft}%`;
            bolt.style.width = `${width}px`;
            bolt.style.height = `${height}px`;
            bolt.style.transform = `rotate(${rotation}deg)`;
            bolt.style.opacity = '0';
            
            // Create zigzag branches
            const branches = 3 + Math.floor(Math.random() * 3);
            for (let i = 0; i < branches; i++) {
                const branch = document.createElement('div');
                branch.className = 'lightning-branch';
                
                const branchTop = (i + 1) * (height / (branches + 1));
                const branchWidth = Math.random() * 50 + 20;
                const branchHeight = width * 0.8;
                const branchRotation = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 40 + 20);
                
                branch.style.position = 'absolute';
                branch.style.top = `${branchTop}px`;
                branch.style.left = '0';
                branch.style.width = `${branchWidth}px`;
                branch.style.height = `${branchHeight}px`;
                branch.style.background = 'rgba(255, 255, 255, 0.8)';
                branch.style.transform = `rotate(${branchRotation}deg)`;
                branch.style.transformOrigin = 'left center';
                
                bolt.appendChild(branch);
            }
            
            interactiveElements.appendChild(bolt);
            
            // Lightning flash effect
            setTimeout(() => {
                bolt.style.opacity = '1';
                document.body.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                
                setTimeout(() => {
                    bolt.style.opacity = '0';
                    document.body.style.backgroundColor = '';
                    
                    setTimeout(() => {
                        bolt.style.opacity = '0.7';
                        document.body.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        
                        setTimeout(() => {
                            bolt.style.opacity = '0';
                            document.body.style.backgroundColor = '';
                            
                            setTimeout(() => {
                                bolt.remove();
                                
                                if (currentWeather === 'storm') {
                                    setTimeout(createBolt, Math.random() * 5000 + 2000);
                                }
                            }, 50);
                        }, 50);
                    }, 50);
                }, 100);
            }, 100);
        };
        
        // Create initial lightning after a short delay
        setTimeout(createBolt, Math.random() * 1000 + 500);
    }
    
    function createStars() {
        const starContainer = document.createElement('div');
        starContainer.className = 'star-container';
        starContainer.style.position = 'absolute';
        starContainer.style.top = '0';
        starContainer.style.left = '0';
        starContainer.style.width = '100%';
        starContainer.style.height = '100%';
        starContainer.style.pointerEvents = 'none';
        
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const size = Math.random() * 2 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = Math.random() * 3 + 2;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${left}%`;
            star.style.top = `${top}%`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;
            
            if (Math.random() > 0.7) {
                star.style.boxShadow = '0 0 3px white';
            }
            
            starContainer.appendChild(star);
        }
        
        weatherLayer.appendChild(starContainer);
        
        // Create shooting stars
        const createShootingStar = () => {
            if (currentWeather !== 'night') return;
            
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            
            const left = Math.random() * 80 + 10;
            const top = Math.random() * 40 + 5;
            
            shootingStar.style.position = 'absolute';
            shootingStar.style.left = `${left}%`;
            shootingStar.style.top = `${top}%`;
            shootingStar.style.width = '80px';
            shootingStar.style.height = '2px';
            shootingStar.style.background = 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))';
            shootingStar.style.borderRadius = '2px';
            shootingStar.style.transform = `rotate(${Math.random() * 45 + 15}deg)`;
            shootingStar.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
            shootingStar.style.opacity = '0';
            shootingStar.style.transition = 'transform 1.5s linear, opacity 0.3s ease-in';
            
            interactiveElements.appendChild(shootingStar);
            
            setTimeout(() => {
                shootingStar.style.opacity = '1';
                shootingStar.style.transform = `rotate(${Math.random() * 45 + 15}deg) translateX(${Math.random() * 200 + 100}px)`;
                
                setTimeout(() => {
                    shootingStar.style.opacity = '0';
                    
                    setTimeout(() => {
                        shootingStar.remove();
                        
                        if (currentWeather === 'night') {
                            setTimeout(createShootingStar, Math.random() * 8000 + 2000);
                        }
                    }, 300);
                }, 1500);
            }, 100);
        };
        
        setTimeout(createShootingStar, Math.random() * 2000 + 1000);
    }
    
    function createSnowClouds() {
        for (let i = 0; i < 4; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud-particle';
            
            const size = Math.random() * 90 + 70;
            const top = Math.random() * 30 + 5;
            const speed = Math.random() * 50 + 90;
            const delay = Math.random() * 5;
            
            cloud.style.width = `${size}px`;
            cloud.style.height = `${size / 2}px`;
            cloud.style.top = `${top}%`;
            cloud.style.background = 'linear-gradient(to bottom, #ECEFF1, #CFD8DC)';
            cloud.style.animationDuration = `${speed}s`;
            cloud.style.animationDelay = `${delay}s`;
            
            const innerCloud1 = document.createElement('div');
            innerCloud1.style.position = 'absolute';
            innerCloud1.style.width = `${size * 0.7}px`;
            innerCloud1.style.height = `${size * 0.4}px`;
            innerCloud1.style.borderRadius = '50%';
            innerCloud1.style.top = '-30%';
            innerCloud1.style.left = '20%';
            innerCloud1.style.background = '#ECEFF1';
            
            const innerCloud2 = document.createElement('div');
            innerCloud2.style.position = 'absolute';
            innerCloud2.style.width = `${size * 0.5}px`;
            innerCloud2.style.height = `${size * 0.35}px`;
            innerCloud2.style.borderRadius = '50%';
            innerCloud2.style.top = '-15%';
            innerCloud2.style.left = '50%';
            innerCloud2.style.background = '#ECEFF1';
            
            cloud.appendChild(innerCloud1);
            cloud.appendChild(innerCloud2);
            
            weatherLayer.appendChild(cloud);
        }
    }
    
    function createSnowflakes() {
        const snowContainer = document.createElement('div');
        snowContainer.className = 'snow-container';
        snowContainer.style.position = 'absolute';
        snowContainer.style.top = '0';
        snowContainer.style.left = '0';
        snowContainer.style.width = '100%';
        snowContainer.style.height = '100%';
        snowContainer.style.overflow = 'hidden';
        snowContainer.style.pointerEvents = 'none';
        
        for (let i = 0; i < 80; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            
            const size = Math.random() * 4 + 3;
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 10;
            
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            snowflake.style.left = `${left}%`;
            snowflake.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.8)';
            snowflake.style.animationDuration = `${duration}s`;
            snowflake.style.animationDelay = `${delay}s`;
            
            snowContainer.appendChild(snowflake);
        }
        
        weatherLayer.appendChild(snowContainer);
    }
    
    // Interactive mouse effects - make clouds and weather elements react to mouse
    document.addEventListener('mousemove', function(e) {
        if (currentWeather === 'night') {
            const stars = document.querySelectorAll('.star');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            stars.forEach(star => {
                const size = parseFloat(star.style.width);
                const depth = size * 0.8;
                const moveX = (mouseX - 0.5) * depth * 5;
                const moveY = (mouseY - 0.5) * depth * 5;
                
                star.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        }
    });
    
    // Apply custom animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh);
            }
        }
        
        @keyframes snowfall {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
});
