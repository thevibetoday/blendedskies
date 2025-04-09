let allProducts = [];

function renderProducts(products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>$${product.price}</p>
      <p>Sizes: ${product.sizes.join(', ')}</p>
      <a href="test-product.html?slug=${product.slug}">View Product</a>
    </div>
  `).join('');
}

function filterBySize(size) {
  if (!size) return allProducts;
  return allProducts.filter(p => p.sizes.includes(size));
}

fetch('/data/test-products.json')
  .then(res => res.json())
  .then(products => {
    allProducts = products;
    renderProducts(products);

    document.getElementById('sizeFilter').addEventListener('change', (e) => {
      const filtered = filterBySize(e.target.value);
      renderProducts(filtered);
    });
  });
