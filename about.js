document.addEventListener('DOMContentLoaded', () => {
    const aboutContainer = document.getElementById('blendOfSkiesAbout');
    const clothingItems = document.querySelectorAll('.clothing-item');

    // Clothing Item Reveal Animation
    function revealClothingItems() {
        clothingItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1) rotate(0deg)';
            }, 300 * (index + 1));
        });
    }

    // Parallax Effect
    function handleParallax(e) {
        if (!aboutContainer) return;

        const containerRect = aboutContainer.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        const centerY = containerRect.top + containerRect.height / 2;
        
        const moveX = (e.clientX - centerX) / 50;
        const moveY = (e.clientY - centerY) / 50;
        
        clothingItems.forEach((item, index) => {
            const multiplier = index + 1;
            item.style.transform = `
                translateX(${moveX * multiplier}px) 
                translateY(${moveY * multiplier}px)
                rotate(${(index - 1) * 3}deg)
            `;
        });
    }

    // Intersection Observer for Scroll-Based Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealClothingItems();
                document.addEventListener('mousemove', handleParallax);
            } else {
                document.removeEventListener('mousemove', handleParallax);
                clothingItems.forEach(item => {
                    item.style.transform = 'scale(0.8) rotate(10deg)';
                });
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
            card.style.boxShadow = '0 15px 30px rgba(52, 152, 219, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
});
