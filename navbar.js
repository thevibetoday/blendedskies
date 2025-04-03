// Get the dropdown button and content
const dropBtn = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');

// Toggle dropdown visibility when clicking the button
dropBtn.addEventListener('click', function() {
    dropdownContent.classList.toggle('show');
});

// Close the dropdown if clicked outside
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn')) {
        if (dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
        }
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

// Add an active class to the selected sky option
const skyOptions = document.querySelectorAll('.dropdown-content a');
skyOptions.forEach(option => {
    option.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all options
        skyOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        this.classList.add('active');
        
        // Update the dropdown button text to show selected sky (optional)
        const skyEmoji = this.textContent.split(' ')[0];
        const skyName = this.textContent.split(' - ')[0].substring(2);
        dropBtn.textContent = skyEmoji + ' ' + skyName;
        
        // Close the dropdown after selection
        dropdownContent.classList.remove('show');
    });
});
