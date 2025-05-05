document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const app = document.getElementById('app');
    const themeToggle = document.getElementById('theme-toggle');
    const notificationToggle = document.getElementById('notification-toggle');
    const notificationPanel = document.getElementById('notification-panel');
    const filterTrigger = document.getElementById('filter-trigger');
    const filterBubble = document.getElementById('filter-bubble');
    const filterTags = document.querySelectorAll('.filter-tag');
    const contentTabs = document.querySelectorAll('.content-tab');
    const composerInput = document.querySelector('.composer-input');
    const composerSubmit = document.querySelector('.composer-submit');
    const toast = document.getElementById('toast');
    const ageVerificationModal = document.getElementById('age-verification-modal');
    const confirmAgeBtn = document.getElementById('confirm-age');
    const cancelVerificationBtn = document.getElementById('cancel-verification');
    const contentFilterModal = document.getElementById('content-filter-modal');
    const contentFilterBtn = document.getElementById('content-filter-btn');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const parentControlsPanel = document.getElementById('parent-controls-panel');
    const openParentControlsBtn = document.getElementById('open-parent-controls');
    const closeParentControlsBtn = document.getElementById('close-parent-controls');
    const openContentFilterBtn = document.getElementById('open-content-filter');
    const timeLimitRange = document.getElementById('time-limit-range');
    const timeLimitValue = document.querySelector('.time-limit-value');
    const voteButtons = document.querySelectorAll('.vote-button');
    const votingButtons = document.querySelectorAll('.voting-button');
    const discoveryTabs = document.querySelectorAll('.discovery-tab');
    
    // Initialize theme from localStorage
    initTheme();
    
    // Show age verification on load (uncomment to enable)
    // ageVerificationModal.style.display = 'flex';
    
    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    notificationToggle.addEventListener('click', toggleNotifications);
    filterTrigger.addEventListener('click', toggleFilterBubble);
    contentFilterBtn.addEventListener('click', toggleContentFilterModal);
    openContentFilterBtn.addEventListener('click', toggleContentFilterModal);
    openParentControlsBtn.addEventListener('click', toggleParentControlsPanel);
    closeParentControlsBtn.addEventListener('click', toggleParentControlsPanel);
    
    // Age verification handlers
    confirmAgeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const birthDateInput = document.getElementById('birth-date');
        if (birthDateInput.value) {
            const birthDate = new Date(birthDateInput.value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            if (age < 13) {
                alert('You must be at least 13 years old to use OLYMPUS.');
            } else if (age < 18) {
                ageVerificationModal.style.display = 'none';
                parentControlsPanel.classList.add('active');
                showToast('info', 'Parental approval required for users under 18.');
            } else {
                ageVerificationModal.style.display = 'none';
                showToast('success', 'Age verification complete!');
            }
        } else {
            alert('Please enter your date of birth.');
        }
    });
    
    cancelVerificationBtn.addEventListener('click', function() {
        // In a real app, this might redirect to a landing page
        alert('Age verification is required to use OLYMPUS.');
    });
    
    // Content filter modal handlers
    applyFiltersBtn.addEventListener('click', function() {
        contentFilterModal.style.display = 'none';
        showToast('success', 'Content filters applied successfully!');
    });
    
    resetFiltersBtn.addEventListener('click', function() {
        const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
        filterCheckboxes.forEach(checkbox => {
            checkbox.classList.add('checked');
            checkbox.innerHTML = '<i class="fas fa-check"></i>';
        });
    });
    
    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', function() {
            const checkbox = this.querySelector('.filter-checkbox');
            checkbox.classList.toggle('checked');
            checkbox.innerHTML = checkbox.classList.contains('checked') ? '<i class="fas fa-check"></i>' : '';
        });
    });
    
    // Time limit slider
    if (timeLimitRange) {
        timeLimitRange.addEventListener('input', function() {
            const hours = Math.floor(this.value / 60);
            const minutes = this.value % 60;
            let timeText = '';
            
            if (hours > 0) {
                timeText += hours + (hours === 1 ? ' hour' : ' hours');
                if (minutes > 0) {
                    timeText += ' ';
                }
            }
            
            if (minutes > 0) {
                timeText += minutes + (minutes === 1 ? ' minute' : ' minutes');
            }
            
            timeLimitValue.textContent = timeText + ' per day';
        });
    }
    
    // Vote buttons
    voteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dimension = this.parentElement;
            const dimensionButtons = dimension.querySelectorAll('.vote-button');
            
            dimensionButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            this.classList.add('active');
        });
    });
    
    // Upvote/Downvote buttons
    votingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isUpvote = this.classList.contains('upvote');
            const siblingSelector = isUpvote ? '.downvote' : '.upvote';
            const siblingButton = this.parentElement.querySelector(siblingSelector);
            const voteCount = this.parentElement.querySelector('.vote-count');
            const currentCount = parseInt(voteCount.textContent);
            
            if (this.classList.contains('active')) {
                // Undo vote
                this.classList.remove('active');
                voteCount.textContent = isUpvote ? currentCount - 1 : currentCount + 1;
            } else {
                // Add vote
                this.classList.add('active');
                
                if (siblingButton.classList.contains('active')) {
                    siblingButton.classList.remove('active');
                    voteCount.textContent = isUpvote ? currentCount + 2 : currentCount - 2;
                } else {
                    voteCount.textContent = isUpvote ? currentCount + 1 : currentCount - 1;
                }
            }
        });
    });
    
    // Discovery tabs
    discoveryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            discoveryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close panels when clicking outside
    document.addEventListener('click', function(e) {
        if (!notificationPanel.contains(e.target) && !notificationToggle.contains(e.target)) {
            notificationPanel.classList.remove('active');
        }
        
        if (!filterBubble.contains(e.target) && !filterTrigger.contains(e.target)) {
            filterBubble.classList.remove('active');
        }
        
        if (contentFilterModal.style.display === 'flex' && 
            !contentFilterModal.querySelector('.content-filter-container').contains(e.target) &&
            !contentFilterBtn.contains(e.target) &&
            !openContentFilterBtn.contains(e.target)) {
            contentFilterModal.style.display = 'none';
        }
    });
    
    // Filter tag selection
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Content tab switching
    contentTabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            contentTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Composer input enable/disable submit
    composerInput.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            composerSubmit.removeAttribute('disabled');
        } else {
            composerSubmit.setAttribute('disabled', '');
        }
    });
    
    // Composer submit action
    composerSubmit.addEventListener('click', function() {
        if (composerInput.value.trim().length > 0) {
            // Here we would normally save the post to a database
            composerInput.value = '';
            composerSubmit.setAttribute('disabled', '');
            
            // Show success toast
            showToast('success', 'Your post has been published!');
        }
    });
    
    // Reaction buttons
    document.querySelectorAll('.reaction-button').forEach(button => {
        button.addEventListener('click', function() {
            // Toggle reaction
            const action = this.querySelector('span').textContent.toLowerCase();
            
            if (action === 'like' || action === 'liked') {
                this.classList.toggle('liked');
                this.querySelector('span').textContent = this.classList.contains('liked') ? 'Liked' : 'Like';
            } else if (action === 'boost' || action === 'boosted') {
                this.classList.toggle('boosted');
                this.querySelector('span').textContent = this.classList.contains('boosted') ? 'Boosted' : 'Boost';
            } else if (action === 'insightful') {
                this.classList.toggle('insightful');
            } else if (action === 'celebrate' || action === 'celebrated') {
                this.classList.toggle('celebrated');
                this.querySelector('span').textContent = this.classList.contains('celebrated') ? 'Celebrated' : 'Celebrate';
            }
        });
    });
    
    // Add click handler for toast close button
    document.querySelector('.toast-close').addEventListener('click', function() {
        hideToast();
    });

    // Voice room join button
    document.querySelectorAll('.join-button.primary').forEach(button => {
        button.addEventListener('click', function() {
            showToast('info', 'Joining voice room...');
            // In a real app, this would connect to the voice server
        });
    });

    // Advanced multi-dimensional voting system
    setupMultiDimensionalVoting();
    
    // Functions
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    function toggleTheme() {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    }
    
    function toggleNotifications() {
        notificationPanel.classList.toggle('active');
    }
    
    function toggleFilterBubble() {
        filterBubble.classList.toggle('active');
    }
    
    function toggleContentFilterModal() {
        if (contentFilterModal.style.display === 'flex') {
            contentFilterModal.style.display = 'none';
        } else {
            contentFilterModal.style.display = 'flex';
        }
    }
    
    function toggleParentControlsPanel() {
        parentControlsPanel.classList.toggle('active');
    }
    
    function showToast(type, message) {
        toast.classList.remove('success', 'error', 'warning', 'info');
        toast.classList.add(type);
        toast.querySelector('.toast-message').textContent = message;
        toast.classList.add('active');
        
        // Auto hide after 5 seconds
        setTimeout(hideToast, 5000);
    }
    
    function hideToast() {
        toast.classList.remove('active');
    }

    function setupMultiDimensionalVoting() {
        const multiVotePanels = document.querySelectorAll('.multi-vote-panel');
        
        multiVotePanels.forEach(panel => {
            const dimensions = panel.querySelectorAll('.vote-dimension');
            
            dimensions.forEach(dimension => {
                const buttons = dimension.querySelectorAll('.vote-button');
                
                buttons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Remove active class from all buttons in this dimension
                        buttons.forEach(btn => btn.classList.remove('active'));
                        
                        // Add active class to the clicked button
                        this.classList.add('active');
                        
                        // Calculate and update overall score (in a real app)
                        calculateOverallScore(panel);
                    });
                });
            });
        });
    }
    
    function calculateOverallScore(panel) {
        const dimensions = panel.querySelectorAll('.vote-dimension');
        let totalScore = 0;
        let count = 0;
        
        dimensions.forEach(dimension => {
            const activeButton = dimension.querySelector('.vote-button.active');
            if (activeButton) {
                const value = parseInt(activeButton.textContent);
                totalScore += value;
                count++;
            }
        });
        
        const averageScore = count > 0 ? totalScore / count : 0;
        
        // In a real app, we would send this score to the server
        // console.log('Average score:', averageScore.toFixed(1));
        
        return averageScore;
    }

    // Initialize spatial audio indicators
    const spatialAudioIndicators = document.querySelectorAll('.spatial-audio-indicator');
    spatialAudioIndicators.forEach(indicator => {
        // In a real app, this would check if spatial audio is supported
        indicator.style.display = 'flex';
    });

    // Voice room controls
    const voiceControls = document.querySelectorAll('.voice-control-button');
    voiceControls.forEach(control => {
        control.addEventListener('click', function() {
            if (control.classList.contains('mute')) {
                control.innerHTML = control.innerHTML.includes('slash') 
                    ? '<i class="fas fa-microphone"></i>' 
                    : '<i class="fas fa-microphone-slash"></i>';
                showToast('info', control.innerHTML.includes('slash') ? 'Microphone muted' : 'Microphone unmuted');
            } else if (control.classList.contains('video')) {
                control.innerHTML = control.innerHTML.includes('video') 
                    ? '<i class="fas fa-video-slash"></i>' 
                    : '<i class="fas fa-video"></i>';
                showToast('info', control.innerHTML.includes('slash') ? 'Camera turned off' : 'Camera turned on');
            }
        });
    });

    // Simulated live voice transcription
    simulateVoiceTranscription();

    function simulateVoiceTranscription() {
        const transcriptElements = document.querySelectorAll('.voice-transcript');
        if (transcriptElements.length === 0) return;

        const speakingIndicators = document.querySelectorAll('.speaking-indicator');
        
        // Simulate different participants speaking
        let currentSpeakerIndex = 0;
        
        setInterval(() => {
            // Remove active class from all indicators
            speakingIndicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            
            // Add active class to current speaker
            if (speakingIndicators[currentSpeakerIndex]) {
                speakingIndicators[currentSpeakerIndex].classList.add('active');
            }
            
            // Move to next speaker
            currentSpeakerIndex = (currentSpeakerIndex + 1) % speakingIndicators.length;
        }, 4000);
    }
});
