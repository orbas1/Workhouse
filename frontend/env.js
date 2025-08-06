const apiBase = import.meta.env.VITE_API_BASE_URL || '';

window.env = {
  API_BASE_URL: apiBase,
  AVATAR_API: import.meta.env.VITE_AVATAR_API,
  JITSI_DOMAIN: import.meta.env.VITE_JITSI_DOMAIN,
  JITSI_ROOM_PREFIX: import.meta.env.VITE_JITSI_ROOM_PREFIX,
  CLASSROOM_DEFAULT_ROOM: import.meta.env.VITE_CLASSROOM_DEFAULT_ROOM,
  ADVICE_API: apiBase + (import.meta.env.VITE_ADVICE_API || '/advice'),
  WORLD_TIME_API: apiBase + (import.meta.env.VITE_WORLD_TIME_API || '/worldtime'),
  INDUSTRIES_API: apiBase + (import.meta.env.VITE_INDUSTRIES_API || '/industries'),
  CURRENCY_API: apiBase + (import.meta.env.VITE_CURRENCY_API || '/currency'),
  BLOG_IMAGE_API: apiBase + (import.meta.env.VITE_BLOG_IMAGE_API || '/blog/images'),
  ADS_PLACEHOLDER_API: apiBase + (import.meta.env.VITE_ADS_PLACEHOLDER_API || '/ads/placeholder'),
  GIG_PLACEHOLDER_URL: apiBase + (import.meta.env.VITE_GIG_PLACEHOLDER_URL || '/gigs/placeholder'),
  FILE_IO_API: apiBase + (import.meta.env.VITE_FILE_IO_API || '/files'),
  ANALYTICS_ENDPOINT: import.meta.env.VITE_ANALYTICS_ENDPOINT,
  AUDIT_RESULTS_ENDPOINT: import.meta.env.VITE_AUDIT_RESULTS_ENDPOINT,
  IDE_URL: import.meta.env.VITE_IDE_URL,
  N8N_URL: import.meta.env.VITE_N8N_URL,
};
