// Get the menu button and expanded menu
const menuBtn = document.querySelector('.menu-btn');
const expandedMenu = document.querySelector('.expanded-menu');

// Create backdrop element for when menu is open
const backdrop = document.createElement('div');
backdrop.classList.add('menu-backdrop');
document.body.appendChild(backdrop);

// Toggle menu visibility when clicking the button
menuBtn.addEventListener('click', function() {
    expandedMenu.classList.toggle('show');
    
    // Toggle backdrop
    if (expandedMenu.classList.contains('show')) {
        backdrop.style.display = 'block';
        // Prevent scrolling on body when menu is open
        document.body.style.overflow = 'hidden';
    } else {
        backdrop.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Close the menu if clicked outside
backdrop.addEventListener('click', function() {
    expandedMenu.classList.remove('show');
    backdrop.style.display = 'none';
    document.body.style.overflow = '';
});

// Close menu with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && expandedMenu.classList.contains('show')) {
        expandedMenu.classList.remove('show');
        backdrop.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Smooth scrolling effect for the navbar
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.sticky-navbar');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow when scrolling down
    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Handle sky selection
const skyOptions = document.querySelectorAll('.menu-item');
skyOptions.forEach(option => {
    option.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all options
        skyOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        this.classList.add('active');
        
        // Update the menu button text to show selected sky
        const skyEmoji = this.querySelector('.sky-emoji').textContent;
        const skyName = this.querySelector('.sky-name').textContent;
        menuBtn.textContent = skyEmoji + ' ' + skyName;
        
        // Close the menu after selection
        expandedMenu.classList.remove('show');
        backdrop.style.display = 'none';
        document.body.style.overflow = '';
    });
});

// Add slight transition delay to each menu item for staggered animation
document.querySelectorAll('.menu-item').forEach((item, index) => {
    item.style.transitionDelay = (index * 0.05) + 's';
});
