const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

export async function fetchCoins({ page=1, per_page=20 } = {}) {
  const resp = await fetch(`${API_BASE}/coins?page=${page}&per_page=${per_page}`);
  if (!resp.ok) throw new Error('Failed to fetch coins');
  return resp.json();
}

export async function fetchCoinDetails(id) {
  const resp = await fetch(`${API_BASE}/coins/${encodeURIComponent(id)}`);
  if (!resp.ok) throw new Error('Failed to fetch coin details');
  return resp.json();
}
