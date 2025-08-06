const API = import.meta && import.meta.env && import.meta.env.VITE_WORLD_TIME_API ? import.meta.env.VITE_WORLD_TIME_API : 'https://worldtimeapi.org/api';

export async function fetchTimezones() {
  const res = await fetch(`${API}/timezone`);
  if (!res.ok) {
    throw new Error('Failed to load time zones');
  }
  return res.json();
}
