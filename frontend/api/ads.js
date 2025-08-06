async function getBillingInfo() {
  return apiFetch('/ads/billing');
}

async function getAnalytics() {
  return apiFetch('/ads/analytics');
}

async function getAdLibrary() {
  return apiFetch('/ads/library');
}

window.adsAPI = {
  getBillingInfo,
  getAnalytics,
  getAdLibrary
};
const API_BASE_URL = window.API_BASE_URL || '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Request failed');
  }
  return res.json();
}

export function fetchAds() {
  return request('/ads');
}

export function getAdPreferences() {
  return request('/ads/preferences');
}

export function updateAdPreferences(preferences) {
  return request('/ads/preferences', {
    method: 'POST',
    body: JSON.stringify({ preferences }),
  });
}

(function(global){
  async function createAd(groupId, data) {
    const res = await apiFetch(`/ads/groups/${groupId}/ads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create ad');
    return res.json();
  }

  async function getAd(groupId, adId) {
    const res = await apiFetch(`/ads/groups/${groupId}/ads/${adId}`);
    if (!res.ok) throw new Error('Failed to load ad');
    return res.json();
  }

  async function updateAd(groupId, adId, data) {
    const res = await apiFetch(`/ads/groups/${groupId}/ads/${adId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update ad');
    return res.json();
  }

  global.adsAPI = { createAd, getAd, updateAd };
})(window);
