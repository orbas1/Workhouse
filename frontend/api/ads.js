import { apiFetch } from '../utils/api.js';

export function getBillingInfo() {
  return apiFetch('/ads/billing');
}

export function getAnalytics() {
  return apiFetch('/ads/analytics');
}

export function getAdLibrary() {
  return apiFetch('/ads/library');
}

export function fetchAds() {
  return apiFetch('/ads');
}

export function getAdPreferences() {
  return apiFetch('/ads/preferences');
}

export function updateAdPreferences(preferences) {
  return apiFetch('/ads/preferences', {
    method: 'POST',
    body: JSON.stringify({ preferences })
  });
}

export function createAd(groupId, data) {
  return apiFetch(`/ads/groups/${groupId}/ads`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function getAd(groupId, adId) {
  return apiFetch(`/ads/groups/${groupId}/ads/${adId}`);
}

export function updateAd(groupId, adId, data) {
  return apiFetch(`/ads/groups/${groupId}/ads/${adId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}
