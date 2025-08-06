import apiClient from '../utils/apiClient.js';

export function listDisputes(params = {}) {
  return apiClient.get('/disputes', { params }).then(res => res.data);
}
