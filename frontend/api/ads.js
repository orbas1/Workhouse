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
