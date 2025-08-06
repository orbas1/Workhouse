require('./config/env');
const express = require('express');
const cors = require('cors');
const products = require('./data/products.json');
const authRoutes = require('./routes/auth');
const landingRoutes = require('./routes/landing');
const api = require("./api");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/operations/retail/products', (req, res) => {
  res.json(products);
});

app.use('/auth', authRoutes);
app.use('/landing', landingRoutes);

const port = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;
