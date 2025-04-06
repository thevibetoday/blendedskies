document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const skySystem = document.querySelector('.sky-system');
    const questionPanel = document.getElementById('question-panel');
    const currentQuestion = document.getElementById('current-question');
    const selectedOption = document.getElementById('selected-option');
    const optionDescription = document.getElementById('option-description');
    const continueButton = document.getElementById('continue-button');
    const journeyStage = document.getElementById('journey-stage');
    const starsContainer = document.querySelector('.stars-container');
    const completionScreen = document.getElementById('completion-screen');
    const restartButton = document.getElementById('restart-button');
    
    // State
    let currentSky = 1;
    let selectedOptions = {};
    let skyRotation = { x: 20, y: 0 };
    let stopAnimations = false;
    
    // Questions and options data
    const questions = [
        {
            question: "What type of sky do you find most beautiful?",
            options: [
                { label: "Clear Blue", description: "A perfect blue canvas with gentle wisps of clouds" },
                { label: "Sunset Glow", description: "Rich orange and pink hues painting the evening horizon" },
                { label: "Storm Clouds", description: "Dramatic dark clouds with thunder potential" },
                { label: "Starry Night", description: "A clear night with twinkling stars" }
            ]
        },
        {
            question: "What weather phenomenon do you enjoy most?",
            options: [
                { label: "Gentle Rain", description: "Soft rainfall creating a peaceful atmosphere" },
                { label: "Rainbow", description: "Colorful arc stretching across the sky after rain" },
                { label: "Morning Fog", description: "Mysterious mist hanging in the valley" },
                { label: "Snow Flurries", description: "Delicate snowflakes drifting from the sky" }
            ]
        },
        {
            question: "What time of day has the most beautiful sky?",
            options: [
                { label: "Dawn", description: "Fresh beginning with soft pastel colors" },
                { label: "Midday", description: "Bright blue sky with the sun at its peak" },
                { label: "Golden Hour", description: "Warm golden light just before sunset" },
                { label: "Twilight", description: "The magical blue moment between day and night" }
            ]
        },
        {
            question: "What sky feature would you most like to see?",
            options: [
                { label: "Northern Lights", description: "Dancing colors across the northern sky" },
                { label: "Perfect Sunrise", description: "Sun breaking over a mountain horizon" },
                { label: "Cloud Formations", description: "Unique and sculptural cloud shapes" },
                { label: "Lightning Storm", description: "Dramatic flashes illuminating storm clouds" }
            ]
        }
    ];
    
    // Initialize
    createStars();
    setTimeout(() => {
        questionPanel.classList.add('visible');
    }, 500);
    
    // Adjust the sky perspective based on mouse position
    document.addEventListener('mousemove', function(e) {
        if (stopAnimations) return;
        
        const xAxis = (e.clientX / window.innerWidth - 0.5) * 40;
        const yAxis = (e.clientY / window.innerHeight - 0.5) * 20;
        
        skyRotation = {
            x: 20 + yAxis,
            y: xAxis
        };
        
        skySystem.style.transform = `rotateX(${skyRotation.x}deg) rotateY(${skyRotation.y}deg)`;
    });
    
    // Create stars in the background
    function createStars() {
        const starsCount = window.innerWidth < 768 ? 100 : 200;
        
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
    
    // Handle sky element clicks (option selection)
    const skyElements = document.querySelectorAll('.sky-element');
    skyElements.forEach(element => {
        // Initially hide elements that are not current
        if (parseInt(element.getAttribute('data-sky')) !== currentSky) {
            element.style.display = 'none';
        }
        
        element.addEventListener('click', function() {
            // Only respond to current sky options
            const skyNumber = parseInt(this.getAttribute('data-sky'));
            if (skyNumber !== currentSky) return;
            
            // Get option info
            const optionNumber = parseInt(this.getAttribute('data-option'));
            const questionData = questions[currentSky - 1];
            const optionData = questionData.options[optionNumber - 1];
            
            // Update UI
            selectedOption.textContent = optionData.label;
            optionDescription.textContent = optionData.description;
            
            // Store selection
            selectedOptions[currentSky] = optionNumber;
            
            // Highlight selected element
            skyElements.forEach(el => {
                if (parseInt(el.getAttribute('data-sky')) === currentSky) {
                    el.classList.remove('active');
                }
            });
            this.classList.add('active');
            
            // Add visual marker
            addOptionMarker(this);
            
            // Show continue button
            continueButton.classList.add('visible');
            
            // Auto-continue after 2 seconds
            setTimeout(() => {
                if (currentSky === parseInt(this.getAttribute('data-sky'))) {
                    goToNextSky();
                }
            }, 2000);
        });
    });
    
    // Continue button click
    continueButton.addEventListener('click', function() {
        goToNextSky();
    });
    
    // Restart button click
    restartButton.addEventListener('click', function() {
        resetJourney();
    });
    
    // Add visual marker to selected option
    function addOptionMarker(skyElement) {
        // Remove existing markers
        document.querySelectorAll('.option-marker').forEach(marker => {
            marker.remove();
        });
        
        // Create new marker
        const marker = document.createElement('div');
        marker.className = 'option-marker';
        
        // Position at center of element
        const rect = skyElement.getBoundingClientRect();
        marker.style.left = `${rect.left + rect.width / 2}px`;
        marker.style.top = `${rect.top + rect.height / 2}px`;
        
        // Add to body and animate
        document.body.appendChild(marker);
        
        // Animate
        setTimeout(() => {
            marker.style.opacity = '1';
            marker.style.transform = 'scale(2)';
            marker.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }, 50);
        
        setTimeout(() => {
            marker.style.opacity = '0';
        }, 1500);
    }
    
    // Go to next sky question
    function goToNextSky() {
        if (currentSky >= 4) {
            completeJourney();
            return;
        }
        
        // Hide current options
        skyElements.forEach(element => {
            if (parseInt(element.getAttribute('data-sky')) === currentSky) {
                // Animate out
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                element.style.opacity = '0';
                element.style.transform = 'scale(0.5)';
                
                // Hide after animation
                setTimeout(() => {
                    element.style.display = 'none';
                    element.style.opacity = '';
                    element.style.transform = '';
                    element.style.transition = '';
                }, 500);
            }
        });
        
        // Update current sky
        currentSky++;
        
        // Update question
        currentQuestion.textContent = questions[currentSky - 1].question;
        
        // Update journey stage
        journeyStage.textContent = `Question ${currentSky} of 4`;
        
        // Reset selected option display
        selectedOption.textContent = 'None';
        optionDescription.textContent = '';
        
        // Hide continue button
        continueButton.classList.remove('visible');
        
        // Create zoom-out/zoom-in effect
        skySystem.style.transition = 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
        skySystem.style.transform = `rotateX(${skyRotation.x}deg) rotateY(${skyRotation.y}deg) scale(0.7)`;
        
        setTimeout(() => {
            skySystem.style.transform = `rotateX(${skyRotation.x}deg) rotateY(${skyRotation.y}deg) scale(1)`;
        }, 800);
        
        // Show new sky options with delay
        setTimeout(() => {
            skyElements.forEach(element => {
                if (parseInt(element.getAttribute('data-sky')) === currentSky) {
                    element.style.display = 'flex';
                    element.style.opacity = '0';
                    element.style.transform = 'scale(0.5)';
                    
                    // Animate in
                    setTimeout(() => {
                        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'scale(1)';
                    }, 50);
                }
            });
        }, 1000);
        
        // Reset system transition after animation
        setTimeout(() => {
            skySystem.style.transition = '';
        }, 1500);
    }
    
    // Complete the journey
    function completeJourney() {
        // Pause animations
        stopAnimations = true;
        
        // Zoom out sky system
        skySystem.style.transition = 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)';
        skySystem.style.transform = `rotateX(${skyRotation.x}deg) rotateY(${skyRotation.y}deg) scale(0.5)`;
        
        // Hide question panel
        questionPanel.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        questionPanel.style.opacity = '0';
        questionPanel.style.transform = 'translateY(50px)';
        
        // Show completion screen
        setTimeout(() => {
            completionScreen.classList.add('visible');
        }, 1000);
    }
    
    // Reset the journey
    function resetJourney() {
        // Hide completion screen
        completionScreen.classList.remove('visible');
        
        // Reset state
        currentSky = 1;
        selectedOptions = {};
        stopAnimations = false;
        
        // Show first question
        currentQuestion.textContent = questions[0].question;
        journeyStage.textContent = 'Question 1 of 4';
        selectedOption.textContent = 'None';
        optionDescription.textContent = '';
        
        // Reset sky system view
        skySystem.style.transition = 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
        skySystem.style.transform = `rotateX(${skyRotation.x}deg) rotateY(${skyRotation.y}deg) scale(1)`;
        
        // Hide all elements first
        skyElements.forEach(element => {
            element.style.display = 'none';
            element.classList.remove('active');
        });
        
        // Show only first sky's options
        setTimeout(() => {
            skyElements.forEach(element => {
                if (parseInt(element.getAttribute('data-sky')) === 1) {
                    element.style.display = 'flex';
                    element.style.opacity = '0';
                    element.style.transform = 'scale(0.5)';
                    
                    // Animate in
                    setTimeout(() => {
                        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'scale(1)';
                    }, 50);
                }
            });
            
            // Show question panel again
            questionPanel.style.opacity = '1';
            questionPanel.style.transform = 'translateY(0)';
            
            // Reset continue button
            continueButton.classList.remove('visible');
        }, 500);
        
        // Reset system transition after animation
        setTimeout(() => {
            skySystem.style.transition = '';
        }, 1500);
    }
    
    // Initialize sky system rotation
    skySystem.style.transform = `rotateX(${skyRotation.x}deg) rotateY(${skyRotation.y}deg)`;
    
    // Handle touch events for mobile devices
    let touchStartX, touchStartY;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!touchStartX || !touchStartY || stopAnimations) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;
        
        skyRotation.y += deltaX * 0.5;
        skyRotation.x += deltaY * 0.5;
        
        // Limit rotation on X axis
        skyRotation.x = Math.max(0, Math.min(40, skyRotation.x));
        
        skySystem.style.transform = `rotateX(${skyRotation.x}deg) rotateY(${skyRotation.y}deg)`;
        
        touchStartX = touchX;
        touchStartY = touchY;
    });
    
    // Optimize performance by throttling mouse movement
    let isThrottled = false;
    
    document.addEventListener('mousemove', function(e) {
        if (isThrottled) return;
        isThrottled = true;
        
        setTimeout(() => {
            isThrottled = false;
        }, 10);
        
        // Move clouds/stars with parallax effect
        if (!stopAnimations) {
            const elements = document.querySelectorAll('.cloud, .star, .rain-drop, .snow-flake');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            elements.forEach(element => {
                const depth = parseFloat(element.style.width) / 4;
                const moveX = (mouseX - 0.5) * depth * 2;
                const moveY = (mouseY - 0.5) * depth * 2;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        }
    });
    
    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        // Only respond if we're on an active question
        if (completionScreen.classList.contains('visible')) return;
        
        const currentElements = Array.from(skyElements).filter(
            el => parseInt(el.getAttribute('data-sky')) === currentSky
        );
        
        let selectedIndex = currentElements.findIndex(el => el.classList.contains('active'));
        
        switch(e.key) {
            case 'ArrowRight':
                selectedIndex = (selectedIndex + 1) % 4;
                currentElements[selectedIndex].click();
                break;
            case 'ArrowLeft':
                selectedIndex = selectedIndex === -1 ? 3 : (selectedIndex - 1 + 4) % 4;
                currentElements[selectedIndex].click();
                break;
            case 'Enter':
                if (continueButton.classList.contains('visible')) {
                    goToNextSky();
                } else if (selectedIndex !== -1) {
                    // Force move to next if something is selected
                    goToNextSky();
                }
                break;
            case ' ': // Space
                if (continueButton.classList.contains('visible')) {
                    goToNextSky();
                }
                break;
            case 'Escape':
                if (completionScreen.classList.contains('visible')) {
                    resetJourney();
                }
                break;
        }
    });
    
    // Window resize handling
    window.addEventListener('resize', function() {
        // Recreate stars for new window size
        starsContainer.innerHTML = '';
        createStars();
        
        // Update system scale based on screen size
        const scale = window.innerWidth < 768 ? 0.8 : 1;
        skySystem.style.transform = `rotateX(${skyRotation.x}deg) rotateY(${skyRotation.y}deg) scale(${scale})`;
    });
    
    // Tab visibility handling
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pause animations when tab is not visible
            document.body.classList.add('paused');
        } else {
            // Resume animations when tab becomes visible again
            document.body.classList.remove('paused');
        }
    });
    
    // Add initial animation to first sky elements
    skyElements.forEach(element => {
        if (parseInt(element.getAttribute('data-sky')) === 1) {
            element.style.animation = `pulse 2s ease-in-out 1`;
            
            // Remove animation after it completes
            setTimeout(() => {
                element.style.animation = '';
            }, 2000);
        }
    });
});
