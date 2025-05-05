document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const floatingNav = document.getElementById('floating-nav');
    const menuToggle = document.getElementById('menu-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const mainSidebar = document.getElementById('main-sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const notificationToggle = document.getElementById('notification-toggle');
    const notificationPanel = document.getElementById('notification-panel');
    const closeNotifications = document.getElementById('close-notifications');
    const composerInput = document.querySelector('.composer-input');
    const composerSubmit = document.querySelector('.composer-submit');
    const engageActions = document.querySelectorAll('.engage-action');
    const actionTooltip = document.getElementById('action-tooltip');
    const perspectiveOptions = document.querySelectorAll('.perspective-option');
    const notificationFilters = document.querySelectorAll('.notification-filter');
    
    // Initialize theme from localStorage
    initTheme();
    
    // Event Listeners
    // Toggle sidebar
    menuToggle.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);
    
    // Toggle theme
    themeToggle.addEventListener('click', toggleTheme);
    
    // Toggle notifications panel
    notificationToggle.addEventListener('click', toggleNotifications);
    closeNotifications.addEventListener('click', toggleNotifications);
    
    // Composer input enable/disable submit
    composerInput.addEventListener('input', function() {
        composerSubmit.disabled = this.value.trim().length === 0;
    });
    
    // Composer submit action
    composerSubmit.addEventListener('click', function() {
        if (composerInput.value.trim().length > 0) {
            shareThought();
        }
    });
    
    // Engage action tooltips
    engageActions.forEach(action => {
        action.addEventListener('mouseenter', showTooltip);
        action.addEventListener('mouseleave', hideTooltip);
        action.addEventListener('click', toggleEngagement);
    });
    
    // Perspective options
    perspectiveOptions.forEach(option => {
        option.addEventListener('click', function() {
            perspectiveOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            filterContent(this.textContent);
        });
    });
    
    // Notification filters
    notificationFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            notificationFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            filterNotifications(this.textContent);
        });
    });
    
    // Close panels when clicking outside
    document.addEventListener('click', function(e) {
        // Close sidebar when clicking outside
        if (mainSidebar.classList.contains('active') && 
            !mainSidebar.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleSidebar();
        }
        
        // Close notification panel when clicking outside
        if (notificationPanel.classList.contains('active') && 
            !notificationPanel.contains(e.target) && 
            !notificationToggle.contains(e.target)) {
            toggleNotifications();
        }
    });
    
    // Initialize speaking indicators for live space
    initializeSpeakingIndicators();
    
    // Scroll handling for floating nav
    window.addEventListener('scroll', handleScroll);
    
    // Functions
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    function toggleTheme() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    }
    
    function toggleSidebar() {
        mainSidebar.classList.toggle('active');
    }
    
    function toggleNotifications() {
        notificationPanel.classList.toggle('active');
        
        // Mark notifications as read when panel is opened
        if (notificationPanel.classList.contains('active')) {
            const unreadNotifications = document.querySelectorAll('.notification-item.unread');
            unreadNotifications.forEach(notification => {
                // In a real app, we'd send an API call here
                // For now, just remove the unread class
                // notification.classList.remove('unread');
            });
            
            // Update notification badge
            // In a real app, we'd update the count based on backend data
            // document.querySelector('.indicator-badge').textContent = '0';
        }
    }
    
    function showTooltip(e) {
        const action = e.currentTarget;
        const actionRect = action.getBoundingClientRect();
        const actionType = getActionType(action);
        
        // Update tooltip content
        const tooltipTitle = actionTooltip.querySelector('.tooltip-title');
        const tooltipDescription = actionTooltip.querySelector('.tooltip-description');
        
        tooltipTitle.textContent = capitalizeFirstLetter(actionType);
        tooltipDescription.textContent = getActionDescription(actionType);
        
        // Position tooltip
        actionTooltip.style.left = `${actionRect.left + (actionRect.width / 2) - (actionTooltip.offsetWidth / 2)}px`;
        actionTooltip.style.top = `${actionRect.top - actionTooltip.offsetHeight - 10}px`;
        
        // Show tooltip
        actionTooltip.classList.add('active');
    }
    
    function hideTooltip() {
        actionTooltip.classList.remove('active');
    }
    
    function getActionType(action) {
        if (action.classList.contains('elevate')) return 'elevate';
        if (action.classList.contains('amplify')) return 'amplify';
        if (action.classList.contains('illuminate')) return 'illuminate';
        return action.querySelector('span').textContent.toLowerCase();
    }
    
    function getActionDescription(actionType) {
        const descriptions = {
            'elevate': 'Content that raises the conversation',
            'amplify': 'Content worth spreading further',
            'illuminate': 'Content that brings clarity or new understanding',
            'respond': 'Add your perspective to this thought',
            'explore map': 'View the full interactive ThoughtMap',
            'contribute': 'Add your ideas to this collaborative map',
            'join space': 'Enter this live audio conversation',
            'notify': 'Get notified about similar spaces'
        };
        
        return descriptions[actionType] || '';
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function toggleEngagement(e) {
        const action = e.currentTarget;
        
        // Only toggle for engagement actions (not buttons like "Respond" or "Join Space")
        if (action.classList.contains('elevate') || 
            action.classList.contains('amplify') || 
            action.classList.contains('illuminate')) {
            
            action.classList.toggle('active');
            
            // In a real app, we'd send an API call here to update the engagement
            // For demo purposes, we'll just update the UI
            
            // Find the nearest metric that corresponds to this action type
            const thoughtCard = action.closest('.thought-card');
            const metrics = thoughtCard.querySelectorAll('.metric');
            
            metrics.forEach(metric => {
                const metricType = metric.querySelector('i').className;
                
                if ((action.classList.contains('elevate') && metricType.includes('arrow-up')) ||
                    (action.classList.contains('amplify') && metricType.includes('retweet')) ||
                    (action.classList.contains('illuminate') && metricType.includes('lightbulb'))) {
                    
                    // Update the count
                    let count = parseInt(metric.textContent.match(/\d+/)[0]);
                    
                    if (action.classList.contains('active')) {
                        count++;
                    } else {
                        count--;
                    }
                    
                    // Update the text
                    metric.innerHTML = `<i class="${metric.querySelector('i').className}"></i> ${count}`;
                }
            });
        }
    }
    
    function shareThought() {
        // In a real app, we'd send an API call here
        // For demo purposes, we'll just create a new thought card
        
        const thoughtStream = document.querySelector('.thought-stream');
        const newThought = document.createElement('div');
        newThought.className = 'thought-card';
        newThought.style.animation = 'slideUp 0.5s ease';
        
        // Get user avatar
        const userAvatar = document.querySelector('.composer-avatar img').src;
        
        // Create thought content
        newThought.innerHTML = `
            <div class="thought-meta">
                <div class="thought-author">
                    <img src="${userAvatar}" alt="Author" class="author-avatar">
                    <div class="author-info">
                        <div class="author-name">You</div>
                        <div class="thought-time">Just now</div>
                    </div>
                </div>
                <div class="thought-dimension-tag">New Thought</div>
            </div>
            <div class="thought-content">
                <p>${composerInput.value}</p>
            </div>
            <div class="thought-engagement">
                <div class="engagement-metrics">
                    <span class="metric"><i class="fas fa-comment"></i> 0</span>
                    <span class="metric"><i class="fas fa-retweet"></i> 0</span>
                    <span class="metric"><i class="fas fa-eye"></i> 1</span>
                </div>
                <div class="engagement-actions">
                    <button class="engage-action elevate">
                        <i class="fas fa-arrow-up"></i>
                        <span>Elevate</span>
                    </button>
                    <button class="engage-action amplify">
                        <i class="fas fa-broadcast-tower"></i>
                        <span>Amplify</span>
                    </button>
                    <button class="engage-action illuminate">
                        <i class="fas fa-lightbulb"></i>
                        <span>Illuminate</span>
                    </button>
                    <button class="engage-action">
                        <i class="fas fa-comment"></i>
                        <span>Respond</span>
                    </button>
                </div>
            </div>
        `;
        
        // Clear input
        composerInput.value = '';
        composerSubmit.disabled = true;
        
        // Add to DOM
        thoughtStream.insertBefore(newThought, thoughtStream.firstChild);
        
        // Add event listeners to new engagement buttons
        const newEngageActions = newThought.querySelectorAll('.engage-action');
        newEngageActions.forEach(action => {
            action.addEventListener('mouseenter', showTooltip);
            action.addEventListener('mouseleave', hideTooltip);
            action.addEventListener('click', toggleEngagement);
        });
        
        // Show success message
        showToast('Thought shared successfully!', 'success');
    }
    
    function filterContent(perspective) {
        // In a real app, we'd filter the content based on the selected perspective
        // For demo purposes, we'll just show a toast
        showToast(`Viewing through: ${perspective}`, 'info');
    }
    
    function filterNotifications(filter) {
        // In a real app, we'd filter the notifications based on the selected filter
        // For demo purposes, we'll just show a toast
        showToast(`Showing ${filter} notifications`, 'info');
    }
    
    function initializeSpeakingIndicators() {
        const speakingIndicators = document.querySelectorAll('.speaking-indicator');
        if (speakingIndicators.length === 0) return;
        
        // Simulate speaking by cycling through participants
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
    
    function handleScroll() {
        if (window.scrollY > 20) {
            floatingNav.style.backgroundColor = document.body.classList.contains('dark-mode') 
                ? 'rgba(30, 41, 59, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
        } else {
            floatingNav.style.backgroundColor = document.body.classList.contains('dark-mode') 
                ? 'rgba(30, 41, 59, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)';
        }
    }
    
    function showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Add icon based on type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add to DOM
        document.body.appendChild(toast);
        
        // Show toast (with slight delay for animation)
        setTimeout(() => {
            toast.classList.add('active');
        }, 10);
        
        // Add close event
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.remove('active');
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (document.body.contains(toast)) {
                toast.classList.remove('active');
                setTimeout(() => {
                    if (document.body.contains(toast)) {
                        toast.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
});

// Toast styles (added to JS file to ensure it works without requiring CSS changes)
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            max-width: 90%;
        }
        
        .dark-mode .toast {
            background-color: #1E293B;
            color: #F1F5F9;
        }
        
        .toast.active {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        
        .toast-icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            flex-shrink: 0;
        }
        
        .toast.info .toast-icon {
            background-color: rgba(34, 211, 238, 0.1);
            color: #22D3EE;
        }
        
        .toast.success .toast-icon {
            background-color: rgba(16, 185, 129, 0.1);
            color: #10B981;
        }
        
        .toast.error .toast-icon {
            background-color: rgba(244, 63, 94, 0.1);
            color: #F43F5E;
        }
        
        .toast.warning .toast-icon {
            background-color: rgba(245, 158, 11, 0.1);
            color: #F59E0B;
        }
        
        .toast-message {
            flex: 1;
            font-weight: 500;
        }
        
        .toast-close {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            cursor: pointer;
            color: #6B7280;
        }
        
        .dark-mode .toast-close {
            color: #94A3B8;
        }
        
        .toast-close:hover {
            background-color: #F3F4F6;
        }
        
        .dark-mode .toast-close:hover {
            background-color: #334155;
        }
    `;
    document.head.appendChild(style);
});
