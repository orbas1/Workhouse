import apiClient from '../utils/apiClient.js';

export async function getStartupProfile() {
  const { data } = await apiClient.get('/startups/profile');
  return data;
}

export async function updateStartupProfile(profile) {
  const { data } = await apiClient.put('/startups/profile', profile);
  return data;
}

export default { getStartupProfile, updateStartupProfile };
