const STORAGE_KEY = 'volunteerBookmarks';

export function getBookmarks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isBookmarked(id) {
  return getBookmarks().some(b => b.id === id);
}

export function toggleBookmark(opportunity) {
  const bookmarks = getBookmarks();
  const exists = bookmarks.some(b => b.id === opportunity.id);
  const updated = exists
    ? bookmarks.filter(b => b.id !== opportunity.id)
    : [...bookmarks, opportunity];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
