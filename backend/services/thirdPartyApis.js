const axios = require('axios');

// The following functions demonstrate integrations with a variety of free third-party
// services. They act as lightweight wrappers around publicly accessible APIs so
// the rest of the application can experiment with different platform features
// without vendor lock-in.

async function getVrCapabilities() {
  // Placeholder for a virtual reality compatibility check. In practice this could
  // call a WebXR or similar API. JSONPlaceholder is used purely for demonstration.
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  return data;
}

async function verifyIdentity() {
  // Uses the free Random User API to mock identity verification.
  const { data } = await axios.get('https://randomuser.me/api/');
  return data;
}

async function getVisionOsSample() {
  // Placeholder endpoint for Vision OS related data.
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/2');
  return data;
}

async function getCloudflareTrace() {
  // Cloudflare provides a free trace endpoint useful for diagnostics.
  const { data } = await axios.get('https://www.cloudflare.com/cdn-cgi/trace');
  return data;
}

async function fetchFromCdn(packageName = 'axios@latest') {
  // Retrieve a package directly from the jsDelivr free CDN.
  const url = `https://cdn.jsdelivr.net/npm/${packageName}`;
  const { data } = await axios.get(url);
  return data;
}

async function fetchCached(url = 'https://example.com') {
  // AllOrigins offers a free caching proxy for public requests.
  const endpoint = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const { data } = await axios.get(endpoint);
  return data;
}

const MIXCLOUD_API = process.env.MIXCLOUD_API || 'https://api.mixcloud.com';

async function getPodcastSample() {
  // Mixcloud exposes a free API with podcast and music information.
  const { data } = await axios.get(`${MIXCLOUD_API}/popular/`);
  return data;
}

async function getVoiceChatSample() {
  // Placeholder for a voice chat API. Replace with a WebRTC service such as Jitsi.
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/3');
  return data;
}

module.exports = {
  getVrCapabilities,
  verifyIdentity,
  getVisionOsSample,
  getCloudflareTrace,
  fetchFromCdn,
  fetchCached,
  getPodcastSample,
  getVoiceChatSample,
};

