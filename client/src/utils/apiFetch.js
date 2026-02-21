export default async function apiFetch(url, options = {}) {
  const token = localStorage.getItem('btb_token');
  const headers = { ...options.headers };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    localStorage.removeItem('btb_token');
    window.dispatchEvent(new Event('auth:logout'));
  }
  return res;
}
