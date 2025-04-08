document.addEventListener('DOMContentLoaded', function() {
    const skySelector = document.querySelector('.sky-selector');
    const skyPanorama = document.querySelector('.sky-panorama');
    const skyBackdrop = document.querySelector('.sky-backdrop');
    const skyOptions = document.querySelector('.sky-options');
    const orbEmoji = document.querySelector('.orb-emoji');
    const orbInner = document.querySelector('.orb-inner');
    const inventoryBody = document.querySelector('.inventory-body');
    
    const skyFilters = document.querySelectorAll('.filter-circle[data-filter="sky"]');
    const typeFilters = document.querySelectorAll('.filter-chip[data-filter="type"]');
    const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
    const colorCheckboxes = document.querySelectorAll('input[name="color"]');
    const advancedToggle = document.querySelector('.advanced-toggle');
    const advancedFilters = document.querySelector('.advanced-filters');
    const productItems = document.querySelectorAll('.product-item');
    const productCount = document.querySelector('.count-number');
    
    const viewButtons = document.querySelectorAll('.view-btn');
    const productGrid = document.querySelector('.product-grid');
    const sortSelect = document.getElementById('sort-select');
    
    const loadingOverlay = document.getElementById('loading-overlay');
    
    let activeFilters = {
        sky: ['blended'],
        type: ['all'],
        sizes: ['m'],
        colors: ['blue']
    };
    
    function initializeImagesObserver() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.getAttribute('data-src');
            });
        }
    }
    
    function hideLoadingOverlay() {
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 300);
        }
    }
    
    function changeSkyTheme(skyType, skyIcon) {
        if (orbEmoji && orbInner) {
            orbEmoji.textContent = skyIcon;
            orbEmoji.style.opacity = '1';
            orbInner.style.opacity = '0';
        }
        
        if (inventoryBody) {
            inventoryBody.className = 'inventory-body';
            inventoryBody.classList.add(`sky-${skyType}`);
        }
        
        skyFilters.forEach(filter => {
            filter.setAttribute('aria-checked', filter.getAttribute('data-value') === skyType);
            filter.classList.toggle('active', filter.getAttribute('data-value') === skyType);
        });
        
        activeFilters.sky = [skyType];
        
        applyFilters();
        
        if (skyPanorama && skyBackdrop) {
            skyPanorama.classList.remove('open');
            skyBackdrop.classList.remove('active');
            skySelector.setAttribute('aria-expanded', 'false');
        }
    }
    
    function showNotification(message) {
        let notification = document.querySelector('.add-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'add-notification';
            document.body.appendChild(notification);
        }
        
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    function applyFilters() {
        let visibleCount = 0;
        
        productItems.forEach(item => {
            const sky = item.getAttribute('data-sky');
            const type = item.getAttribute('data-type');
            const sizes = item.getAttribute('data-sizes').split(',');
            const colors = item.getAttribute('data-colors').split(',');
            
            const matchesSky = activeFilters.sky.includes('all') || activeFilters.sky.includes(sky);
            const matchesType = activeFilters.type.includes('all') || activeFilters.type.includes(type);
            const matchesSize = activeFilters.sizes.length === 0 || 
                             sizes.some(size => activeFilters.sizes.includes(size));
            const matchesColor = activeFilters.colors.length === 0 || 
                              colors.some(color => activeFilters.colors.includes(color));
            
            const isVisible = matchesSky && matchesType && matchesSize && matchesColor;
            
            item.style.display = isVisible ? '' : 'none';
            
            if (isVisible) {
                visibleCount++;
            }
        });
        
        if (productCount) {
            productCount.textContent = visibleCount;
        }
        
        return visibleCount;
    }
    
    function updateProductFilters() {
        applyFilters();
    }
    
    if (skySelector && skyPanorama && skyBackdrop) {
        skySelector.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = skySelector.getAttribute('aria-expanded') === 'true';
            skySelector.setAttribute('aria-expanded', !isExpanded);
            skyPanorama.classList.toggle('open');
            skyBackdrop.classList.toggle('active');
        });
        
        skyBackdrop.addEventListener('click', function() {
            skyPanorama.classList.remove('open');
            skyBackdrop.classList.remove('active');
            skySelector.setAttribute('aria-expanded', 'false');
        });
        
        if (skyOptions) {
            skyOptions.addEventListener('click', function(e) {
                const option = e.target.closest('.sky-option');
                if (option) {
                    const skyType = option.getAttribute('data-sky');
                    const skyIcon = option.querySelector('.sky-icon').textContent;
                    changeSkyTheme(skyType, skyIcon);
                }
            });
            
            skyOptions.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    const option = e.target.closest('.sky-option');
                    if (option) {
                        e.preventDefault();
                        const skyType = option.getAttribute('data-sky');
                        const skyIcon = option.querySelector('.sky-icon').textContent;
                        changeSkyTheme(skyType, skyIcon);
                    }
                }
            });
        }
        
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
    
    if (advancedToggle && advancedFilters) {
        advancedToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            this.classList.toggle('expanded');
            advancedFilters.classList.toggle('expanded');
            this.querySelector('.toggle-text').textContent = 
                advancedFilters.classList.contains('expanded') ? 'Less Filters' : 'More Filters';
        });
    }
    
    if (viewButtons.length > 0 && productGrid) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const viewType = this.getAttribute('data-view');
                
                viewButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');
                
                if (viewType === 'grid') {
                    productGrid.classList.remove('flow-view');
                } else if (viewType === 'flow') {
                    productGrid.classList.add('flow-view');
                }
            });
        });
    }
    
    if (skyFilters.length > 0) {
        skyFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-value');
                
                skyFilters.forEach(f => {
                    f.classList.remove('active');
                    f.setAttribute('aria-checked', 'false');
                });
                
                this.classList.add('active');
                this.setAttribute('aria-checked', 'true');
                
                activeFilters.sky = [filterValue];
                
                applyFilters();
                
                if (orbEmoji && inventoryBody) {
                    const skyIcon = this.querySelector('.sky-dot').textContent;
                    orbEmoji.textContent = skyIcon;
                    orbEmoji.style.opacity = '1';
                    if (orbInner) orbInner.style.opacity = '0';
                    
                    inventoryBody.className = 'inventory-body';
                    inventoryBody.classList.add(`sky-${filterValue}`);
                }
            });
            
            filter.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    if (typeFilters.length > 0) {
        typeFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-value');
                
                typeFilters.forEach(f => {
                    f.classList.remove('active');
                    f.setAttribute('aria-checked', 'false');
                });
                
                this.classList.add('active');
                this.setAttribute('aria-checked', 'true');
                
                activeFilters.type = [filterValue];
                
                applyFilters();
            });
            
            filter.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    if (sizeCheckboxes.length > 0) {
        sizeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                activeFilters.sizes = Array.from(sizeCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                
                applyFilters();
            });
        });
    }
    
    if (colorCheckboxes.length > 0) {
        colorCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                activeFilters.colors = Array.from(colorCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                
                applyFilters();
            });
        });
    }
    
    if (sortSelect && productGrid) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const items = Array.from(productItems);
            
            items.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
                
                switch(sortValue) {
                    case 'price-low':
                        return priceA - priceB;
                    case 'price-high':
                        return priceB - priceA;
                    case 'bestsellers':
                        return 0.5 - Math.random();
                    default:
                        return 0;
                }
            });
            
            requestAnimationFrame(() => {
                items.forEach(item => {
                    productGrid.appendChild(item);
                });
                updateProductFilters();
            });
        });
    }
    
    const paginationButtons = document.querySelectorAll('.pagination button');
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            if (button.classList.contains('pagination-number')) {
                button.addEventListener('click', function() {
                    document.querySelectorAll('.pagination-number').forEach(btn => {
                        btn.classList.remove('active');
                        btn.removeAttribute('aria-current');
                    });
                    
                    this.classList.add('active');
                    this.setAttribute('aria-current', 'page');
                    
                    document.querySelector('.product-canvas').scrollIntoView({ behavior: 'smooth' });
                });
            } else if (button.classList.contains('pagination-arrow')) {
                button.addEventListener('click', function() {
                    if (this.classList.contains('next')) {
                        const currentPage = document.querySelector('.pagination-number.active');
                        const nextPage = currentPage.nextElementSibling;
                        if (nextPage && nextPage.classList.contains('pagination-number')) {
                            nextPage.click();
                        }
                    } else if (this.classList.contains('prev')) {
                        const currentPage = document.querySelector('.pagination-number.active');
                        const prevPage = currentPage.previousElementSibling;
                        if (prevPage && prevPage.classList.contains('pagination-number')) {
                            prevPage.click();
                        }
                    }
                });
            }
        });
    }
    
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const product = this.closest('.product-item');
            const productName = product.querySelector('h3').textContent;
            
            if (this.classList.contains('add-btn')) {
                showNotification(`${productName} added to bag`);
            } else if (this.classList.contains('view-btn')) {
                console.log(`Viewing ${productName}`);
            }
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const skyParam = urlParams.get('sky');
    
    if (skyParam && inventoryBody) {
        const validSkies = ['blended', 'clear-blue', 'sunset-glow', 'storm-brewing', 'starry-night', 'rainbow-sky'];
        
        if (validSkies.includes(skyParam)) {
            inventoryBody.className = 'inventory-body';
            inventoryBody.classList.add(`sky-${skyParam}`);
            
            skyFilters.forEach(filter => {
                const isActive = filter.getAttribute('data-value') === skyParam;
                filter.classList.toggle('active', isActive);
                filter.setAttribute('aria-checked', isActive);
            });
            
            if (orbEmoji && orbInner) {
                const skyOption = document.querySelector(`.sky-option[data-sky="${skyParam}"]`);
                if (skyOption) {
                    const skyIcon = skyOption.querySelector('.sky-icon').textContent;
                    orbEmoji.textContent = skyIcon;
                    orbEmoji.style.opacity = '1';
                    orbInner.style.opacity = '0';
                }
            }
            
            activeFilters.sky = [skyParam];
            updateProductFilters();
        }
    }
    
    function handleScrolling() {
        const canvasControls = document.querySelector('.canvas-controls');
        const scrollY = window.scrollY;
        
        if (canvasControls) {
            if (scrollY > 100) {
                canvasControls.classList.add('scrolled');
            } else {
                canvasControls.classList.remove('scrolled');
            }
        }
    }
    
    window.addEventListener('scroll', handleScrolling);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (skyPanorama && skyPanorama.classList.contains('open')) {
                skyPanorama.classList.remove('open');
                skyBackdrop.classList.remove('active');
                skySelector.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    initializeImagesObserver();
    updateProductFilters();
    hideLoadingOverlay();
});
