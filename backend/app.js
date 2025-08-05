const express = require('express');
const cors = require('cors');
const products = require('./data/products.json');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/operations/retail/products', (req, res) => {
  res.json(products);
});

app.get('/operations/retail/product/:productId', (req, res) => {
  const product = products.find(p => p.id === req.params.productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

module.exports = app;
