// inventory.js (Immersive Experience)

document.addEventListener('DOMContentLoaded', function () {
  const inventoryBody = document.querySelector('.inventory-body');
  const productItems = document.querySelectorAll('.product-item');
  const productCount = document.querySelector('.count-number');

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
  }

  function handleFilterChange(groupKey, value, multi = true) {
    if (!multi) {
      activeFilters[groupKey] = [value];
    } else {
      const index = activeFilters[groupKey].indexOf(value);
      if (index > -1) {
        activeFilters[groupKey].splice(index, 1);
      } else {
        activeFilters[groupKey].push(value);
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
  }

  function initThemeFromSky() {
    const urlParams = new URLSearchParams(window.location.search);
    const sky = urlParams.get('sky');

    if (sky && inventoryBody) {
      inventoryBody.classList.add(`sky-${sky}`);
      activeFilters.sky = [sky];
    }
  }

  // Init
  attachListeners();
  initThemeFromSky();
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
});
