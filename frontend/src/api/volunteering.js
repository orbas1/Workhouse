import apiClient from '../utils/apiClient.js';

export async function getVolunteeringDashboard() {
  const res = await apiClient.get('/volunteering/dashboard');
  return res.data;
}

export default { getVolunteeringDashboard };

