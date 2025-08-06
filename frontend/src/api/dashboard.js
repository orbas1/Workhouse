import apiClient from '../utils/apiClient.js';

export async function getDashboard(role = 'client') {
  const endpoint = role === 'freelancer' ? '/dashboard/freelancer' : '/dashboard/client';
  const { data } = await apiClient.get(endpoint);
  return data;
}
