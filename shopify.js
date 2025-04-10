/**
 * Shopify API Integration
 * This file handles all Shopify API interactions
 */

class ShopifyClient {
    constructor(config) {
        this.domain = "sq8wck-y0.myshopify.com"; // Fixed with string literal
        this.storefrontAccessToken = "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"; // Fixed with string literal
        this.apiVersion = "2023-07"; // Use latest version available
        this.cart = [];
        this.checkoutUrl = null;
    }

    /**
     * Fetch products from Shopify using the Storefront API
     */
    async fetchProducts(limit = 12) {
        const query = `
            {
                products(first: ${limit}) {
                    edges {
                        node {
                            id
                            title
                            handle
                            description
                            images(first: 1) {
                                edges {
                                    node {
                                        originalSrc
                                        altText
                                    }
                                }
                            }
                            variants(first: 1) {
                                edges {
                                    node {
                                        id
                                        price
                                        availableForSale
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

        try {
            const response = await this._callStorefrontApi(query);
            return this._formatProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    /**
     * Format products from Shopify GraphQL response
     */
    _formatProducts(productsData) {
        return productsData.edges.map(edge => {
            const product = edge.node;
            const image = product.images.edges.length > 0 
                ? product.images.edges[0].node.originalSrc 
                : 'https://via.placeholder.com/300x200?text=No+Image';
            
            const variant = product.variants.edges[0].node;
            
            return {
                id: product.id,
                variantId: variant.id,
                title: product.title,
                handle: product.handle,
                description: product.description,
                price: variant.price,
                image: image,
                available: variant.availableForSale
            };
        });
    }

    /**
     * Call Shopify Storefront API
     */
    async _callStorefrontApi(query, variables = {}) {
        const url = `https://${this.domain}/api/${this.apiVersion}/graphql.json`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': this.storefrontAccessToken
            },
            body: JSON.stringify({ query, variables })
        });

        if (!response.ok) {
            throw new Error(`Shopify API error: ${response.statusText}`);
        }

        return await response.json();
    }

    /**
     * Add item to cart
     */
    addToCart(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.variantId === product.variantId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                variantId: product.variantId,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        this._updateCartCount();
        return this.cart;
    }

    /**
     * Update cart item quantity
     */
    updateCartItemQuantity(variantId, quantity) {
        const index = this.cart.findIndex(item => item.variantId === variantId);
        
        if (index !== -1) {
            if (quantity <= 0) {
                this.cart.splice(index, 1);
            } else {
                this.cart[index].quantity = quantity;
            }
        }
        
        this._updateCartCount();
        return this.cart;
    }

    /**
     * Get cart total price
     */
    getCartTotal() {
        return this.cart.reduce((total, item) => {
            return total + (parseFloat(item.price) * item.quantity);
        }, 0).toFixed(2);
    }

    /**
     * Update cart count in the UI
     */
    _updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
    }

    /**
     * Create checkout URL - redirects to Shopify's checkout
     */
    async createCheckout() {
        if (this.cart.length === 0) {
            return null;
        }

        const lineItems = this.cart.map(item => {
            return {
                variantId: item.variantId,
                quantity: item.quantity
            };
        });

        const query = `
            mutation checkoutCreate($input: CheckoutCreateInput!) {
                checkoutCreate(input: $input) {
                    checkout {
                        id
                        webUrl
                    }
                    checkoutUserErrors {
                        code
                        field
                        message
                    }
                }
            }
        `;

        const variables = {
            input: {
                lineItems: lineItems
            }
        };

        try {
            const response = await this._callStorefrontApi(query, variables);
            this.checkoutUrl = response.data.checkoutCreate.checkout.webUrl;
            return this.checkoutUrl;
        } catch (error) {
            console.error('Error creating checkout:', error);
            return null;
        }
    }

    /**
     * Redirect to Shopify checkout
     */
    redirectToCheckout() {
        if (this.checkoutUrl) {
            window.location.href = this.checkoutUrl;
        } else {
            this.createCheckout().then(url => {
                if (url) {
                    window.location.href = url;
                } else {
                    alert('Unable to create checkout. Please try again.');
                }
            });
        }
    }
}
