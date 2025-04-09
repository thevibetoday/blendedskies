const SHOP_DOMAIN = 'sq8wck-y0.myshopify.com';
const ACCESS_TOKEN = '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';
const COLLECTION_HANDLE = 'All-Inventory'; // e.g., 'summer-collection'

// GraphQL query to get products in a collection
const query = `
  query getProductsInCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

// Function to fetch products from Shopify
async function fetchProducts() {
    try {
        const response = await fetch(`https://${SHOP_DOMAIN}/api/2023-10/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
            },
            body: JSON.stringify({
                query,
                variables: {
                    handle: COLLECTION_HANDLE
                }
            })
        });

        const jsonResponse = await response.json();
        
        if (jsonResponse.errors) {
            console.error('GraphQL errors:', jsonResponse.errors);
            return;
        }

        const collection = jsonResponse.data.collection;
        if (!collection) {
            console.error('Collection not found');
            return;
        }

        displayProducts(collection);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to display products on the page
function displayProducts(collection) {
    const container = document.getElementById('products-container');
    
    // Set the page title to collection name
    document.querySelector('h1').textContent = collection.title;

    // Loop through products and create HTML elements
    collection.products.edges.forEach(({node: product}) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const image = product.images.edges.length > 0 
            ? product.images.edges[0].node.url 
            : 'https://via.placeholder.com/150';
        
        const altText = product.images.edges.length > 0 
            ? product.images.edges[0].node.altText || product.title
            : product.title;

        const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);
        const currency = product.priceRange.minVariantPrice.currencyCode;

        productCard.innerHTML = `
            <img class="product-image" src="${image}" alt="${altText}">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">${currency} ${price}</p>
            <a href="https://${SHOP_DOMAIN}/products/${product.handle}" target="_blank">View Product</a>
        `;

        container.appendChild(productCard);
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', fetchProducts);
