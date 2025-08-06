import apiClient from '../utils/apiClient.js';

export async function listProducts() {
  const { data } = await apiClient.get('/operations/retail/products');
  return data;
}

export async function getProduct(id) {
  const { data } = await apiClient.get(`/operations/retail/product/${id}`);
  return data;
}
