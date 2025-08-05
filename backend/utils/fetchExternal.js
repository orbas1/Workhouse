async function fetchExternal(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Workhouse/1.0' } });
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
}
module.exports = fetchExternal;
