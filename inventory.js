document.addEventListener('DOMContentLoaded', function() {
    const skySelector = document.querySelector('.sky-selector');
    const skyPanorama = document.querySelector('.sky-panorama');
    const skyBackdrop = document.querySelector('.sky-backdrop');
    const skyOptions = document.querySelectorAll('.sky-option');
    const orbEmoji = document.querySelector('.orb-emoji');
    const orbInner = document.querySelector('.orb-inner');
    const inventoryBody = document.querySelector('.inventory-body');
    
    const filterPanel = document.querySelector('.filter-panel');
    const filterToggle = document.querySelector('.filter-toggle');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const filterOptions = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const productCards = document.querySelectorAll('.product-card');
    const filterSkyOptions = document.querySelectorAll('input[name="sky"]');
    
    const resultsCount = document.querySelector('.results-count');
    const sortSelect = document.getElementById('sort-select');
    const quickAddButtons = document.querySelectorAll('.quick-add');
    const paginationButtons = document.querySelectorAll('.pagination button');
    
    if (skySelector && skyPanorama && skyBackdrop) {
        skySelector.onclick = function(e) {
            e.preventDefault();
            skyPanorama.classList.toggle('open');
            skyBackdrop.classList.toggle('active');
        };
        
        skyBackdrop.onclick = function() {
            skyPanorama.classList.remove('open');
            skyBackdrop.classList.remove('active');
        };
        
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
                    
                    // Also update the filter checkbox
                    filterSkyOptions.forEach(option => {
                        option.checked = option.value === skyType;
                    });
                    
                    // Filter products based on sky selection
                    updateProductFilters();
                }
                
                setTimeout(function() {
                    skyPanorama.classList.remove('open');
                    skyBackdrop.classList.remove('active');
                }, 300);
            });
        });
        
        skySelector.onmouseenter = function() {
            orbEmoji.style.opacity = '1';
            orbInner.style.opacity = '0';
        };
        
        skySelector.onmouseleave = function() {
            if (orbEmoji.textContent === '🌤️') {
                orbEmoji.style.opacity = '0';
                orbInner.style.opacity = '1';
            }
        };
    }
    
    // Filter panel toggle (for mobile)
    if (filterToggle && filterPanel) {
        filterToggle.addEventListener('click', function() {
            filterPanel.classList.toggle('expanded');
            this.textContent = filterPanel.classList.contains('expanded') ? 'Close' : 'Filters';
        });
    }
    
    // Filter functionality
    function updateProductFilters() {
        const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(input => input.value);
        const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(input => input.value);
        const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(input => input.value);
        const selectedSkies = Array.from(document.querySelectorAll('input[name="sky"]:checked')).map(input => input.value);
        
        let visibleCount = 0;
        
        productCards.forEach(card => {
            const cardSizes = card.getAttribute('data-sizes').split(',');
            const cardType = card.getAttribute('data-type');
            const cardColors = card.getAttribute('data-colors').split(',');
            const cardSky = card.getAttribute('data-sky');
            
            const matchesSky = selectedSkies.length === 0 || selectedSkies.includes(cardSky);
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(cardType);
            const matchesSizes = selectedSizes.length === 0 || cardSizes.some(size => selectedSizes.includes(size));
            const matchesColors = selectedColors.length === 0 || cardColors.some(color => selectedColors.includes(color));
            
            const isVisible = matchesSky && matchesType && matchesSizes && matchesColors;
            
            card.style.display = isVisible ? 'block' : 'none';
            
            if (isVisible) {
                visibleCount++;
            }
        });
        
        // Update results count
        if (resultsCount) {
            resultsCount.textContent = `${visibleCount} Items`;
        }
    }
    
    // Initialize filters
    if (filterOptions.length > 0) {
        filterOptions.forEach(option => {
            option.addEventListener('change', function() {
                if (applyFiltersBtn) {
                    // Highlight apply button when selections change
                    applyFiltersBtn.classList.add('highlight');
                }
            });
        });
    }
    
    // Apply filters button
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            updateProductFilters();
            this.classList.remove('highlight');
            
            // On mobile, close the filter panel
            if (window.innerWidth < 900 && filterPanel) {
                filterPanel.classList.remove('expanded');
                if (filterToggle) {
                    filterToggle.textContent = 'Filters';
                }
            }
        });
    }
    
    // Clear filters button
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            filterOptions.forEach(option => {
                option.checked = false;
            });
            
            // Reset to default selections
            if (document.querySelector('input[name="sky"][value="blended"]')) {
                document.querySelector('input[name="sky"][value="blended"]').checked = true;
            }
            
            if (document.querySelector('input[name="type"][value="tee"]')) {
                document.querySelector('input[name="type"][value="tee"]').checked = true;
            }
            
            if (document.querySelector('input[name="size"][value="m"]')) {
                document.querySelector('input[name="size"][value="m"]').checked = true;
            }
            
            if (document.querySelector('input[name="color"][value="blue"]')) {
                document.querySelector('input[name="color"][value="blue"]').checked = true;
            }
            
            updateProductFilters();
            
            // Reset theme
            if (inventoryBody) {
                inventoryBody.className = 'inventory-body sky-blended';
            }
            
            // Reset navbar emoji
            if (orbEmoji) {
                orbEmoji.textContent = '🌥️';
            }
        });
    }
    
    // Quick add functionality
    if (quickAddButtons.length > 0) {
        quickAddButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productTitle = productCard.querySelector('.product-title').textContent;
                
                // Simple animation and feedback
                this.textContent = 'Added!';
                this.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';
                
                setTimeout(() => {
                    this.textContent = 'Quick Add';
                    this.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                }, 1500);
                
                // Create notification
                const notification = document.createElement('div');
                notification.className = 'add-notification';
                notification.innerHTML = `<span>${productTitle} added to bag</span>`;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.add('show');
                    
                    setTimeout(() => {
                        notification.classList.remove('show');
                        setTimeout(() => {
                            document.body.removeChild(notification);
                        }, 300);
                    }, 2000);
                }, 10);
            });
        });
    }
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const productGrid = document.querySelector('.product-grid');
            
            if (!productGrid) return;
            
            const products = Array.from(productCards);
            
            // Sort products
            products.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
                
                switch(sortValue) {
                    case 'price-low':
                        return priceA - priceB;
                    case 'price-high':
                        return priceB - priceA;
                    case 'bestsellers':
                        // For demo purposes, randomize
                        return 0.5 - Math.random();
                    default: // newest
                        // For demo purposes, use current order
                        return 0;
                }
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
