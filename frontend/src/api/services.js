import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function searchServices(params = {}) {
  const res = await axios.get(`${API_URL}/marketplace/services`, {
    params,
    headers: authHeader(),
  });
  return res.data;
}

export async function getService(id) {
  const res = await axios.get(`${API_URL}/marketplace/services/${id}`, {
    headers: authHeader(),
  });
  return res.data;
}

export async function requestService(serviceId, description = '') {
  const res = await axios.post(
    `${API_URL}/marketplace/services/request`,
    { serviceId, description },
    { headers: authHeader() }
  );
  return res.data;
}
