// Neural Navigation Interface
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const neuralSurface = document.querySelector('.nav-neural-surface');
    const neuralBackdrop = document.querySelector('.neural-backdrop');
    const neuralNodes = document.querySelectorAll('.neural-node');
    const visualizations = document.querySelectorAll('.data-visualization');
    const backButtons = document.querySelectorAll('.back-button');
    const dataPoints = document.querySelector('.data-points');
    const brandFloat = document.querySelector('.brand-float');
    
    // Check if elements exist
    if (!neuralSurface || !neuralBackdrop || !dataPoints) {
        console.error('Required elements missing');
        return;
    }
    
    // State
    let isNavActive = false;
    let currentVisualization = null;
    
    // Initialize
    createDataPoints();
    addNodeHoverEffects();
    
    // Toggle neural navigation
    neuralSurface.addEventListener('click', function(e) {
        // Prevent click propagation if clicking on a node
        if (e.target.classList.contains('neural-node') || 
            e.target.closest('.neural-node')) {
            return;
        }
        
        toggleNavigation();
    });
    
    // Close navigation when clicking on backdrop
    neuralBackdrop.addEventListener('click', function() {
        if (isNavActive) {
            toggleNavigation();
        }
    });
    
    // Node click handlers
    neuralNodes.forEach(node => {
        node.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering parent click
            
            // Get sky type
            const skyType = this.getAttribute('data-sky');
            
            // Show the corresponding visualization
            showVisualization(skyType);
            
            // Close the navigation
            if (isNavActive) {
                toggleNavigation();
            }
        });
    });
    
    // Back button click handlers
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            hideAllVisualizations();
        });
    });
    
    // Brand click handler - reset/home
    brandFloat.addEventListener('click', function() {
        hideAllVisualizations();
        
        if (isNavActive) {
            toggleNavigation();
        }
        
        // Scroll to top with smooth animation
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Escape key to close navigation or visualizations
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (currentVisualization) {
                hideAllVisualizations();
            } else if (isNavActive) {
                toggleNavigation();
            }
        }
    });
    
    // Toggle neural navigation state
    function toggleNavigation() {
        isNavActive = !isNavActive;
        
        if (isNavActive) {
            // Activate neural surface
            neuralSurface.classList.add('active');
            neuralBackdrop.classList.add('active');
            
            // Add subtle page effect
            document.body.style.overflow = 'hidden';
        } else {
            // Deactivate neural surface
            neuralSurface.classList.remove('active');
            neuralBackdrop.classList.remove('active');
            
            // Remove page effect
            document.body.style.overflow = '';
        }
    }
    
    // Show a visualization screen
    function showVisualization(skyType) {
        // Hide any active visualization first
        hideAllVisualizations();
        
        // Find and show the new visualization
        const vizElement = document.getElementById(`visualization-${skyType}`);
        if (vizElement) {
            vizElement.classList.add('active');
            currentVisualization = vizElement;
            
            // Prevent page scrolling
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Hide all visualizations
    function hideAllVisualizations() {
        visualizations.forEach(viz => {
            viz.classList.remove('active');
        });
        
        currentVisualization = null;
        
        // Allow page scrolling again (unless nav is active)
        if (!isNavActive) {
            document.body.style.overflow = '';
        }
    }
    
    // Create floating data points
    function createDataPoints() {
        // Number of data points based on screen size
        const pointCount = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < pointCount; i++) {
            const point = document.createElement('div');
            point.classList.add('data-point');
            
            // Random properties for each point
            const size = Math.random() * 3 + 2;
            const opacity = Math.random() * 0.5 + 0.3;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            
            // Random start position relative to center
            const startX = (Math.random() * 60 - 30) + '%';
            const startY = (Math.random() * 60 - 30) + '%';
            
            // Random end position (distance from center)
            const tx = (Math.random() * 200 - 100);
            const ty = (Math.random() * 200 - 100);
            
            // Random color
            const hue = Math.random() > 0.7 ? 
                        Math.floor(Math.random() * 360) : 
                        Math.floor(Math.random() * 40 + 190); // Mostly blue tones
            
            point.style.width = `${size}px`;
            point.style.height = `${size}px`;
            point.style.opacity = opacity;
            point.style.background = `hsla(${hue}, 80%, 70%, 0.8)`;
            point.style.boxShadow = `0 0 ${size * 2}px hsla(${hue}, 80%, 70%, 0.5)`;
            point.style.left = `calc(50% + ${startX})`;
            point.style.top = `calc(50% + ${startY})`;
            point.style.animationDuration = `${duration}s`;
            point.style.animationDelay = `${delay}s`;
            
            // Set custom properties for the float animation
            point.style.setProperty('--tx', `${tx}px`);
            point.style.setProperty('--ty', `${ty}px`);
            
            dataPoints.appendChild(point);
        }
    }
    
    // Add hover effects to nodes
    function addNodeHoverEffects() {
        neuralNodes.forEach(node => {
            // Add subtle pulse on hover
            node.addEventListener('mouseenter', function() {
                // Create ripple effect
                createRippleEffect(this);
                
                // Highlight connections related to this node
                highlightRelatedConnections(this);
            });
            
            node.addEventListener('mouseleave', function() {
                // Reset connections
                resetConnections();
            });
        });
    }
    
    // Create ripple effect around node
    function createRippleEffect(node) {
        const ripple = document.createElement('div');
        ripple.classList.add('node-ripple');
        
        // Style the ripple
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(var(--primary-color), 0.2)';
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '1';
        ripple.style.pointerEvents = 'none';
        
        // Add animation
        ripple.style.animation = 'ripple 1s ease-out forwards';
        
        // Create keyframes for the ripple animation
        if (!document.querySelector('#ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(3);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to node and remove after animation
        node.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
    
    // Highlight connections related to the hovered node
    function highlightRelatedConnections(node) {
        const connections = document.querySelectorAll('.connection');
        const nodeIndex = Array.from(neuralNodes).indexOf(node) + 1;
        
        connections.forEach((connection, index) => {
            // Check if connection is related to this node
            const connectionClasses = connection.className;
            
            if (connectionClasses.includes(`connection-${nodeIndex}-`) || 
                connectionClasses.includes(`-${nodeIndex}`)) {
                // Highlight this connection
                connection.style.opacity = '1';
                connection.style.height = '2px';
                connection.style.boxShadow = '0 0 8px rgba(var(--primary-color), 0.8)';
            } else {
                // Fade other connections
                connection.style.opacity = '0.3';
            }
        });
    }
    
    // Reset connections to default state
    function resetConnections() {
        const connections = document.querySelectorAll('.connection');
        
        connections.forEach(connection => {
            connection.style.opacity = '';
            connection.style.height = '';
            connection.style.boxShadow = '';
        });
    }
    
    // Add parallax effect to the neural surface
    document.addEventListener('mousemove', function(e) {
        if (!isNavActive) return;
        
        const moveX = (e.clientX - window.innerWidth / 2) / 30;
        const moveY = (e.clientY - window.innerHeight / 2) / 30;
        
        // Apply subtle movement to the neural pathways
        const paths = document.querySelectorAll('.neural-path');
        paths.forEach((path, index) => {
            const depth = 1 - (index * 0.15); // Different depths for 3D effect
            path.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
        });
        
        // Move data points in opposite direction for parallax
        dataPoints.style.transform = `translate(${-moveX * 0.5}px, ${-moveY * 0.5}px)`;
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Clear and recreate data points
        dataPoints.innerHTML = '';
        createDataPoints();
    });
    
    // Add touch support for mobile
    let touchStartX, touchStartY;
    
    neuralSurface.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    neuralSurface.addEventListener('touchend', function(e) {
        // Only process if it's a tap (not a swipe)
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = Math.abs(touchEndX - touchStartX);
        const deltaY = Math.abs(touchEndY - touchStartY);
        
        // If the touch was a tap (not a swipe)
        if (deltaX < 10 && deltaY < 10) {
            // Check if we're clicking on a node
            if (e.target.classList.contains('neural-node') || 
                e.target.closest('.neural-node')) {
                return; // Nodes have their own handlers
            }
            
            toggleNavigation();
        }
    });
    
    // Prevent scrolling when interacting with the neural surface
    neuralSurface.addEventListener('touchmove', function(e) {
        if (isNavActive) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Initialize with a subtle entrance animation
    setTimeout(() => {
        neuralSurface.style.animation = 'none';
        neuralSurface.style.transform = 'translateY(0)';
        neuralSurface.style.opacity = '1';
        
        brandFloat.style.animation = 'none';
        brandFloat.style.transform = 'translateY(0)';
        brandFloat.style.opacity = '0.8';
    }, 1500);
});
