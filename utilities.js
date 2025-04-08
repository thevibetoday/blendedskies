// Common utility functions
window.createRipple = function(element, color = 'rgba(135, 206, 250, 0.3)') {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '100%';
    ripple.style.height = '100%';
    ripple.style.borderRadius = 'inherit';
    ripple.style.backgroundColor = color;
    ripple.style.transform = 'scale(0)';
    ripple.style.opacity = '1';
    ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    
    element.appendChild(ripple);
    
    // Trigger the animation
    setTimeout(() => {
        ripple.style.transform = 'scale(3)';
        ripple.style.opacity = '0';
    }, 10);
    
    // Remove the ripple element after animation
    setTimeout(() => {
        if (element.contains(ripple)) {
            element.removeChild(ripple);
        }
    }, 700);
};

// Create lightning effect
window.createLightning = function() {
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    document.body.appendChild(lightning);
    
    // Flash effect
    setTimeout(() => { lightning.style.opacity = '1'; }, 100);
    setTimeout(() => { lightning.style.opacity = '0'; }, 200);
    setTimeout(() => { lightning.style.opacity = '0.8'; }, 300);
    setTimeout(() => { lightning.style.opacity = '0'; }, 400);
    
    // Cleanup
    setTimeout(() => {
        if (document.body.contains(lightning)) {
            document.body.removeChild(lightning);
        }
    }, 1000);
};

// Create snowflakes
window.createSnowflakes = function() {
    const container = document.querySelector('.sky-quiz-container');
    
    for (let i = 0; i < 40; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        
        const size = Math.random() * 15 + 8;
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 5 + 8;
        
        snowflake.style.fontSize = `${size}px`;
        snowflake.style.left = `${left}%`;
        snowflake.style.animationDelay = `${delay}s`;
        snowflake.style.animationDuration = `${duration}s`;
        
        container.appendChild(snowflake);
        
        // Fade in the snowflake
        setTimeout(() => {
            snowflake.style.opacity = '0.8';
        }, delay * 1000);
        
        // Clean up after animation
        setTimeout(() => {
            if (container.contains(snowflake)) {
                container.removeChild(snowflake);
            }
        }, (delay + duration) * 1000);
    }
};
