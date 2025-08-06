import apiClient from '../utils/apiClient.js';

export async function getProgressDashboard(userId) {
  const res = await apiClient.get(`/progress/dashboard/${userId}`);
  return res.data;
}

export async function getTasks(userId) {
  const res = await apiClient.get(`/progress/tasks/${userId}`);
  return res.data;
}

export default { getProgressDashboard, getTasks };

