// shopifyClient.js

const SHOPIFY_DOMAIN = 'sq8wck-y0.myshopify.com';
const STOREFRONT_ACCESS_TOKEN = '1593bc8a72a930510d7570d437eb3fb2'; // never expose secret keys on frontend

export async function fetchProducts() {
  const endpoint = `https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          products(first: 5) {
            edges {
              node {
                id
                title
                description
              }
            }
          }
        }
      `,
    }),
  });

  const json = await response.json();
  return json.data.products.edges.map((edge) => edge.node);
}
