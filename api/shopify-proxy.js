export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://${process.env.SHOP_DOMAIN}/api/2023-10/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.ACCESS_TOKEN
        },
        body: JSON.stringify(req.body)
      }
    );
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
