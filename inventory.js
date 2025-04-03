document.addEventListener('DOMContentLoaded', function() {
    // Navbar elements
    const skySelector = document.querySelector('.sky-selector');
    const skyPanorama = document.querySelector('.sky-panorama');
    const skyBackdrop = document.querySelector('.sky-backdrop');
    const skyOptions = document.querySelectorAll('.sky-option');
    const orbEmoji = document.querySelector('.orb-emoji');
    const orbInner = document.querySelector('.orb-inner');
    const inventoryBody = document.querySelector('.inventory-body');
    
    // Filtering elements
    const skyFilters = document.querySelectorAll('.filter-circle[data-filter="sky"]');
    const typeFilters = document.querySelectorAll('.filter-chip[data-filter="type"]');
    const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
    const colorCheckboxes = document.querySelectorAll('input[name="color"]');
    const advancedToggle = document.querySelector('.advanced-toggle');
    const advancedFilters = document.querySelector('.advanced-filters');
    const productItems = document.querySelectorAll('.product-item');
    const productCount = document.querySelector('.count-number');
    
    // View and Sort elements
    const viewButtons = document.querySelectorAll('.view-btn');
    const productGrid = document.querySelector('.product-grid');
    const sortSelect = document.getElementById('sort-select');
    
    // Action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    const paginationButtons = document.querySelectorAll('.pagination button');
    
    // Initialize state
    let activeFilters = {
        sky: ['blended'],
        type: ['all'],
        sizes: ['m'],
        colors: ['blue']
    };
    
    // Navbar Functionality
    if (skySelector && skyPanorama && skyBackdrop) {
        skySelector.addEventListener('click', function(e) {
            e.preventDefault();
            skyPanorama.classList.toggle('open');
            skyBackdrop.classList.toggle('active');
        });
        
        skyBackdrop.addEventListener('click', function() {
            skyPanorama.classList.remove('open');
            skyBackdrop.classList.remove('active');
        });
        
        skyOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const skyType = this.getAttribute('data-sky');
                const skyIcon = this.querySelector('.sky-icon').textContent;
                
                orbEmoji.textContent = skyIcon;
                orbEmoji.style.opacity = '1';
                orbInner.style.opacity = '0';
                
                if (inventoryBody) {
                    inventoryBody.className = 'inventory-body';
                    inventoryBody.classList.add(`sky-${skyType}`);
                    
                    // Update sky filter circles
                    skyFilters.forEach(filter => {
                        filter.classList.remove('active');
                        if (filter.getAttribute('data-value') === skyType) {
                            filter.classList.add('active');
                        }
                    });
                    
                    // Update active filters
                    activeFilters.sky = [skyType];
                    
                    // Apply filters
                    applyFilters();
                }
                
                setTimeout(function() {
                    skyPanorama.classList.remove('open');
                    skyBackdrop.classList.remove('active');
                }, 300);
            });
        });
        
        if (skySelector && orbEmoji && orbInner) {
            skySelector.addEventListener('mouseenter', function() {
                orbEmoji.style.opacity = '1';
                orbInner.style.opacity = '0';
            });
            
            skySelector.addEventListener('mouseleave', function() {
                if (orbEmoji.textContent === '🌤️' && !skyPanorama.classList.contains('open')) {
                    orbEmoji.style.opacity = '0';
                    orbInner.style.opacity = '1';
                }
            });
        }
    }
    
    // Advanced filters toggle
    if (advancedToggle && advancedFilters) {
        advancedToggle.addEventListener('click', function() {
            this.classList.toggle('expanded');
            advancedFilters.classList.toggle('expanded');
            this.querySelector('.toggle-text').textContent = 
                advancedFilters.classList.contains('expanded') ? 'Less Filters' : 'More Filters';
        });
    }
    
    // View toggle functionality
    if (viewButtons.length > 0 && productGrid) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const viewType = this.getAttribute('data-view');
                
                // Remove active class from all view buttons
                viewButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update grid view
                if (viewType === 'grid') {
                    productGrid.classList.remove('flow-view');
                } else if (viewType === 'flow') {
                    productGrid.classList.add('flow-view');
                }
            });
        });
    }
    
    // Filter functionality
    function applyFilters() {
        let visibleCount = 0;
        
        productItems.forEach(item => {
            const sky = item.getAttribute('data-sky');
            const type = item.getAttribute('data-type');
            const sizes = item.getAttribute('data-sizes').split(',');
            const colors = item.getAttribute('data-colors').split(',');
            
            // Check if the item matches all active filters
            const matchesSky = activeFilters.sky.includes('all') || activeFilters.sky.includes(sky);
            const matchesType = activeFilters.type.includes('all') || activeFilters.type.includes(type);
            const matchesSize = activeFilters.sizes.length === 0 || 
                             sizes.some(size => activeFilters.sizes.includes(size));
            const matchesColor = activeFilters.colors.length === 0 || 
                              colors.some(color => activeFilters.colors.includes(color));
            
            const isVisible = matchesSky && matchesType && matchesSize && matchesColor;
            
            // Show or hide the item
            item.style.display = isVisible ? '' : 'none';
            
            if (isVisible) {
                visibleCount++;
            }
        });
        
        // Update product count
        if (productCount) {
            productCount.textContent = visibleCount;
        }
        
        return visibleCount;
    }
    
    // Sky filter
    if (skyFilters.length > 0) {
        skyFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-value');
                
                // Remove active class from all sky filters
                skyFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Update active filters
                activeFilters.sky = [filterValue];
                
                // Apply filters
                applyFilters();
                
                // Update the navbar and body class to match selected sky
                if (orbEmoji && inventoryBody) {
                    // Find the matching sky icon
                    const skyIcon = this.querySelector('.sky-dot').textContent;
                    orbEmoji.textContent = skyIcon;
                    orbEmoji.style.opacity = '1';
                    if (orbInner) orbInner.style.opacity = '0';
                    
                    // Update body class
                    inventoryBody.className = 'inventory-body';
                    inventoryBody.classList.add(`sky-${filterValue}`);
                }
            });
        });
    }
    
    // Type filter
    if (typeFilters.length > 0) {
        typeFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-value');
                
                // Remove active class from all type filters
                typeFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Update active filters
                activeFilters.type = [filterValue];
                
                // Apply filters
                applyFilters();
            });
        });
    }
    
    // Size filter
    if (sizeCheckboxes.length > 0) {
        sizeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // Update active filters
                activeFilters.sizes = Array.from(sizeCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                
                // Apply filters
                applyFilters();
            });
        });
    }
    
    // Color filter
    if (colorCheckboxes.length > 0) {
        colorCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // Update active filters
                activeFilters.colors = Array.from(colorCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                
                // Apply filters
                applyFilters();
            });
        });
    }
    
    // Sort functionality
    if (sortSelect && productGrid) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const items = Array.from(productItems);
            
            // Sort items based on selected option
            items.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
                
                switch(sortValue) {
                    case 'price-low':
                        return priceA - priceB;
                    case 'price-high':
                        return priceB - priceA;
                    case 'bestsellers':
                        // Simulate bestsellers with a random sort for demo
                        return 0.5 - Math.random();
                    default: // newest
                        // For demo, newest is the original order
                        return 0;
                }
            });
            
            // Reorder items in the DOM
            items.forEach(item => {
                productGrid.appendChild(item);
            });
            
            
            // Reapply filters after sorting
            updateProductFilters();
        });
    }
    
    // Pagination (demo functionality)
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            if (button.classList.contains('page-number') || button.classList.contains('page-arrow')) {
                button.addEventListener('click', function() {
                    // Clear active class from all page numbers
                    document.querySelectorAll('.page-number').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // If it's a page number (not arrow), set it as active
                    if (this.classList.contains('page-number')) {
                        this.classList.add('active');
                    }
                    
                    // Scroll to top of results
                    document.querySelector('.results-container').scrollIntoView({ behavior: 'smooth' });
                });
            }
        });
    }
    
    // Initialize filters on page load
    updateProductFilters();
    
    // Set the theme based on URL parameter if present
    const urlParams = new URLSearchParams(window.location.search);
    const skyParam = urlParams.get('sky');
    
    if (skyParam && inventoryBody) {
        const validSkies = ['blended', 'clear-blue', 'sunset-glow', 'storm-brewing', 'starry-night', 'rainbow-sky'];
        
        if (validSkies.includes(skyParam)) {
            inventoryBody.className = 'inventory-body';
            inventoryBody.classList.add(`sky-${skyParam}`);
            
            // Update the filter checkbox
            filterSkyOptions.forEach(option => {
                option.checked = option.value === skyParam;
            });
            
            // Update the navbar emoji
            if (orbEmoji && orbInner) {
                const skyOption = document.querySelector(`.sky-option[data-sky="${skyParam}"]`);
                if (skyOption) {
                    const skyIcon = skyOption.querySelector('.sky-icon').textContent;
                    orbEmoji.textContent = skyIcon;
                    orbEmoji.style.opacity = '1';
                    orbInner.style.opacity = '0';
                }
            }
            
            // Apply filters
            updateProductFilters();
        }
    }
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .add-notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background-color: var(--theme-primary, #1E90FF);
            color: white;
            padding: 12px 25px;
            border-radius: 30px;
            font-weight: 500;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .add-notification.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        
        .apply-filters.highlight {
            animation: pulse 1.5s ease infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2); }
        }
    `;
    document.head.appendChild(style);
});
