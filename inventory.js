// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const filterTitles = document.querySelectorAll('.filter-title');
    const filterOptions = document.querySelectorAll('.filter-options');
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"], .color-option input[type="checkbox"]');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    const activeFiltersContainer = document.querySelector('.active-filters');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const applyPriceBtn = document.querySelector('.apply-price');
    const sortSelect = document.getElementById('sort-select');
    const productsGrid = document.querySelector('.products-grid');
    const productCountElement = document.getElementById('product-count');
    const pageButtons = document.querySelectorAll('.page-btn');
    const prevPageBtn = document.querySelector('.prev-page');
    const nextPageBtn = document.querySelector('.next-page');
    const mobileFilterToggle = document.querySelector('.mobile-filter-toggle');
    const filterPanel = document.querySelector('.filter-panel');
    
    // Create filter overlay and close button for mobile
    const filterOverlay = document.createElement('div');
    filterOverlay.className = 'filter-overlay';
    document.body.appendChild(filterOverlay);
    
    const filterPanelClose = document.createElement('button');
    filterPanelClose.className = 'filter-panel-close';
    filterPanelClose.innerHTML = '×';
    filterPanel.appendChild(filterPanelClose);
    
    // State
    let activeFilters = {
        style: [],
        size: [],
        fit: [],
        color: [],
        collection: [],
        price: { min: null, max: null }
    };
    
    let currentSort = 'newest';
    let currentPage = 1;
    let itemsPerPage = window.innerWidth > 640 ? 12 : 8;
    
    // Sample product data
    const products = [
        {
            id: 1,
            title: 'Blue Sky Tee',
            collection: 'Clear Blue',
            style: 'Minimalist',
            price: 39.99,
            originalPrice: null,
            colors: ['Clear Blue', 'White', 'Black'],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            fit: 'True to Size',
            isNew: true,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 2,
            title: 'Sunset Glow Hoodie',
            collection: 'Sunset Glow',
            style: 'Graphic Heavy',
            price: 69.99,
            originalPrice: 89.99,
            colors: ['Sunset Glow', 'Black'],
            sizes: ['S', 'M', 'L', 'XL'],
            fit: 'Oversized',
            isNew: false,
            onSale: true,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 3,
            title: 'Storm Cloud Jacket',
            collection: 'Storm Brewing',
            style: 'Bold & Eclectic',
            price: 129.99,
            originalPrice: null,
            colors: ['Storm Brewing', 'Black', 'Gray'],
            sizes: ['S', 'M', 'L'],
            fit: 'Relaxed',
            isNew: true,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 4,
            title: 'Starry Night Sweater',
            collection: 'Starry Night',
            style: 'Minimalist',
            price: 79.99,
            originalPrice: null,
            colors: ['Starry Night', 'Gray'],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            fit: 'True to Size',
            isNew: false,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 5,
            title: 'Rainbow Sky Dress',
            collection: 'Rainbow Sky',
            style: 'Bold & Eclectic',
            price: 89.99,
            originalPrice: 119.99,
            colors: ['Rainbow Sky'],
            sizes: ['XS', 'S', 'M', 'L'],
            fit: 'True to Size',
            isNew: false,
            onSale: true,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 6,
            title: 'Clear Blue Joggers',
            collection: 'Clear Blue',
            style: 'Earthy & Natural',
            price: 59.99,
            originalPrice: null,
            colors: ['Clear Blue', 'Gray', 'Black'],
            sizes: ['S', 'M', 'L', 'XL'],
            fit: 'Relaxed',
            isNew: true,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 7,
            title: 'Sunset Glow Tank',
            collection: 'Sunset Glow',
            style: 'Minimalist',
            price: 29.99,
            originalPrice: 39.99,
            colors: ['Sunset Glow', 'White'],
            sizes: ['XS', 'S', 'M', 'L'],
            fit: 'Snug',
            isNew: false,
            onSale: true,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 8,
            title: 'Storm Brewing Cardigan',
            collection: 'Storm Brewing',
            style: 'Earthy & Natural',
            price: 89.99,
            originalPrice: null,
            colors: ['Storm Brewing', 'Gray'],
            sizes: ['S', 'M', 'L', 'XL'],
            fit: 'Oversized',
            isNew: true,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 9,
            title: 'Starry Night Pants',
            collection: 'Starry Night',
            style: 'Bold & Eclectic',
            price: 69.99,
            originalPrice: 89.99,
            colors: ['Starry Night', 'Black'],
            sizes: ['S', 'M', 'L'],
            fit: 'Relaxed',
            isNew: false,
            onSale: true,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 10,
            title: 'Rainbow Sky Blouse',
            collection: 'Rainbow Sky',
            style: 'Graphic Heavy',
            price: 49.99,
            originalPrice: null,
            colors: ['Rainbow Sky', 'White'],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            fit: 'True to Size',
            isNew: true,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 11,
            title: 'Clear Blue Beanie',
            collection: 'Clear Blue',
            style: 'Minimalist',
            price: 24.99,
            originalPrice: null,
            colors: ['Clear Blue', 'White', 'Black'],
            sizes: ['One Size'],
            fit: 'True to Size',
            isNew: false,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 12,
            title: 'Sunset Glow Skirt',
            collection: 'Sunset Glow',
            style: 'Bold & Eclectic',
            price: 59.99,
            originalPrice: 79.99,
            colors: ['Sunset Glow'],
            sizes: ['XS', 'S', 'M', 'L'],
            fit: 'True to Size',
            isNew: false,
            onSale: true,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 13,
            title: 'Storm Cloud Cap',
            collection: 'Storm Brewing',
            style: 'Minimalist',
            price: 29.99,
            originalPrice: null,
            colors: ['Storm Brewing', 'Black', 'Gray'],
            sizes: ['One Size'],
            fit: 'True to Size',
            isNew: true,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 14,
            title: 'Starry Night Crop Top',
            collection: 'Starry Night',
            style: 'Graphic Heavy',
            price: 34.99,
            originalPrice: null,
            colors: ['Starry Night', 'Black'],
            sizes: ['XS', 'S', 'M', 'L'],
            fit: 'Snug',
            isNew: true,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 15,
            title: 'Rainbow Sky Socks',
            collection: 'Rainbow Sky',
            style: 'Bold & Eclectic',
            price: 14.99,
            originalPrice: 19.99,
            colors: ['Rainbow Sky'],
            sizes: ['One Size'],
            fit: 'True to Size',
            isNew: false,
            onSale: true,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 16,
            title: 'Clear Blue Vest',
            collection: 'Clear Blue',
            style: 'Earthy & Natural',
            price: 49.99,
            originalPrice: null,
            colors: ['Clear Blue', 'White'],
            sizes: ['S', 'M', 'L', 'XL'],
            fit: 'Relaxed',
            isNew: false,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 17,
            title: 'Sunset Glow Shorts',
            collection: 'Sunset Glow',
            style: 'Minimalist',
            price: 39.99,
            originalPrice: 49.99,
            colors: ['Sunset Glow', 'Black'],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            fit: 'Relaxed',
            isNew: false,
            onSale: true,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 18,
            title: 'Storm Brewing Scarf',
            collection: 'Storm Brewing',
            style: 'Earthy & Natural',
            price: 34.99,
            originalPrice: null,
            colors: ['Storm Brewing', 'Gray'],
            sizes: ['One Size'],
            fit: 'True to Size',
            isNew: true,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 19,
            title: 'Starry Night Jumpsuit',
            collection: 'Starry Night',
            style: 'Bold & Eclectic',
            price: 99.99,
            originalPrice: 129.99,
            colors: ['Starry Night'],
            sizes: ['XS', 'S', 'M', 'L'],
            fit: 'True to Size',
            isNew: false,
            onSale: true,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 20,
            title: 'Rainbow Sky Headband',
            collection: 'Rainbow Sky',
            style: 'Graphic Heavy',
            price: 19.99,
            originalPrice: null,
            colors: ['Rainbow Sky', 'White'],
            sizes: ['One Size'],
            fit: 'True to Size',
            isNew: true,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 21,
            title: 'Clear Blue Blazer',
            collection: 'Clear Blue',
            style: 'Minimalist',
            price: 129.99,
            originalPrice: 159.99,
            colors: ['Clear Blue', 'Black'],
            sizes: ['S', 'M', 'L', 'XL'],
            fit: 'True to Size',
            isNew: false,
            onSale: true,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 22,
            title: 'Sunset Glow Gloves',
            collection: 'Sunset Glow',
            style: 'Earthy & Natural',
            price: 24.99,
            originalPrice: null,
            colors: ['Sunset Glow', 'Black'],
            sizes: ['S/M', 'L/XL'],
            fit: 'True to Size',
            isNew: true,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 23,
            title: 'Storm Brewing Poncho',
            collection: 'Storm Brewing',
            style: 'Bold & Eclectic',
            price: 89.99,
            originalPrice: 109.99,
            colors: ['Storm Brewing'],
            sizes: ['One Size'],
            fit: 'Oversized',
            isNew: false,
            onSale: true,
            image: 'https://via.placeholder.com/300x400'
        },
        {
            id: 24,
            title: 'Starry Night Kimono',
            collection: 'Starry Night',
            style: 'Graphic Heavy',
            price: 79.99,
            originalPrice: null,
            colors: ['Starry Night', 'Black'],
            sizes: ['S/M', 'L/XL'],
            fit: 'Oversized',
            isNew: true,
            onSale: false,
            image: 'https://via.placeholder.com/300x400'
        }
    ];
    
    // Initialize the page
    initializeFilterToggles();
    setupMobileFilters();
    setupFilterListeners();
    updateProducts();
    updatePagination();
    
    // Filter toggles
    function initializeFilterToggles() {
        filterTitles.forEach(title => {
            const targetId = title.getAttribute('data-toggle');
            const targetOptions = document.getElementById(targetId);
            
            title.addEventListener('click', () => {
                const isExpanded = title.getAttribute('aria-expanded') === 'true';
                
                title.setAttribute('aria-expanded', !isExpanded);
                
                if (!isExpanded) {
                    targetOptions.classList.add('expanded');
                    targetOptions.style.maxHeight = targetOptions.scrollHeight + 'px';
                } else {
                    targetOptions.classList.remove('expanded');
                    targetOptions.style.maxHeight = '0';
                }
            });
            
            // Set initial state (first filter expanded)
            if (title === filterTitles[0]) {
                title.setAttribute('aria-expanded', 'true');
                targetOptions.classList.add('expanded');
                targetOptions.style.maxHeight = targetOptions.scrollHeight + 'px';
            } else {
                title.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Mobile filters setup
    function setupMobileFilters() {
        mobileFilterToggle.addEventListener('click', () => {
            filterPanel.classList.add('active');
            filterOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        filterPanelClose.addEventListener('click', closeFilterPanel);
        filterOverlay.addEventListener('click', closeFilterPanel);
        
        function closeFilterPanel() {
            filterPanel.classList.remove('active');
            filterOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Adjust filter panel height for mobile
        function adjustFilterPanel() {
            if (window.innerWidth <= 768) {
                filterPanel.style.height = '100vh';
            } else {
                filterPanel.style.height = '';
                filterPanel.classList.remove('active');
                filterOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        window.addEventListener('resize', adjustFilterPanel);
        adjustFilterPanel();
    }
    
    // Setup filter listeners
    function setupFilterListeners() {
        // Checkbox filters
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const filterType = checkbox.getAttribute('name');
                const filterValue = checkbox.getAttribute('value');
                
                if (checkbox.checked) {
                    addFilter(filterType, filterValue);
                } else {
                    removeFilter(filterType, filterValue);
                }
                
                updateProducts();
                updateActiveFilters();
                updatePagination();
                currentPage = 1; // Reset to first page when filtering
                renderProductPage();
            });
        });
        
        // Price filter
        applyPriceBtn.addEventListener('click', () => {
            const minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : null;
            const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : null;
            
            activeFilters.price.min = minPrice;
            activeFilters.price.max = maxPrice;
            
            updateProducts();
            updateActiveFilters();
            updatePagination();
            currentPage = 1;
            renderProductPage();
        });
        
        // Clear all filters
        clearFiltersBtn.addEventListener('click', clearAllFilters);
        
        // Sort select
        sortSelect.addEventListener('change', () => {
            currentSort = sortSelect.value;
            updateProducts();
            currentPage = 1;
            renderProductPage();
        });
        
        // Pagination
        pageButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.textContent);
                if (page !== currentPage) {
                    currentPage = page;
                    updatePagination();
                    renderProductPage();
                    
                    // Scroll to top of products
                    productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
                renderProductPage();
                productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        
        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
                renderProductPage();
                productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    // Filter management
    function addFilter(type, value) {
        if (!activeFilters[type].includes(value)) {
            activeFilters[type].push(value);
        }
    }
    
    function removeFilter(type, value) {
        activeFilters[type] = activeFilters[type].filter(item => item !== value);
    }
    
    function clearAllFilters() {
        // Reset all filter states
        activeFilters = {
            style: [],
            size: [],
            fit: [],
            color: [],
            collection: [],
            price: { min: null, max: null }
        };
        
        // Uncheck all checkboxes
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Clear price inputs
        minPriceInput.value = '';
        maxPriceInput.value = '';
        
        // Update UI
        updateProducts();
        updateActiveFilters();
        updatePagination();
        currentPage = 1;
        renderProductPage();
    }

                          // Update active filters UI
function updateActiveFilters() {
    activeFiltersContainer.innerHTML = '';
    
    // Add filter tags for all active filters
    Object.keys(activeFilters).forEach(type => {
        if (type === 'price') {
            if (activeFilters.price.min !== null || activeFilters.price.max !== null) {
                let priceLabel = 'Price: ';
                if (activeFilters.price.min !== null && activeFilters.price.max !== null) {
                    priceLabel += `$${activeFilters.price.min} - $${activeFilters.price.max}`;
                } else if (activeFilters.price.min !== null) {
                    priceLabel += `Min $${activeFilters.price.min}`;
                } else if (activeFilters.price.max !== null) {
                    priceLabel += `Max $${activeFilters.price.max}`;
                }
                
                addFilterTag('price', priceLabel);
            }
            return;
        }
        
        activeFilters[type].forEach(value => {
            addFilterTag(type, value);
        });
    });
    
    function addFilterTag(type, value) {
        const tagTemplate = document.getElementById('filter-tag-template');
        const tagClone = tagTemplate.content.cloneNode(true);
        
        const tagElement = tagClone.querySelector('.filter-tag');
        const tagText = tagClone.querySelector('.tag-text');
        const removeTag = tagClone.querySelector('.remove-tag');
        
        tagElement.setAttribute('data-type', type);
        tagElement.setAttribute('data-value', value);
        
        // Format display text
        let displayType = type.charAt(0).toUpperCase() + type.slice(1);
        if (type === 'price') {
            tagText.textContent = value;
        } else {
            tagText.textContent = `${displayType}: ${value}`;
        }
        
        // Handle tag removal
        removeTag.addEventListener('click', () => {
            if (type === 'price') {
                activeFilters.price.min = null;
                activeFilters.price.max = null;
                minPriceInput.value = '';
                maxPriceInput.value = '';
            } else {
                removeFilter(type, value);
                
                // Uncheck corresponding checkbox
                const checkbox = Array.from(checkboxes).find(cb => 
                    cb.getAttribute('name') === type && cb.getAttribute('value') === value
                );
                
                if (checkbox) checkbox.checked = false;
            }
            
            updateProducts();
            updateActiveFilters();
            updatePagination();
            currentPage = 1;
            renderProductPage();
        });
        
        activeFiltersContainer.appendChild(tagClone);
    }
}

// Filter and sort products
let filteredProducts = [];

function updateProducts() {
    // Apply filters
    filteredProducts = products.filter(product => {
        // Style filter
        if (activeFilters.style.length > 0 && !activeFilters.style.includes(product.style)) {
            return false;
        }
        
        // Collection filter
        if (activeFilters.collection.length > 0 && !activeFilters.collection.includes(product.collection)) {
            return false;
        }
        
        // Size filter (any of product sizes matches any of selected sizes)
        if (activeFilters.size.length > 0) {
            const hasMatchingSize = product.sizes.some(size => activeFilters.size.includes(size));
            if (!hasMatchingSize) return false;
        }
        
        // Fit filter
        if (activeFilters.fit.length > 0 && !activeFilters.fit.includes(product.fit)) {
            return false;
        }
        
        // Color filter (any of product colors matches any of selected colors)
        if (activeFilters.color.length > 0) {
            const hasMatchingColor = product.colors.some(color => activeFilters.color.includes(color));
            if (!hasMatchingColor) return false;
        }
        
        // Price range filter
        if (activeFilters.price.min !== null && product.price < activeFilters.price.min) {
            return false;
        }
        
        if (activeFilters.price.max !== null && product.price > activeFilters.price.max) {
            return false;
        }
        
        return true;
    });
    
    // Apply sorting
    filteredProducts.sort((a, b) => {
        switch (currentSort) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name-asc':
                return a.title.localeCompare(b.title);
            case 'name-desc':
                return b.title.localeCompare(a.title);
            case 'newest':
            default:
                return b.id - a.id; // Assuming newer products have higher IDs
        }
    });
    
    // Update product count
    productCountElement.textContent = filteredProducts.length;
    
    // Render the products for current page
    renderProductPage();
}

// Render products for current page
function renderProductPage() {
    productsGrid.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProducts = filteredProducts.slice(startIndex, endIndex);
    
    if (pageProducts.length === 0) {
        renderEmptyState();
        return;
    }
    
    pageProducts.forEach(product => {
        const productTemplate = document.getElementById('product-template');
        const productClone = productTemplate.content.cloneNode(true);
        
        const productCard = productClone.querySelector('.product-card');
        const productImage = productClone.querySelector('.product-image img');
        const productTitle = productClone.querySelector('.product-title');
        const productCollection = productClone.querySelector('.product-collection');
        const productStyle = productClone.querySelector('.product-style');
        const currentPrice = productClone.querySelector('.current-price');
        const originalPrice = productClone.querySelector('.original-price');
        const productColors = productClone.querySelector('.product-colors');
        const newBadge = productClone.querySelector('.new-badge');
        const saleBadge = productClone.querySelector('.sale-badge');
        
        // Set product data
        productCard.setAttribute('data-id', product.id);
        productImage.src = product.image;
        productImage.alt = product.title;
        productTitle.textContent = product.title;
        productCollection.textContent = product.collection;
        productStyle.textContent = product.style;
        currentPrice.textContent = `$${product.price.toFixed(2)}`;
        
        // Original price (if on sale)
        if (product.originalPrice) {
            originalPrice.textContent = `$${product.originalPrice.toFixed(2)}`;
        } else {
            originalPrice.style.display = 'none';
        }
        
        // Badges
        if (!product.isNew) {
            newBadge.style.display = 'none';
        }
        
        if (!product.onSale) {
            saleBadge.style.display = 'none';
        }
        
        // Color dots
        product.colors.forEach(color => {
            const colorDot = document.createElement('span');
            colorDot.className = 'color-dot';
            
            // Set color based on our palette
            switch (color) {
                case 'Clear Blue':
                    colorDot.style.background = 'linear-gradient(135deg, #87CEEB, #1E90FF)';
                    break;
                case 'Sunset Glow':
                    colorDot.style.background = 'linear-gradient(135deg, #FF7F50, #FF4500)';
                    break;
                case 'Storm Brewing':
                    colorDot.style.background = 'linear-gradient(135deg, #708090, #4682B4)';
                    break;
                case 'Starry Night':
                    colorDot.style.background = 'linear-gradient(135deg, #191970, #000033)';
                    break;
                case 'Rainbow Sky':
                    colorDot.style.background = 'linear-gradient(135deg, #FF69B4, #FF1493)';
                    break;
                case 'White':
                    colorDot.style.background = 'white';
                    colorDot.style.border = '1px solid #ddd';
                    break;
                case 'Black':
                    colorDot.style.background = 'black';
                    break;
                case 'Gray':
                    colorDot.style.background = 'gray';
                    break;
                default:
                    colorDot.style.background = color.toLowerCase();
            }
            
            colorDot.setAttribute('title', color);
            productColors.appendChild(colorDot);
        });
        
        // Add quick view and wishlist functionality
        const quickViewBtn = productClone.querySelector('.quick-view');
        const wishlistBtn = productClone.querySelector('.add-to-wishlist');
        
        quickViewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert(`Quick view for ${product.title}`);
            // Implement quick view modal here
        });
        
        wishlistBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert(`Added ${product.title} to wishlist`);
            // Implement wishlist functionality here
        });
        
        // Make entire card clickable
        productCard.addEventListener('click', () => {
            window.location.href = `#product-${product.id}`;
            // In production, navigate to actual product page
        });
        
        productsGrid.appendChild(productClone);
    });
}

// Empty state when no products match filters
function renderEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    
    emptyState.innerHTML = `
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-message">No products match your filters</h3>
        <p class="empty-state-suggestion">Try adjusting your filter criteria or browse our entire collection.</p>
        <button class="reset-filters-btn">Clear All Filters</button>
    `;
    
    const resetBtn = emptyState.querySelector('.reset-filters-btn');
    resetBtn.addEventListener('click', clearAllFilters);
    
    productsGrid.appendChild(emptyState);
}

// Update pagination controls
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pageNumbers = document.querySelector('.page-numbers');
    
    // Update page buttons
    pageNumbers.innerHTML = '';
    
    // Only show 3 page buttons centered around current page
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + 2);
    
    // Adjust start if we're at the end
    if (endPage - startPage < 2 && startPage > 1) {
        startPage = Math.max(1, endPage - 2);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-btn';
        pageBtn.textContent = i;
        
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            updatePagination();
            renderProductPage();
            productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        
        pageNumbers.appendChild(pageBtn);
    }
    
    // Update prev/next buttons
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Handle window resize
window.addEventListener('resize', () => {
    itemsPerPage = window.innerWidth > 640 ? 12 : 8;
    updatePagination();
    renderProductPage();
});
