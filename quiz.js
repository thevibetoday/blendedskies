// Quiz Functionality
document.addEventListener('DOMContentLoaded', function() {
    const questionContainers = document.querySelectorAll('.question-container');
    const answerCards = document.querySelectorAll('.answer-card');
    const skyQuizContainer = document.getElementById('skyQuiz');
    
    let currentQuestion = 1;
    let weatherEffects = [];
    
    // Initialize clouds
    createClouds();
    
    // Handle answer selection
    answerCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add selected class with animation
            this.classList.add('selected');
            
            // Get all siblings (other answers in same question)
            const siblings = Array.from(this.parentNode.children).filter(child => child !== this);
            siblings.forEach(sibling => {
                sibling.style.opacity = '0.5';
                sibling.style.transform = 'scale(0.95)';
                sibling.style.pointerEvents = 'none';
            });
            
            // Apply weather effect if it's the first question
            if (currentQuestion === 1) {
                const weatherType = this.getAttribute('data-weather');
                if (weatherType) {
                    applyWeatherEffect(weatherType);
                }
            }
            
            // Create ripple effect
            createRipple(this);
            
            // Wait and move to next question
            setTimeout(() => {
                const currentContainer = document.querySelector(`.question-container[data-question="${currentQuestion}"]`);
                currentContainer.classList.remove('active');
                
                currentQuestion++;
                
                if (currentQuestion <= questionContainers.length) {
                    const nextContainer = document.querySelector(`.question-container[data-question="${currentQuestion}"]`);
                    const bgColor = nextContainer.getAttribute('data-bg');
                    
                    // Change background color smoothly
                    skyQuizContainer.style.backgroundColor = bgColor;
                    
                    // Show next question
                    setTimeout(() => {
                        nextContainer.classList.add('active');
                        
                        // Reset all answer cards in the new question
                        const newAnswers = nextContainer.querySelectorAll('.answer-card');
                        newAnswers.forEach(answer => {
                            answer.style.opacity = '1';
                            answer.style.transform = 'translateY(0)';
                            answer.style.pointerEvents = 'auto';
                        });
                    }, 300);
                }
            }, 600);
        });
    });
    
    // Create floating clouds
    function createClouds() {
        const container = document.querySelector('.sky-quiz-container');
        
        for (let i = 0; i < 8; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            
            // Random cloud properties
            const size = Math.random() * 100 + 50;
            const top = Math.random() * 100;
            const opacity = Math.random() * 0.5 + 0.3;
            const duration = Math.random() * 60 + 60;
            const delay = Math.random() * 60;
            
            cloud.style.width = `${size}px`;
            cloud.style.height = `${size * 0.6}px`;
            cloud.style.top = `${top}%`;
            cloud.style.opacity = opacity;
            cloud.style.animationDuration = `${duration}s`;
            cloud.style.animationDelay = `-${delay}s`;
            
            container.appendChild(cloud);
        }
    }
    
    // Create ripple effect
    function createRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.borderRadius = 'inherit';
        ripple.style.backgroundColor = 'rgba(135, 206, 235, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.opacity = '1';
        ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        
        element.appendChild(ripple);
        
        // Trigger animation
        setTimeout(() => {
            ripple.style.transform = 'scale(2)';
            ripple.style.opacity = '0';
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
            element.removeChild(ripple);
        }, 700);
    }
    
    // Apply weather effects based on selection
    function applyWeatherEffect(weatherType) {
        const container = document.querySelector('.sky-quiz-container');
        
        // Clear previous effects
        weatherEffects.forEach(effect => {
            if (effect && effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        });
        weatherEffects = [];
        
        switch(weatherType) {
            case 'clear':
                // Create sunshine effect
                const sun = document.createElement('div');
                sun.className = 'sunshine';
                sun.style.top = '15%';
                sun.style.right = '15%';
                container.appendChild(sun);
                weatherEffects.push(sun);
                
                // Change background
                container.style.backgroundColor = '#e6f7ff';
                break;
                
            case 'partly-cloudy':
                // Add more pronounced clouds
                for (let i = 0; i < 4; i++) {
                    const cloud = document.createElement('div');
                    cloud.className = 'cloud';
                    
                    const size = Math.random() * 150 + 100;
                    const top = Math.random() * 70;
                    const left = Math.random() * 70;
                    const opacity = Math.random() * 0.3 + 0.5;
                    
                    cloud.style.width = `${size}px`;
                    cloud.style.height = `${size * 0.6}px`;
                    cloud.style.top = `${top}%`;
                    cloud.style.left = `${left}%`;
                    cloud.style.opacity = opacity;
                    cloud.style.animation = 'none';
                    cloud.style.transform = 'translateX(0)';
                    
                    container.appendChild(cloud);
                    weatherEffects.push(cloud);
                }
                
                // Change background
                container.style.backgroundColor = '#f0f6fa';
                break;
                
            case 'rainy':
                // Create rain drops
                for (let i = 0; i < 80; i++) {
                    const drop = document.createElement('div');
                    drop.className = 'rain-drop';
                    
                    const height = Math.random() * 15 + 10;
                    const left = Math.random() * 100;
                    const delay = Math.random() * 5;
                    const duration = Math.random() * 1 + 1;
                    
                    drop.style.height = `${height}px`;
                    drop.style.left = `${left}%`;
                    drop.style.animationDelay = `${delay}s`;
                    drop.style.animationDuration = `${duration}s`;
                    
                    container.appendChild(drop);
                    weatherEffects.push(drop);
                    
                    // Fade in the drop
                    setTimeout(() => {
                        drop.style.opacity = '0.7';
                    }, delay * 1000);
                }
                
                // Change background
                container.style.backgroundColor = '#d4e2f9';
                break;
                
            case 'sunset':
                // Create sunset gradient
                container.style.background = 'linear-gradient(to bottom, #ff9e7a, #ffb88c, #ffd8be, #ffeddf)';
                
                // Add colored clouds
                for (let i = 0; i < 5; i++) {
                    const cloud = document.createElement('div');
                    cloud.className = 'cloud';
                    
                    const size = Math.random() * 200 + 100;
                    const top = Math.random() * 50 + 10;
                    const left = Math.random() * 80;
                    const colors = ['#ffb88c', '#ff9e7a', '#ffb28c', '#ffa77a'];
                    const colorIndex = Math.floor(Math.random() * colors.length);
                    
                    cloud.style.width = `${size}px`;
                    cloud.style.height = `${size * 0.5}px`;
                    cloud.style.top = `${top}%`;
                    cloud.style.left = `${left}%`;
                    cloud.style.backgroundColor = colors[colorIndex];
                    cloud.style.opacity = '0.7';
                    cloud.style.animation = 'none';
                    cloud.style.transform = 'translateX(0)';
                    
                    container.appendChild(cloud);
                    weatherEffects.push(cloud);
                }
                break;
        }
    }
});
