import axios from 'axios';

const BASE_URL = window.env.API_BASE_URL;

export async function createService(data) {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${BASE_URL}/service-providers/services`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateService(serviceId, data) {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${BASE_URL}/service-providers/services/${serviceId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
