document.addEventListener('DOMContentLoaded', function() {
    const skyTrigger = document.getElementById('sky-trigger');
    const skyMenuContent = document.getElementById('sky-menu-content');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Toggle sky menu when clicking the trigger
    skyTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Toggle the expanded menu visibility
        skyMenuContent.classList.toggle('show');
        
        // Toggle backdrop
        menuBackdrop.classList.toggle('show');
        
        // Toggle aria-expanded attribute for accessibility
        const isExpanded = skyMenuContent.classList.contains('show');
        skyTrigger.setAttribute('aria-expanded', isExpanded);
        
        // Set focus to the menu if opened (for accessibility)
        if (isExpanded) {
            skyMenuContent.querySelector('.menu-item').focus();
        }
    });
    
    // Close menu when clicking on backdrop
    menuBackdrop.addEventListener('click', function() {
        closeMenu();
    });
    
    // Close menu with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && skyMenuContent.classList.contains('show')) {
            closeMenu();
        }
    });
    
    // Handle sky selection
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the selected sky data
            const skyType = this.getAttribute('data-sky');
            const skyEmoji = this.querySelector('.menu-icon').textContent;
            const skyName = this.querySelector('.item-title').textContent;
            
            // Update the trigger button text
            skyTrigger.querySelector('.trigger-content').textContent = skyName;
            
            // You could also dispatch a custom event to notify other parts of your app
            const selectedEvent = new CustomEvent('skySelected', {
                detail: {
                    type: skyType,
                    name: skyName,
                    emoji: skyEmoji
                }
            });
            document.dispatchEvent(selectedEvent);
            
            // Close the menu
            closeMenu();
        });
    });
    
    // Function to close the menu
    function closeMenu() {
        skyMenuContent.classList.remove('show');
        menuBackdrop.classList.remove('show');
        skyTrigger.setAttribute('aria-expanded', false);
    }
    
    // Handle click outside to close menu (excluding the trigger)
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = skyMenuContent.contains(event.target);
        const isClickOnTrigger = skyTrigger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnTrigger && skyMenuContent.classList.contains('show')) {
            closeMenu();
        }
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.sticky-navbar');
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
});
