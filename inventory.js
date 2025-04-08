document.addEventListener('DOMContentLoaded', function () {
  const inventoryBody = document.querySelector('.inventory-body');
  const productItems = document.querySelectorAll('.product-item');
  const productCount = document.querySelector('.count-number');
  const advancedFiltersContainer = document.querySelector('.advanced-filters');
  const advancedToggle = document.querySelector('.advanced-toggle');
  const filterSummaryContainer = document.createElement('div');
  filterSummaryContainer.classList.add('filter-summary');
  document.querySelector('.canvas-controls').insertBefore(filterSummaryContainer, document.querySelector('.control-panel').nextSibling);

  const filterGroups = {
    sky: document.querySelectorAll('.filter-circle[data-filter="sky"]'),
    type: document.querySelectorAll('.filter-chip[data-filter="type"]'),
    size: document.querySelectorAll('input[name="size"]'),
    color: document.querySelectorAll('input[name="color"]'),
    style: document.querySelectorAll('.filter-chip[data-filter="style"]'),
    fit: document.querySelectorAll('.filter-chip[data-filter="fit"]'),
    tier: document.querySelectorAll('.filter-chip[data-filter="tier"]')
  };

  const viewButtons = document.querySelectorAll('.view-btn');
  const productGrid = document.querySelector('.product-grid');
  const sortSelect = document.getElementById('sort-select');

  const activeFilters = {
    sky: [],
    type: [],
    size: [],
    color: [],
    style: [],
    fit: [],
    tier: []
  };

  function createFilterSummary() {
    filterSummaryContainer.innerHTML = '';
    Object.entries(activeFilters).forEach(([filterKey, values]) => {
      values.forEach(value => {
        const filterChip = document.createElement('div');
        filterChip.classList.add('filter-summary-chip');
        filterChip.textContent = value;
        filterChip.innerHTML += ' ✕';
        filterChip.addEventListener('click', () => {
          handleFilterChange(filterKey, value, true);
        });
        filterSummaryContainer.appendChild(filterChip);
      });
    });

    const clearAllButton = document.createElement('button');
    clearAllButton.textContent = 'Clear All Filters';
    clearAllButton.classList.add('clear-filters-btn');
    clearAllButton.addEventListener('click', clearAllFilters);
    filterSummaryContainer.appendChild(clearAllButton);

    filterSummaryContainer.style.display = Object.values(activeFilters).some(arr => arr.length > 0) ? 'flex' : 'none';
  }

  function clearAllFilters() {
    Object.keys(activeFilters).forEach(key => {
      activeFilters[key] = [];
      const elements = filterGroups[key];
      elements.forEach(el => {
        el.classList.remove('active');
        if (el.tagName === 'INPUT') {
          el.checked = false;
        }
      });
    });
    applyFilters();
  }

  function applyFilters() {
    let visibleCount = 0;

    productItems.forEach(item => {
      const matches = Object.keys(activeFilters).every(filterKey => {
        const itemAttr = item.getAttribute(`data-${filterKey}`);
        const itemValues = itemAttr ? itemAttr.split(',') : [];
        const filters = activeFilters[filterKey];

        return filters.length === 0 || filters.some(val => itemValues.includes(val));
      });

      item.style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
    });

    if (productCount) productCount.textContent = visibleCount;
    createFilterSummary();
  }

  function handleFilterChange(groupKey, value, multi = true) {
    const elements = Array.from(filterGroups[groupKey]);
    const elementToToggle = elements.find(el => 
      (el.getAttribute('data-value') === value) || (el.value === value)
    );

    if (!multi) {
      elements.forEach(el => el.classList.remove('active'));
      if (elementToToggle) elementToToggle.classList.add('active');
      activeFilters[groupKey] = [value];
    } else {
      const index = activeFilters[groupKey].indexOf(value);
      if (index > -1) {
        activeFilters[groupKey].splice(index, 1);
        if (elementToToggle) {
          elementToToggle.classList.remove('active');
          if (elementToToggle.tagName === 'INPUT') {
            elementToToggle.checked = false;
          }
        }
      } else {
        activeFilters[groupKey].push(value);
        if (elementToToggle) {
          elementToToggle.classList.add('active');
          if (elementToToggle.tagName === 'INPUT') {
            elementToToggle.checked = true;
          }
        }
      }
    }
    applyFilters();
  }

  function attachListeners() {
    Object.entries(filterGroups).forEach(([key, elements]) => {
      elements.forEach(el => {
        const value = el.getAttribute('data-value') || el.value;
        const multi = el.tagName !== 'INPUT';

        el.addEventListener('click', () => handleFilterChange(key, value, multi));
        if (el.tagName === 'INPUT') {
          el.addEventListener('change', () => handleFilterChange(key, value));
        }
      });
    });

    viewButtons.forEach(button => {
      button.addEventListener('click', function () {
        const viewType = this.getAttribute('data-view');

        viewButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });

        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');

        if (viewType === 'grid') {
          productGrid.classList.remove('flow-view');
        } else {
          productGrid.classList.add('flow-view');
        }
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const items = Array.from(productItems);

        items.sort((a, b) => {
          const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
          const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));

          switch (sortValue) {
            case 'price-low': return priceA - priceB;
            case 'price-high': return priceB - priceA;
            case 'bestsellers': return 0.5 - Math.random();
            default: return 0;
          }
        });

        items.forEach(item => productGrid.appendChild(item));
        applyFilters();
      });
    }

    if (advancedToggle) {
      advancedToggle.addEventListener('click', () => {
        advancedFiltersContainer.classList.toggle('expanded');
        advancedToggle.classList.toggle('expanded');
        advancedToggle.setAttribute('aria-expanded', 
          advancedToggle.classList.contains('expanded').toString()
        );
      });
    }
  }

  function initQuickView() {
    productItems.forEach(item => {
      const quickViewButton = document.createElement('button');
      quickViewButton.classList.add('quick-view-btn');
      quickViewButton.textContent = 'Quick View';
      
      quickViewButton.addEventListener('click', () => {
        const quickViewModal = document.createElement('div');
        quickViewModal.classList.add('quick-view-modal');
        
        const productDetails = item.cloneNode(true);
        productDetails.classList.add('modal-product-details');
        
        const closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerHTML = '&times;';
        
        closeButton.addEventListener('click', () => {
          document.body.removeChild(quickViewModal);
        });
        
        quickViewModal.appendChild(closeButton);
        quickViewModal.appendChild(productDetails);
        
        document.body.appendChild(quickViewModal);
      });
      
      item.appendChild(quickViewButton);
    });
  }

  function initThemeFromSky() {
    const urlParams = new URLSearchParams(window.location.search);
    const sky = urlParams.get('sky');

    if (sky && inventoryBody) {
      inventoryBody.classList.add(`sky-${sky}`);
      activeFilters.sky = [sky];
    }
  }

  attachListeners();
  initThemeFromSky();
  initQuickView();
  applyFilters();
});

window.addEventListener('DOMContentLoaded', () => {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
    setTimeout(() => {
      loadingOverlay.style.display = 'none';
    }, 300);
  }

  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'Search products...');
  searchInput.classList.add('product-search');
  
  const searchContainer = document.querySelector('.right-controls');
  searchContainer.insertBefore(searchInput, searchContainer.firstChild);

  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
      const productName = item.querySelector('.product-link').textContent.toLowerCase();
      const isVisible = productName.includes(searchTerm);
      
      item.style.display = isVisible ? '' : 'none';
    });
  });
});
