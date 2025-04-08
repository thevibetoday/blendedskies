// Sky effects application
document.addEventListener('DOMContentLoaded', function() {
    // Apply sky effect to page - making it available globally
    window.applySkyEffect = function(skyType) {
        // Reset any previous effects
        document.body.className = '';
        
        // Apply effect based on sky type
        document.body.classList.add(`sky-${skyType}`);
        
        // Subtle background color transition
        let bgColor;
        
        switch(skyType) {
            case 'clear-blue':
                bgColor = 'rgba(240, 248, 255, 0.3)';
                break;
            case 'sunset-glow':
                bgColor = 'rgba(255, 222, 173, 0.3)';
                break;
            case 'storm-brewing':
                bgColor = 'rgba(211, 211, 211, 0.3)';
                break;
            case 'starry-night':
                bgColor = 'rgba(25, 25, 112, 0.05)';
                break;
            case 'rainbow-sky':
                bgColor = 'rgba(255, 250, 250, 0.3)';
                break;
            default:
                bgColor = 'rgba(255, 255, 255, 1)';
        }
        
        document.body.style.backgroundColor = bgColor;
        
        // Animation to show the effect was applied
        const contentArea = document.querySelector('.content-area');
        if (contentArea) {
            contentArea.style.transition = 'transform 0.5s ease';
            contentArea.style.transform = 'translateY(5px)';
            
            setTimeout(() => {
                contentArea.style.transform = 'translateY(0)';
            }, 500);
        }
    };
});
