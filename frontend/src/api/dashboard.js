import apiClient from '../utils/apiClient.js';

export async function getDashboard(role = 'buyer') {
  let endpoint = '/dashboard/client';
  if (role === 'seller') endpoint = '/dashboard/freelancer';
  if (role === 'admin' || role === 'super_admin') endpoint = '/admin/dashboard';
  const { data } = await apiClient.get(endpoint);
  return data;
}
