import Client from 'shopify-buy';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Shopify Client
const client = Client.buildClient({
  domain: process.env.sq8wck-y0.myshopify.com,
  storefrontAccessToken: process.env.1593bc8a72a930510d7570d437eb3fb2
});

// Fetch All Products
export async function fetchProducts() {
  try {
    const products = await client.product.fetchAll();
    return products.map(product => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.variants[0].price,
      images: product.images.map(img => img.src)
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

// Fetch Single Product
export async function fetchProductById(productId) {
  try {
    const product = await client.product.fetch(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.variants[0].price,
      images: product.images.map(img => img.src)
    };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}
