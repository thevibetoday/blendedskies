document.addEventListener('DOMContentLoaded', function() {
    const moodSelector = document.querySelector('.mood-selector');
    const moodOrb = document.querySelector('.mood-orb');
    const panorama = document.querySelector('.mood-panorama');
    const atmosphereLayer = document.querySelector('.atmosphere-layer');
    const starsContainer = document.querySelector('.stars-container');
    const weatherParticles = document.querySelector('.weather-particles');
    const skyOptions = document.querySelectorAll('.sky-option');
    const sliderTrack = document.querySelector('.slider-track');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    const navbar = document.querySelector('.cosmic-navbar');
    const orbInner = document.querySelector('.orb-inner');
    const orbEmoji = document.querySelector('.orb-emoji');
    const activeImage = document.querySelector('.mood-image');
    const activeTitle = document.querySelector('.mood-title');
    const moodTag = document.querySelector('.mood-tag');
    const brandName = document.querySelector('.brand-name');
    const contentArea = document.querySelector('.content-area');
    
    let isOpen = false;
    let currentSky = null;
    let currentSlide = 0;
    let maxSlide = skyOptions.length - 1;
    let slideWidth = 170;
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    
    createStars();
    initializeSkyOptions();
    
    function toggleMoodPanel() {
        isOpen = !isOpen;
        
        if (isOpen) {
            panorama.classList.add('open');
            atmosphereLayer.classList.add('active');
            starsContainer.classList.add('active');
            navbar.classList.add('expanded');
            contentArea.style.opacity = '0.2';
            document.body.style.overflow = 'hidden';
            moodOrb.classList.add('active');
            
            setTimeout(() => {
                initializeActiveMood(skyOptions[0]);
            }, 300);
        } else {
            panorama.classList.remove('open');
            atmosphereLayer.classList.remove('active');
            starsContainer.classList.remove('active');
            navbar.classList.remove('expanded');
            contentArea.style.opacity = '1';
            document.body.style.overflow = '';
            moodOrb.classList.remove('active');
        }
    }
    
    function initializeSkyOptions() {
        skyOptions.forEach((option, index) => {
            const preview = option.querySelector('.sky-preview');
            if (preview && preview.querySelector('img')) {
                const img = preview.querySelector('img').cloneNode(true);
                if (index === 0) {
                    option.classList.add('active');
                    orbEmoji.innerHTML = '';
                    orbEmoji.appendChild(img.cloneNode(true));
                }
            }
            
            option.addEventListener('click', function() {
                setActiveSky(this, index);
            });
        });
    }
    
    function initializeActiveMood(skyOption) {
        if (!skyOption) return;
        
        const skyType = skyOption.getAttribute('data-sky');
        const moodType = skyOption.getAttribute('data-mood');
        const skyImg = skyOption.querySelector('.sky-preview img');
        
        if (skyImg) {
            activeImage.innerHTML = '';
            activeImage.appendChild(skyImg.cloneNode(true));
        }
        
        activeTitle.textContent = skyOption.querySelector('.sky-details h3').textContent;
        moodTag.textContent = moodType;
        
        skyOptions.forEach(opt => opt.classList.remove('active'));
        skyOption.classList.add('active');
        
        updateSliderPosition(parseInt(skyOption.getAttribute('data-index')));
    }
    
    function setActiveSky(skyOption, index) {
        if (!skyOption) return;
        
        const skyType = skyOption.getAttribute('data-sky');
        const moodType = skyOption.getAttribute('data-mood');
        const skyImg = skyOption.querySelector('.sky-preview img');
        
        currentSky = {
            type: skyType,
            mood: moodType,
            index: index
        };
        
        initializeActiveMood(skyOption);
        
        if (skyImg) {
            orbEmoji.innerHTML = '';
            orbEmoji.appendChild(skyImg.cloneNode(true));
        }
        
        orbInner.style.opacity = '0';
        orbEmoji.style.opacity = '1';
        
        applySkyEffect(skyType);
        createWeatherParticles(skyType);
    }
    
    function applySkyEffect(skyType) {
        document.body.className = '';
        document.body.classList.add(`sky-${skyType}`);
        
        let navbarBg, atmosphereBg;
        
        switch(skyType) {
            case 'clear-blue':
                navbarBg = 'rgba(240, 248, 255, 0.9)';
                atmosphereBg = 'linear-gradient(to bottom, rgba(135, 206, 235, 0.2), rgba(255, 255, 255, 0.8))';
                break;
            case 'sunset-glow':
                navbarBg = 'rgba(255, 248, 240, 0.9)';
                atmosphereBg = 'linear-gradient(to bottom, rgba(255, 111, 0, 0.1), rgba(255, 255, 255, 0.7))';
                break;
            case 'storm-brewing':
                navbarBg = 'rgba(240, 240, 240, 0.9)';
                atmosphereBg = 'linear-gradient(to bottom, rgba(105, 105, 105, 0.2), rgba(255, 255, 255, 0.7))';
                break;
            case 'starry-night':
                navbarBg = 'rgba(25, 25, 112, 0.8)';
                atmosphereBg = 'linear-gradient(to bottom, rgba(25, 25, 112, 0.3), rgba(25, 25, 112, 0.1))';
                break;
            case 'rainbow-sky':
                navbarBg = 'rgba(250, 250, 255, 0.9)';
                atmosphereBg = 'linear-gradient(to bottom, rgba(255, 105, 180, 0.1), rgba(255, 255, 255, 0.7))';
                break;
            default:
                navbarBg = 'rgba(255, 255, 255, 0.9)';
                atmosphereBg = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.5))';
        }
        
        navbar.style.backgroundColor = navbarBg;
        atmosphereLayer.style.background = atmosphereBg;
        
        if (skyType === 'starry-night') {
            brandName.style.background = 'linear-gradient(135deg, #cccce0, #ffffff)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            document.body.style.color = '#e0e0ff';
        } else {
            brandName.style.background = 'linear-gradient(135deg, #1E90FF, #87CEEB)';
            navbar.style.boxShadow = '';
            document.body.style.color = '';
        }
    }
    
    function createStars() {
        starsContainer.innerHTML = '';
        const starsCount = window.innerWidth < 768 ? 50 : 100;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
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
    
    function createWeatherParticles(skyType) {
        weatherParticles.innerHTML = '';
        
        if (skyType === 'clear-blue') {
            createClouds();
        } else if (skyType === 'sunset-glow') {
            createEmbers();
        } else if (skyType === 'storm-brewing') {
            createRaindrops();
        } else if (skyType === 'starry-night') {
            createShootingStars();
        } else if (skyType === 'rainbow-sky') {
            createSnowflakes();
        }
    }
    
    function createClouds() {
        for (let i = 0; i < 5; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'particle cloud';
            
            const size = Math.random() * 80 + 40;
            const x = Math.random() * 100;
            const y = Math.random() * 50;
            const speed = Math.random() * 50 + 20;
            
            cloud.style.width = `${size}px`;
            cloud.style.height = `${size / 2}px`;
            cloud.style.left = `${x}%`;
            cloud.style.top = `${y}%`;
            cloud.style.borderRadius = '50%';
            cloud.style.background = 'rgba(255, 255, 255, 0.7)';
            cloud.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
            cloud.style.animation = `float ${speed}s linear infinite`;
            
            weatherParticles.appendChild(cloud);
        }
    }
    
    function createEmbers() {
        for (let i = 0; i < 20; i++) {
            const ember = document.createElement('div');
            ember.className = 'particle ember';
            
            const size = Math.random() * 6 + 2;
            const x = Math.random() * 100;
            const startY = 70 + Math.random() * 30;
            const duration = Math.random() * 10 + 5;
            
            ember.style.width = `${size}px`;
            ember.style.height = `${size}px`;
            ember.style.left = `${x}%`;
            ember.style.bottom = `${startY}%`;
            ember.style.borderRadius = '50%';
            ember.style.background = `rgba(${Math.floor(Math.random() * 55 + 200)}, ${Math.floor(Math.random() * 100)}, 0, ${Math.random() * 0.5 + 0.2})`;
            ember.style.boxShadow = `0 0 ${size * 2}px rgba(255, ${Math.floor(Math.random() * 150)}, 0, 0.5)`;
            ember.style.animation = `floatUp ${duration}s ease-in infinite`;
            
            weatherParticles.appendChild(ember);
        }
    }
    
    function createRaindrops() {
        for (let i = 0; i < 50; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'particle raindrop';
            
            const width = Math.random() * 1 + 1;
            const height = Math.random() * 10 + 10;
            const x = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = Math.random() * 0.5 + 0.5;
            const opacity = Math.random() * 0.4 + 0.2;
            
            raindrop.style.width = `${width}px`;
            raindrop.style.height = `${height}px`;
            raindrop.style.left = `${x}%`;
            raindrop.style.top = `-50px`;
            raindrop.style.opacity = opacity;
            raindrop.style.background = 'linear-gradient(to bottom, rgba(120, 120, 120, 0), rgba(120, 120, 120, 1))';
            raindrop.style.animation = `rain ${duration}s linear ${delay}s infinite`;
            
            weatherParticles.appendChild(raindrop);
        }
    }
    
    function createShootingStars() {
        for (let i = 0; i < 5; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'particle shooting-star';
            
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 50;
            const delay = Math.random() * 10;
            const duration = Math.random() * 2 + 1;
            
            shootingStar.style.width = `${size}px`;
            shootingStar.style.height = `${size * 15}px`;
            shootingStar.style.left = `${x}%`;
            shootingStar.style.top = `${y}%`;
            shootingStar.style.opacity = 0;
            shootingStar.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%)';
            shootingStar.style.borderRadius = `${size}px`;
            shootingStar.style.transform = `rotate(${Math.random() * 45 + 15}deg)`;
            shootingStar.style.animation = `shootingStar ${duration}s linear ${delay}s infinite`;
            
            weatherParticles.appendChild(shootingStar);
        }
    }
    
    function createSnowflakes() {
        for (let i = 0; i < 30; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'particle snowflake';
            
            const size = Math.random() * 5 + 2;
            const x = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 5;
            
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            snowflake.style.left = `${x}%`;
            snowflake.style.top = `-20px`;
            snowflake.style.opacity = Math.random() * 0.7 + 0.3;
            snowflake.style.borderRadius = '50%';
            snowflake.style.background = 'white';
            snowflake.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.8)';
            snowflake.style.animation = `snowfall ${duration}s linear ${delay}s infinite`;
            
            weatherParticles.appendChild(snowflake);
        }
    }
    
    function updateSliderPosition(index) {
        if (index < 0) index = 0;
        if (index > maxSlide) index = maxSlide;
        
        currentSlide = index;
        
        const translateValue = -currentSlide * slideWidth;
        sliderTrack.style.transform = `translateX(${translateValue}px)`;
    }
    
    function setupListeners() {
        moodSelector.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMoodPanel();
        });
        
        atmosphereLayer.addEventListener('click', function(e) {
            if (isOpen) toggleMoodPanel();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) {
                toggleMoodPanel();
            }
        });
        
        moodSelector.addEventListener('mouseenter', function() {
            if (!orbEmoji.firstChild) return;
            orbEmoji.style.opacity = '1';
            orbInner.style.opacity = '0';
        });
        
        moodSelector.addEventListener('mouseleave', function() {
            if (!moodOrb.classList.contains('active')) {
                orbEmoji.style.opacity = '0';
                orbInner.style.opacity = '1';
            }
        });
        
        if (sliderPrev) {
            sliderPrev.addEventListener('click', function() {
                if (currentSlide > 0) {
                    updateSliderPosition(currentSlide - 1);
                    setActiveSky(skyOptions[currentSlide], currentSlide);
                }
            });
        }
        
        if (sliderNext) {
            sliderNext.addEventListener('click', function() {
                if (currentSlide < maxSlide) {
                    updateSliderPosition(currentSlide + 1);
                    setActiveSky(skyOptions[currentSlide], currentSlide);
                }
            });
        }
        
        skyOptions.forEach((option, index) => {
            option.setAttribute('data-index', index);
        });
        
        sliderTrack.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            isDragging = true;
        });
        
        sliderTrack.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            touchEndX = e.touches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            const translateValue = -currentSlide * slideWidth - diff * 0.5;
            if (Math.abs(diff) < slideWidth) {
                sliderTrack.style.transform = `translateX(${translateValue}px)`;
            }
        });
        
        sliderTrack.addEventListener('touchend', function() {
            isDragging = false;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentSlide < maxSlide) {
                    updateSliderPosition(currentSlide + 1);
                    setActiveSky(skyOptions[currentSlide], currentSlide);
                } else if (diff < 0 && currentSlide > 0) {
                    updateSliderPosition(currentSlide - 1);
                    setActiveSky(skyOptions[currentSlide], currentSlide);
                } else {
                    updateSliderPosition(currentSlide);
                }
            } else {
                updateSliderPosition(currentSlide);
            }
        });
        
        window.addEventListener('resize', function() {
            adjustForScreenSize();
            createStars();
            if (currentSky) {
                createWeatherParticles(currentSky.type);
            }
        });
        
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
                if (!currentSky || currentSky.type !== 'starry-night') {
                    navbar.style.boxShadow = 'none';
                }
                if (window.innerWidth > 480) {
                    navbar.style.height = '70px';
                } else {
                    navbar.style.height = '60px';
                }
            }
        });
        
        starsContainer.addEventListener('mousemove', function(e) {
            if (!starsContainer.classList.contains('active')) return;
            
            const stars = document.querySelectorAll('.star');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            stars.forEach(star => {
                const depth = parseFloat(star.style.width) / 3;
                const moveX = (mouseX - 0.5) * depth * 2;
                const moveY = (mouseY - 0.5) * depth * 2;
                
                star.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
        
        brandName.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    function adjustForScreenSize() {
        if (window.innerWidth <= 768) {
            slideWidth = 140;
        } else {
            slideWidth = 170;
        }
        
        updateSliderPosition(currentSlide);
    }
    
    function initializeStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(10px, 0); }
            }
            
            @keyframes floatUp {
                0% { transform: translateY(0) scale(1); opacity: 1; }
                100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
            }
            
            @keyframes rain {
                0% { transform: translateY(-10px); }
                100% { transform: translateY(calc(100vh + 50px)); }
            }
            
            @keyframes shootingStar {
                0% { transform: translateX(0) translateY(0) rotate(45deg); opacity: 0; }
                10% { opacity: 1; }
                100% { transform: translateX(-200px) translateY(200px) rotate(45deg); opacity: 0; }
            }
            
            @keyframes snowfall {
                0% { transform: translateY(0) rotate(0deg); }
                100% { transform: translateY(calc(100vh + 30px)) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    initializeStyles();
    adjustForScreenSize();
    setupListeners();
    
    if (skyOptions[0]) {
        setActiveSky(skyOptions[0], 0);
    }
});
