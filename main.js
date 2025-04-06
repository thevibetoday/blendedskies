document.addEventListener('DOMContentLoaded', function() {
    const atmosphereBar = document.querySelector('.atmosphere-bar');
    const moodQuestion = document.querySelector('.mood-question');
    const moodToggle = document.querySelector('.mood-toggle');
    const weatherEmotions = document.querySelector('.weather-emotions');
    const emotionSelector = document.querySelector('.emotion-selector');
    const emotionOptions = document.querySelectorAll('.emotion-option');
    const closeEmotions = document.querySelector('.close-emotions');
    const brand = document.querySelector('.brand');
    const weatherBackdrops = document.querySelectorAll('.weather-backdrop');
    
    let currentEmotion = 'clear';
    let isEmotionSelectorOpen = false;
    
    initializeWeather();
    
    function initializeWeather() {
        const activeBackdrop = document.querySelector(`.weather-effect-${currentEmotion}`);
        if (activeBackdrop) {
            activeBackdrop.classList.add('active');
        }
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                atmosphereBar.classList.add('scrolled');
                if (moodQuestion) {
                    moodQuestion.classList.add('hidden');
                }
            } else {
                atmosphereBar.classList.remove('scrolled');
                if (moodQuestion) {
                    moodQuestion.classList.remove('hidden');
                }
            }
        });
        
        if (moodToggle) {
            moodToggle.addEventListener('click', toggleEmotionSelector);
        }
        
        if (closeEmotions) {
            closeEmotions.addEventListener('click', toggleEmotionSelector);
        }
        
        emotionOptions.forEach(option => {
            option.addEventListener('click', function() {
                const emotion = this.getAttribute('data-emotion');
                if (emotion) {
                    changeEmotion(emotion);
                    toggleEmotionSelector();
                }
            });
            
            option.addEventListener('mouseenter', handleOptionHover);
        });
        
        if (brand) {
            brand.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isEmotionSelectorOpen) {
                toggleEmotionSelector();
            }
        });
        
        if (weatherEmotions) {
            weatherEmotions.addEventListener('click', function(e) {
                if (e.target === weatherEmotions) {
                    toggleEmotionSelector();
                }
            });
        }
    }
    
    function handleOptionHover() {
        const option = this;
        const backdrop = option.querySelector('.emotion-backdrop');
        if (!backdrop) return;
        
        const emotionRect = option.getBoundingClientRect();
        
        function handleMouseMove(e) {
            const x = e.clientX - emotionRect.left;
            const y = e.clientY - emotionRect.top;
            
            const xPercent = x / emotionRect.width;
            const yPercent = y / emotionRect.height;
            
            const moveX = (xPercent - 0.5) * 10;
            const moveY = (yPercent - 0.5) * 10;
            
            backdrop.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        }
        
        function handleMouseLeave() {
            backdrop.style.transform = '';
            option.removeEventListener('mousemove', handleMouseMove);
            option.removeEventListener('mouseleave', handleMouseLeave);
        }
        
        option.addEventListener('mousemove', handleMouseMove);
        option.addEventListener('mouseleave', handleMouseLeave);
    }
    
    function toggleEmotionSelector() {
        isEmotionSelectorOpen = !isEmotionSelectorOpen;
        
        if (isEmotionSelectorOpen) {
            document.body.style.overflow = 'hidden';
            weatherEmotions.classList.add('active');
        } else {
            document.body.style.overflow = '';
            setTimeout(() => {
                weatherEmotions.classList.remove('active');
            }, 300);
        }
    }
    
    function changeEmotion(emotion) {
        if (emotion === currentEmotion) return;
        
        // Find and update the active backdrop
        const oldBackdrop = document.querySelector(`.weather-effect-${currentEmotion}`);
        const newBackdrop = document.querySelector(`.weather-effect-${emotion}`);
        
        if (oldBackdrop) {
            oldBackdrop.classList.remove('active');
        }
        
        if (newBackdrop) {
            newBackdrop.classList.add('active');
        }
        
        updateAtmosphere(emotion);
        addTransitionEffect();
        
        currentEmotion = emotion;
    }
    
    function updateAtmosphere(emotion) {
        const atmosphereBackdrop = document.querySelector('.atmosphere-backdrop');
        if (!atmosphereBackdrop || !moodToggle) return;
        
        switch(emotion) {
            case 'clear':
                atmosphereBackdrop.style.background = 'rgba(255, 255, 255, 0.9)';
                moodToggle.style.background = 'linear-gradient(135deg, rgba(130, 180, 255, 0.1), rgba(40, 80, 170, 0.1))';
                moodToggle.style.borderColor = 'rgba(130, 180, 255, 0.2)';
                break;
                
            case 'energetic':
                atmosphereBackdrop.style.background = 'rgba(255, 250, 245, 0.9)';
                moodToggle.style.background = 'linear-gradient(135deg, rgba(255, 200, 0, 0.1), rgba(255, 100, 50, 0.1))';
                moodToggle.style.borderColor = 'rgba(255, 150, 50, 0.2)';
                break;
                
            case 'tranquil':
                atmosphereBackdrop.style.background = 'rgba(240, 250, 255, 0.9)';
                moodToggle.style.background = 'linear-gradient(135deg, rgba(160, 210, 220, 0.1), rgba(220, 240, 255, 0.1))';
                moodToggle.style.borderColor = 'rgba(160, 210, 220, 0.2)';
                break;
                
            case 'melancholy':
                atmosphereBackdrop.style.background = 'rgba(245, 245, 250, 0.9)';
                moodToggle.style.background = 'linear-gradient(135deg, rgba(100, 110, 140, 0.1), rgba(150, 160, 190, 0.1))';
                moodToggle.style.borderColor = 'rgba(100, 110, 140, 0.2)';
                break;
                
            case 'awed':
                atmosphereBackdrop.style.background = 'rgba(245, 240, 255, 0.9)';
                moodToggle.style.background = 'linear-gradient(135deg, rgba(100, 50, 150, 0.1), rgba(150, 100, 200, 0.1))';
                moodToggle.style.borderColor = 'rgba(100, 50, 150, 0.2)';
                break;
                
            case 'mysterious':
                atmosphereBackdrop.style.background = 'rgba(235, 240, 255, 0.9)';
                moodToggle.style.background = 'linear-gradient(135deg, rgba(30, 50, 100, 0.1), rgba(70, 90, 140, 0.1))';
                moodToggle.style.borderColor = 'rgba(30, 50, 100, 0.2)';
                break;
        }
    }
    
    function addTransitionEffect() {
        const transitionElement = document.createElement('div');
        transitionElement.style.position = 'fixed';
        transitionElement.style.top = '0';
        transitionElement.style.left = '0';
        transitionElement.style.width = '100%';
        transitionElement.style.height = '100%';
        transitionElement.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        transitionElement.style.pointerEvents = 'none';
        transitionElement.style.zIndex = '999';
        transitionElement.style.opacity = '0';
        
        document.body.appendChild(transitionElement);
        
        setTimeout(() => {
            transitionElement.style.transition = 'opacity 0.4s ease';
            transitionElement.style.opacity = '0.3';
            
            setTimeout(() => {
                transitionElement.style.opacity = '0';
                
                setTimeout(() => {
                    transitionElement.remove();
                }, 400);
            }, 400);
        }, 10);
    }
});
