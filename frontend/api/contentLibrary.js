import apiFetch from '../utils/api.js';

export function fetchContentLibrary() {
  return apiFetch('/content-library');
}

export function fetchContentDetails(type, id) {
  return apiFetch(`/content-library/${type}/${id}`);
}
