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

// Function to fetch products from Shopify using our serverless function
async function fetchProducts() {
    try {
        const response = await fetch('/api/shopify-proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: {
                    handle: 'my-inventory'
                }
            })
        });
        
        const jsonResponse = await response.json();
        
        if (jsonResponse.errors) {
            console.error('GraphQL errors:', jsonResponse.errors);
            document.getElementById('products-container').innerHTML = 
                '<p class="error">Error loading products. Please try again later.</p>';
            return;
        }
        
        const collection = jsonResponse.data.collection;
        if (!collection) {
            console.error('Collection not found');
            document.getElementById('products-container').innerHTML = 
                '<p class="error">Collection not found. Please check your collection handle.</p>';
            return;
        }
        
        displayProducts(collection);
    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('products-container').innerHTML = 
            '<p class="error">Error connecting to server. Please try again later.</p>';
    }
}

// Function to display products on the page
function displayProducts(collection) {
    const container = document.getElementById('products-container');
    
    // Set the page title to collection name
    document.querySelector('h1').textContent = collection.title;
    
    // Clear any existing content
    container.innerHTML = '';
    
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
            <a href="https://${window.location.hostname.includes('vercel') ? 'sq8wck-y0.myshopify.com' : window.location.hostname}/products/${product.handle}" target="_blank">View Product</a>
        `;
        
        container.appendChild(productCard);
    });
}

// Initialize the app when the page is loaded
document.addEventListener('DOMContentLoaded', fetchProducts);
