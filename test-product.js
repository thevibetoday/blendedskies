function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug');
}

fetch('/data/test-products.json')
  .then(res => res.json())
  .then(products => {
    const slug = getSlug();
    const product = products.find(p => p.slug === slug);

    const container = document.getElementById('product-detail');

    if (!product) {
      container.innerHTML = '<p>Product not found.</p>';
      return;
    }

    container.innerHTML = `
      <h1>${product.name}</h1>
      <img src="${product.image}" alt="${product.name}" />
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
      <label for="sizeSelect">Select size:</label>
      <select id="sizeSelect">
        ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
      </select>
    `;
  });
