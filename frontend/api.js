window.api = {
  async fetchProducts() {
    const res = await fetch(`${window.API_BASE_URL}/operations/retail/products`);
    if (!res.ok) throw new Error('Failed to load products');
    return res.json();
  },
  async fetchProduct(id) {
    const res = await fetch(`${window.API_BASE_URL}/operations/retail/product/${id}`);
    if (!res.ok) throw new Error('Failed to load product');
    return res.json();
  }
};
