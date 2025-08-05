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
