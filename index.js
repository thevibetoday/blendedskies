const express = require('express');
const fetch = require('node-fetch');
const app = express();

const SHOPIFY_DOMAIN = process.env.sq8wck-y0.myshopify.com;
const ACCESS_TOKEN = process.env.1593bc8a72a930510d7570d437eb3fb2;

app.use(express.static('public')); // serve your HTML files

app.get('/products', async (req, res) => {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            title
            description
            images(first: 1) {
              edges {
                node {
                  originalSrc
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    res.json(data.data.products.edges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
