// Simple option selection script
document.addEventListener('DOMContentLoaded', function() {
    // Get all option list items
    const optionItems = document.querySelectorAll('.options li');

    // Add click event listener to each option
    optionItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove 'selected' class from all siblings
            const siblings = Array.from(this.parentNode.children);
            siblings.forEach(sibling => {
                sibling.classList.remove('selected');
            });

            // Add 'selected' class to clicked item
            this.classList.add('selected');
        });
    });
});
