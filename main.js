document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const skyElements = document.querySelectorAll('.sky-element');
    const skyLayers = document.querySelectorAll('.sky-layer');
    const journeyStage = document.getElementById('journey-stage');
    const currentQuestion = document.getElementById('current-question');
    const optionDescription = document.getElementById('option-description');
    const selectedOption = document.getElementById('selected-option');
    const continueButton = document.getElementById('continue-button');
    const completionScreen = document.getElementById('completion-screen');
    const restartButton = document.getElementById('restart-button');
    const starsContainer = document.querySelector('.stars-container');
    const cloudsContainer = document.querySelector('.clouds-container');
    
    // State
    let currentStage = 1;
    let totalStages = 4;
    let selections = {};
    let currentSelection = null;
    
    // Initialize
    initQuestionnaire();
    
    // Create star and cloud elements if containers exist
    if (starsContainer) {
        createStars();
    } else {
        console.warn('Stars container not found.');
    }
    
    if (cloudsContainer) {
        createClouds();
    } else {
        console.warn('Clouds container not found.');
    }
    
    function initQuestionnaire() {
        // Update journey stage
        updateJourneyStage();
        
        // Show elements for first question
        showSkyElementsForStage(currentStage);
        
        // Set first question
        setQuestion(currentStage);
        
        // Add event listeners to sky elements
        skyElements.forEach(element => {
            element.addEventListener('click', handleSkyElementClick);
            element.addEventListener('mouseenter', handleSkyElementHover);
            element.addEventListener('mouseleave', handleSkyElementLeave);
        });
        
        // Add event listener to continue button
        if (continueButton) {
            continueButton.addEventListener('click', handleContinue);
        }
        
        // Add event listener to restart button
        if (restartButton) {
            restartButton.addEventListener('click', restartQuestionnaire);
        }
    }
    
    function handleSkyElementClick() {
        const sky = this.getAttribute('data-sky');
        const option = this.getAttribute('data-option');
        
        // Ignore clicks on elements not from current stage
        if (parseInt(sky) !== currentStage) return;
        
        // Remove selection from all elements for this stage
        skyElements.forEach(element => {
            if (element.getAttribute('data-sky') == currentStage) {
                element.classList.remove('selected');
            }
        });
        
        // Add selected class to this element
        this.classList.add('selected');
        
        // Store selection
        currentSelection = {
            sky: sky,
            option: option
        };
        
        // Update selected option text
        updateSelectedOption(option);
    }
    
    function handleSkyElementHover() {
        const option = this.getAttribute('data-option');
        const descriptions = {
            '1': {
                '1': 'A bright, clear blue sky with minimal clouds and abundant sunshine.',
                '2': 'The warm, golden light of a sunset painting the clouds in rich hues.',
                '3': 'Dark, dramatic storm clouds that create an atmosphere of tension.',
                '4': 'A dark night sky illuminated by countless stars and celestial wonders.'
            },
            '2': {
                '1': 'Gentle rainfall that nourishes the earth and creates a peaceful rhythm.',
                '2': 'A magnificent rainbow arching across the sky after a refreshing shower.',
                '3': 'Mysterious fog that shrouds the landscape in an ethereal veil.',
                '4': 'Delicate snowfall that transforms the world into a peaceful winter wonder.'
            },
            '3': {
                '1': 'The first light of dawn breaking through the darkness with hope.',
                '2': 'The vibrant energy of midday when the sun is at its highest point.',
                '3': 'The magical golden hour when everything glows with warm light.',
                '4': 'The serene twilight when day gently transitions into night.'
            },
            '4': {
                '1': 'The mesmerizing aurora borealis dancing across the northern sky.',
                '2': 'The breathtaking moment when the sun crests the horizon at sunrise.',
                '3': 'Fascinating cloud formations that create natural art in the sky.',
                '4': 'Dramatic lightning that illuminates the sky with powerful energy.'
            }
        };
        
        const sky = this.getAttribute('data-sky');
        if (optionDescription && descriptions[sky] && descriptions[sky][option]) {
            optionDescription.textContent = descriptions[sky][option];
        }
    }
    
    function handleSkyElementLeave() {
        if (optionDescription) {
            optionDescription.textContent = '';
        }
    }
    
    function handleContinue() {
        // Check if an option has been selected
        if (!currentSelection) {
            // Animate button to indicate no selection
            if (continueButton) {
                continueButton.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    continueButton.style.animation = '';
                }, 500);
            }
            return;
        }
        
        // Store the current selection
        selections[currentStage] = currentSelection;
        
        // Move to next stage or complete
        if (currentStage < totalStages) {
            currentStage++;
            updateJourneyStage();
            setQuestion(currentStage);
            showSkyElementsForStage(currentStage);
            
            // Reset current selection
            currentSelection = null;
            if (selectedOption) {
                selectedOption.textContent = 'None';
            }
        } else {
            // Complete the questionnaire
            completeQuestionnaire();
        }
    }
    
    function updateJourneyStage() {
        if (journeyStage) {
            journeyStage.textContent = `${currentStage} of ${totalStages}`;
        }
    }
    
    function setQuestion(stage) {
        const questions = {
            1: "What type of sky do you find most beautiful?",
            2: "Which atmospheric condition do you find most captivating?",
            3: "What time of day presents the most enchanting sky to you?",
            4: "Which celestial phenomenon would you most like to witness?"
        };
        
        if (currentQuestion && questions[stage]) {
            currentQuestion.textContent = questions[stage];
        }
    }
    
    function updateSelectedOption(option) {
        if (!selectedOption) return;
        
        const optionNames = {
            '1': {
                '1': 'Clear Blue Sky',
                '2': 'Sunset',
                '3': 'Storm Clouds',
                '4': 'Night Sky'
            },
            '2': {
                '1': 'Rain',
                '2': 'Rainbow',
                '3': 'Fog',
                '4': 'Snow'
            },
            '3': {
                '1': 'Dawn',
                '2': 'Midday',
                '3': 'Golden Hour',
                '4': 'Twilight'
            },
            '4': {
                '1': 'Northern Lights',
                '2': 'Sunrise',
                '3': 'Cloud Formations',
                '4': 'Lightning'
            }
        };
        
        const skyStage = currentStage.toString();
        if (optionNames[skyStage] && optionNames[skyStage][option]) {
            selectedOption.textContent = optionNames[skyStage][option];
        }
    }
    
    function showSkyElementsForStage(stage) {
        // Hide all elements first
        skyElements.forEach(element => {
            element.classList.remove('active');
        });
        
        // Hide all layers
        skyLayers.forEach(layer => {
            layer.classList.remove('active');
        });
        
        // Show the current layer
        const currentLayer = document.querySelector(`.layer-${stage}`);
        if (currentLayer) {
            currentLayer.classList.add('active');
        }
        
        // Show elements for current stage with animation
        skyElements.forEach(element => {
            if (element.getAttribute('data-sky') == stage) {
                setTimeout(() => {
                    element.classList.add('active');
                }, Math.random() * 300);
            }
        });
    }
    
    function completeQuestionnaire() {
        // Create a nice transition effect
        const transitionOverlay = document.createElement('div');
        transitionOverlay.style.position = 'fixed';
        transitionOverlay.style.top = '0';
        transitionOverlay.style.left = '0';
        transitionOverlay.style.width = '100%';
        transitionOverlay.style.height = '100%';
        transitionOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        transitionOverlay.style.zIndex = '150';
        transitionOverlay.style.opacity = '0';
        transitionOverlay.style.transition = 'opacity 0.8s ease';
        
        document.body.appendChild(transitionOverlay);
        
        setTimeout(() => {
            transitionOverlay.style.opacity = '1';
            
            setTimeout(() => {
                // Show the completion screen
                if (completionScreen) {
                    completionScreen.classList.add('active');
                }
                
                // Remove the transition overlay
                setTimeout(() => {
                    transitionOverlay.remove();
                }, 800);
            }, 800);
        }, 100);
        
        // Log the selections
        console.log('Sky Questionnaire Selections:', selections);
    }
    
    function restartQuestionnaire() {
        if (!selectedOption) return;
        
        // Reset state
        currentStage = 1;
        selections = {};
        currentSelection = null;
        selectedOption.textContent = 'None';
        
        // Update UI
        updateJourneyStage();
        setQuestion(currentStage);
        showSkyElementsForStage(currentStage);
        
        // Hide completion screen
        if (completionScreen) {
            completionScreen.classList.remove('active');
        }
    }
    
    function createStars() {
        if (!starsContainer) return;
        
        const starsCount = window.innerWidth < 768 ? 50 : 100;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Star styles
            star.style.position = 'absolute';
            star.style.width = `${Math.random() * 2 + 1}px`;
            star.style.height = star.style.width;
            star.style.borderRadius = '50%';
            star.style.backgroundColor = '#fff';
            star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;
            
            starsContainer.appendChild(star);
        }
    }
    
    function createClouds() {
        if (!cloudsContainer) return;
        
        const cloudCount = window.innerWidth < 768 ? 3 : 5;
        
        for (let i = 0; i < cloudCount; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            
            // Cloud styles
            cloud.style.position = 'absolute';
            cloud.style.width = `${Math.random() * 150 + 100}px`;
            cloud.style.height = `${Math.random() * 60 + 40}px`;
            cloud.style.borderRadius = '50%';
            cloud.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            cloud.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
            cloud.style.left = `${Math.random() * 100}%`;
            cloud.style.top = `${Math.random() * 40 + 10}%`;
            cloud.style.opacity = `${Math.random() * 0.4 + 0.2}`;
            cloud.style.animation = `float-cloud ${Math.random() * 60 + 60}s linear infinite`;
            
            // Pseudo-elements for cloud shape
            const cloudAfter = document.createElement('div');
            cloudAfter.style.content = '';
            cloudAfter.style.position = 'absolute';
            cloudAfter.style.width = '60%';
            cloudAfter.style.height = '80%';
            cloudAfter.style.borderRadius = '50%';
            cloudAfter.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            cloudAfter.style.top = '10%';
            cloudAfter.style.left = '15%';
            
            const cloudBefore = document.createElement('div');
            cloudBefore.style.content = '';
            cloudBefore.style.position = 'absolute';
            cloudBefore.style.width = '50%';
            cloudBefore.style.height = '70%';
            cloudBefore.style.borderRadius = '50%';
            cloudBefore.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            cloudBefore.style.top = '15%';
            cloudBefore.style.right = '15%';
            
            cloud.appendChild(cloudAfter);
            cloud.appendChild(cloudBefore);
            cloudsContainer.appendChild(cloud);
        }
    }
    
    // Add keyframes for animations
    function addKeyframes() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-cloud {
                0% { transform: translateX(-200px); }
                100% { transform: translateX(calc(100vw + 200px)); }
            }
            
            @keyframes twinkle {
                0% { opacity: 0.3; }
                100% { opacity: 1; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                50% { transform: translateX(5px); }
                75% { transform: translateX(-5px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add keyframes
    addKeyframes();
});
