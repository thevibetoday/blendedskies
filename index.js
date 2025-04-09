const express = require('express');
const app = express();
const shopify = require('./shopify');

app.use('/', shopify);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
