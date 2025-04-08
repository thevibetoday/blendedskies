document.addEventListener('DOMContentLoaded', () => {
    const aboutContainer = document.getElementById('cosmicAbout');
    const galaxyParticles = document.querySelector('.galaxy-particles');

    // Parallax and Particle Generation
    function generateParticles() {
        const particleCount = 150;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('cosmic-particle');
            
            // Random positioning
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 3}px`;
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = 'rgba(255,255,255,0.6)';
            particle.style.borderRadius = '50%';
            
            // Randomize position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Add subtle animations
            particle.style.animation = `particle-drift ${5 + Math.random() * 10}s linear infinite`;
            particle.style.opacity = `${0.2 + Math.random() * 0.6}`;
            
            galaxyParticles.appendChild(particle);
        }
    }

    // Parallax Effect
    function handleParallax(e) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (e.clientX - centerX) / 50;
        const moveY = (e.clientY - centerY) / 50;
        
        aboutContainer.style.transform = `
            perspective(1000px) 
            rotateX(${-moveY}deg) 
            rotateY(${moveX}deg)
        `;
    }

    // Intersection Observer for Scroll-Based Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                generateParticles();
                document.addEventListener('mousemove', handleParallax);
            } else {
                entry.target.classList.remove('visible');
                document.removeEventListener('mousemove', handleParallax);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe the about container
    if (aboutContainer) {
        observer.observe(aboutContainer);
    }

    // Feature Card Hover Effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05) translateY(-15px)';
            card.style.boxShadow = '0 15px 30px rgba(65, 105, 225, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
});
