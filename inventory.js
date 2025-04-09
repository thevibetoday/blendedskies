document.addEventListener('DOMContentLoaded', function() {
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
    
    const filterOverlay = document.createElement('div');
    filterOverlay.className = 'filter-overlay';
    document.body.appendChild(filterOverlay);
    
    if (filterPanel) {
        const filterPanelClose = document.createElement('button');
        filterPanelClose.className = 'filter-panel-close';
        filterPanelClose.innerHTML = '×';
        filterPanel.appendChild(filterPanelClose);
        
        filterPanelClose.addEventListener('click', closeFilterPanel);
    }
    
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
    let filteredProducts = [];
    
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
        }
    ];
    
    if (filterTitles && filterTitles.length > 0) {
        initializeFilterToggles();
    }
    
    if (mobileFilterToggle && filterPanel) {
        setupMobileFilters();
    }
    
    if (checkboxes && checkboxes.length > 0) {
        setupFilterListeners();
    }
    
    if (productsGrid) {
        updateProducts();
        updatePagination();
    }
    
    function initializeFilterToggles() {
        filterTitles.forEach(title => {
            const targetId = title.getAttribute('data-toggle');
            const targetOptions = document.getElementById(targetId);
            
            if (!targetOptions) return;
            
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
            
            if (title === filterTitles[0]) {
                title.setAttribute('aria-expanded', 'true');
                targetOptions.classList.add('expanded');
                targetOptions.style.maxHeight = targetOptions.scrollHeight + 'px';
            } else {
                title.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    function setupMobileFilters() {
        mobileFilterToggle.addEventListener('click', () => {
            filterPanel.classList.add('active');
            filterOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        const closeBtn = filterPanel.querySelector('.filter-panel-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeFilterPanel);
        }
        
        filterOverlay.addEventListener('click', closeFilterPanel);
        
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
    
    function closeFilterPanel() {
        if (filterPanel) {
            filterPanel.classList.remove('active');
            filterOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function setupFilterListeners() {
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const filterType = checkbox.getAttribute('name');
                const filterValue = checkbox.getAttribute('value');
                
                if (checkbox.checked) {
                    addFilter(filterType, filterValue);
                } else {
                    removeFilter(filterType, filterValue);
                }
                
                if (productsGrid) {
                    updateProducts();
                    updateActiveFilters();
                    updatePagination();
                    currentPage = 1;
                    renderProductPage();
                }
            });
        });
        
        if (applyPriceBtn) {
            applyPriceBtn.addEventListener('click', () => {
                const minPrice = minPriceInput && minPriceInput.value ? parseFloat(minPriceInput.value) : null;
                const maxPrice = maxPriceInput && maxPriceInput.value ? parseFloat(maxPriceInput.value) : null;
                
                activeFilters.price.min = minPrice;
                activeFilters.price.max = maxPrice;
                
                if (productsGrid) {
                    updateProducts();
                    updateActiveFilters();
                    updatePagination();
                    currentPage = 1;
                    renderProductPage();
                }
            });
        }
        
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', clearAllFilters);
        }
        
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                currentSort = sortSelect.value;
                if (productsGrid) {
                    updateProducts();
                    currentPage = 1;
                    renderProductPage();
                }
            });
        }
        
        if (pageButtons && pageButtons.length > 0) {
            pageButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const page = parseInt(btn.textContent);
                    if (page !== currentPage) {
                        currentPage = page;
                        updatePagination();
                        renderProductPage();
                        
                        if (productsGrid) {
                            productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                });
            });
        }
        
        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                    renderProductPage();
                    if (productsGrid) {
                        productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        }
        
        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', () => {
                const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                    renderProductPage();
                    if (productsGrid) {
                        productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        }
    }
    
    function addFilter(type, value) {
        if (!activeFilters[type].includes(value)) {
            activeFilters[type].push(value);
        }
    }
    
    function removeFilter(type, value) {
        activeFilters[type] = activeFilters[type].filter(item => item !== value);
    }
    
    function clearAllFilters() {
        activeFilters = {
            style: [],
            size: [],
            fit: [],
            color: [],
            collection: [],
            price: { min: null, max: null }
        };
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        if (minPriceInput) minPriceInput.value = '';
        if (maxPriceInput) maxPriceInput.value = '';
        
        if (productsGrid) {
            updateProducts();
            updateActiveFilters();
            updatePagination();
            currentPage = 1;
            renderProductPage();
        }
    }
    
    function updateActiveFilters() {
        if (!activeFiltersContainer) return;
        
        activeFiltersContainer.innerHTML = '';
        
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
            if (!tagTemplate) {
                const tagElement = document.createElement('div');
                tagElement.className = 'filter-tag';
                tagElement.setAttribute('data-type', type);
                tagElement.setAttribute('data-value', value);
                
                let displayType = type.charAt(0).toUpperCase() + type.slice(1);
                let tagContent = type === 'price' ? value : `${displayType}: ${value}`;
                
                tagElement.innerHTML = `
                    <span class="tag-text">${tagContent}</span>
                    <span class="remove-tag">×</span>
                `;
                
                const removeTag = tagElement.querySelector('.remove-tag');
                removeTag.addEventListener('click', () => {
                    if (type === 'price') {
                        activeFilters.price.min = null;
                        activeFilters.price.max = null;
                        if (minPriceInput) minPriceInput.value = '';
                        if (maxPriceInput) maxPriceInput.value = '';
                    } else {
                        removeFilter(type, value);
                        
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
                
                activeFiltersContainer.appendChild(tagElement);
                return;
            }
            
            const tagClone = tagTemplate.content.cloneNode(true);
            
            const tagElement = tagClone.querySelector('.filter-tag');
            const tagText = tagClone.querySelector('.tag-text');
            const removeTag = tagClone.querySelector('.remove-tag');
            
            tagElement.setAttribute('data-type', type);
            tagElement.setAttribute('data-value', value);
            
            let displayType = type.charAt(0).toUpperCase() + type.slice(1);
            if (type === 'price') {
                tagText.textContent = value;
            } else {
                tagText.textContent = `${displayType}: ${value}`;
            }
            
            removeTag.addEventListener('click', () => {
                if (type === 'price') {
                    activeFilters.price.min = null;
                    activeFilters.price.max = null;
                    if (minPriceInput) minPriceInput.value = '';
                    if (maxPriceInput) maxPriceInput.value = '';
                } else {
                    removeFilter(type, value);
                    
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
    
    function updateProducts() {
        if (!productsGrid) return;
        
        filteredProducts = products.filter(product => {
            if (activeFilters.style.length > 0 && !activeFilters.style.includes(product.style)) {
                return false;
            }
            
            if (activeFilters.collection.length > 0 && !activeFilters.collection.includes(product.collection)) {
                return false;
            }
            
            if (activeFilters.size.length > 0) {
                const hasMatchingSize = product.sizes.some(size => activeFilters.size.includes(size));
                if (!hasMatchingSize) return false;
            }
            
            if (activeFilters.fit.length > 0 && !activeFilters.fit.includes(product.fit)) {
                return false;
            }
            
            if (activeFilters.color.length > 0) {
                const hasMatchingColor = product.colors.some(color => activeFilters.color.includes(color));
                if (!hasMatchingColor) return false;
            }
            
            if (activeFilters.price.min !== null && product.price < activeFilters.price.min) {
                return false;
            }
            
            if (activeFilters.price.max !== null && product.price > activeFilters.price.max) {
                return false;
            }
            
            return true;
        });
        
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
                    return b.id - a.id;
            }
        });
        
        if (productCountElement) {
            productCountElement.textContent = filteredProducts.length;
        }
        
        renderProductPage();
    }
    
    function renderProductPage() {
        if (!productsGrid) return;
        
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
            
            if (!productTemplate) {
                createProductCardDirect(product);
                return;
            }
            
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
            
            productCard.setAttribute('data-id', product.id);
            productImage.src = product.image;
            productImage.alt = product.title;
            productTitle.textContent = product.title;
            
            if (productCollection) productCollection.textContent = product.collection;
            if (productStyle) productStyle.textContent = product.style;
            
            currentPrice.textContent = `$${product.price.toFixed(2)}`;
            
            if (originalPrice) {
                if (product.originalPrice) {
                    originalPrice.textContent = `$${product.originalPrice.toFixed(2)}`;
                } else {
                    originalPrice.style.display = 'none';
                }
            }
            
            if (newBadge && !product.isNew) {
                newBadge.style.display = 'none';
            }
            
            if (saleBadge && !product.onSale) {
                saleBadge.style.display = 'none';
            }
            
            if (productColors) {
                product.colors.forEach(color => {
                    const colorDot = document.createElement('span');
                    colorDot.className = 'color-dot';
                    
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
            }
            
            const quickViewBtn = productClone.querySelector('.quick-view');
            const wishlistBtn = productClone.querySelector('.add-to-wishlist');
            
            if (quickViewBtn) {
                quickViewBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    alert(`Quick view for ${product.title}`);
                });
            }
            
            if (wishlistBtn) {
                wishlistBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    alert(`Added ${product.title} to wishlist`);
                });
            }
            
            productCard.addEventListener('click', () => {
                window.location.href = `#product-${product.id}`;
            });
            
            productsGrid.appendChild(productClone);
        });
    }
    
    function createProductCardDirect(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-id', product.id);
        
        card.innerHTML = `
            <div class="product-image">
                <div class="product-badges">
                    ${product.isNew ? '<span class="new-badge">New</span>' : ''}
                    ${product.onSale ? '<span class="sale-badge">Sale</span>' : ''}
                </div>
                <img src="${product.image}" alt="${product.title}">
                <div class="quick-actions">
                    <button class="quick-view" title="Quick View">👁️</button>
                    <button class="add-to-wishlist" title="Add to Wishlist">❤️</button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-meta">
                    <span class="product-collection">${product.collection}</span>
                    <span class="product-style">${product.style}</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-colors"></div>
            </div>
        `;
        
        const colors = card.querySelector('.product-colors');
        product.colors.forEach(color => {
            const colorDot = document.createElement('span');
            colorDot.className = 'color-dot';
            
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
            colors.appendChild(colorDot);
        });
        
        const quickViewBtn = card.querySelector('.quick-view');
        const wishlistBtn = card.querySelector('.add-to-wishlist');
        
        quickViewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert(`Quick view for ${product.title}`);
        });
        
        wishlistBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            alert(`Added ${product.title} to wishlist`);
        });
        
        card.addEventListener('click', () => {
            window.location.href = `#product-${product.id}`;
        });
        
        productsGrid.appendChild(card);
    }
    
    function renderEmptyState() {
        if (!productsGrid) return;
        
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        
        emptyState.innerHTML = `
            <div class="empty-state-message">No products match your filters</h3>
            <p class="empty-state-suggestion">Try adjusting your filter criteria or browse our entire collection.</p>
            <button class="reset-filters-btn">Clear All Filters</button>
        `;
        
        const resetBtn = emptyState.querySelector('.reset-filters-btn');
        resetBtn.addEventListener('click', clearAllFilters);
        
        productsGrid.appendChild(emptyState);
    }
    
    function updatePagination() {
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        const pageNumbers = document.querySelector('.page-numbers');
        
        if (!pageNumbers) return;
        
        pageNumbers.innerHTML = '';
        
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + 2);
        
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
                if (productsGrid) {
                    productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
            
            pageNumbers.appendChild(pageBtn);
        }
        
        if (prevPageBtn) prevPageBtn.disabled = currentPage === 1;
        if (nextPageBtn) nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
    
    window.addEventListener('resize', () => {
        itemsPerPage = window.innerWidth > 640 ? 12 : 8;
        updatePagination();
        renderProductPage();
    });
    
    const aboutUsButton = document.querySelector('.about-us-button');
    const aboutUsDropdown = document.querySelector('.about-us-dropdown');
    
    if (aboutUsButton && aboutUsDropdown) {
        aboutUsButton.addEventListener('click', function(e) {
            e.stopPropagation();
            aboutUsDropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (!aboutUsDropdown.contains(e.target) && !aboutUsButton.contains(e.target)) {
                aboutUsDropdown.classList.remove('active');
            }
        });
        
        const aboutUsMenuLinks = document.querySelectorAll('.about-us-menu a');
        if (aboutUsMenuLinks.length > 0) {
            aboutUsMenuLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    aboutUsDropdown.classList.remove('active');
                });
            });
        }
    }
});
