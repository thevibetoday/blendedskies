// Star creation and animation
document.addEventListener('DOMContentLoaded', function() {
    const starsContainer = document.querySelector('.stars-container');
    
    // Create stars in the background
    createStars();
    
    // Create stars function
    function createStars() {
        // Clear existing stars first
        starsContainer.innerHTML = '';
        
        const starsCount = window.innerWidth < 768 ? 50 : 100;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random star properties
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
    
    // Add a subtle parallax effect to the stars when moving mouse
    document.addEventListener('mousemove', function(e) {
        if (!starsContainer.classList.contains('active')) return;
        
        const stars = document.querySelectorAll('.star');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        stars.forEach(star => {
            const depth = parseFloat(star.style.width) / 3; // Bigger stars move more
            const moveX = (mouseX - 0.5) * depth;
            const moveY = (mouseY - 0.5) * depth;
            
            star.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Adjust stars for window size
        createStars();
    });
});
