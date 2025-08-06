import apiClient from '../utils/apiClient.js';

export async function fetchDiscussions(communityId) {
  const { data } = await apiClient.get('/community/discussions', {
    params: { communityId },
  });
  return data;
}

export async function subscribeToCommunity(communityId) {
  const { data } = await apiClient.post(`/community/${communityId}/subscribe`);
  return data;
}

export async function checkCommunityAccess(communityId) {
  const { data } = await apiClient.get(`/community/${communityId}/access`);
  return data;
}

export async function listSubscribers(communityId) {
  const { data } = await apiClient.get(`/community/${communityId}/subscribers`);
  return data;
}
