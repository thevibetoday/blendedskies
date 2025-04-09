/**
 * Main application logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Shopify client
    // Replace with your Shopify store details
    const shopify = new ShopifyClient({
        domain: 'your-store.myshopify.com',
        storefrontAccessToken: 'your-storefront-access-token',
        apiVersion: '2023-07' // Use latest available version
    });

    // DOM elements
    const productsContainer = document.getElementById('products-container');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');
    const viewCartButton = document.getElementById('view-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout-button');

    // Load products on page load
    loadProducts();

    // Event listeners
    if (viewCartButton) {
        viewCartButton.addEventListener('click', openCartModal);
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeCartModal);
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            shopify.redirectToCheckout();
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });

    /**
     * Load products from Shopify
     */
    async function loadProducts() {
        if (!productsContainer) return;

        try {
            const products = await shopify.fetchProducts();
            renderProducts(products);
        } catch (error) {
            console.error('Error loading products:', error);
            productsContainer.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        }
    }

    /**
     * Render products in the DOM
     */
    function renderProducts(products) {
        if (!productsContainer) return;

        if (products.length === 0) {
            productsContainer.innerHTML = '<p>No products found.</p>';
            return;
        }

        productsContainer.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            const formattedPrice = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(product.price);

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">${formattedPrice}</p>
                    <button class="add-to-cart" data-product-id="${product.id}" data-variant-id="${product.variantId}">
                        Add to Cart
                    </button>
                </div>
            `;

            productsContainer.appendChild(productCard);

            // Add event listener to the Add to Cart button
            const addToCartButton = productCard.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', () => {
                shopify.addToCart(product);
                updateCartDisplay();
                openCartModal();
            });
        });
    }

    /**
     * Open cart modal
     */
    function openCartModal() {
        updateCartDisplay();
        cartModal.style.display = 'block';
    }

    /**
     * Close cart modal
     */
    function closeCartModal() {
        cartModal.style.display = 'none';
    }

    /**
     * Update cart display
     */
    function updateCartDisplay() {
        if (!cartItemsContainer || !cartTotalPrice) return;

        cartItemsContainer.innerHTML = '';

        if (shopify.cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalPrice.textContent = '$0.00';
            return;
        }

        shopify.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            const itemTotal = (parseFloat(item.price) * item.quantity).toFixed(2);
            const formattedPrice = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(itemTotal);

            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <p class="cart-item-title">${item.title}</p>
                    <p class="cart-item-price">${formattedPrice}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-variant-id="${item.variantId}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-variant-id="${item.variantId}">+</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);

            // Add event listeners to quantity buttons
            const decreaseButton = cartItem.querySelector('.decrease');
            const increaseButton = cartItem.querySelector('.increase');

            decreaseButton.addEventListener('click', () => {
                shopify.updateCartItemQuantity(item.variantId, item.quantity - 1);
                updateCartDisplay();
            });

            increaseButton.addEventListener('click', () => {
                shopify.updateCartItemQuantity(item.variantId, item.quantity + 1);
                updateCartDisplay();
            });
        });

        // Update total price
        const total = shopify.getCartTotal();
        cartTotalPrice.textContent = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(total);
    }
});
