const store = new Map();
function set(key, value, ttlSeconds = 30) {
  const expires = Date.now() + ttlSeconds * 1000;
  store.set(key, { value, expires });
}

function get(key) {
  const v = store.get(key);
  if (!v) return null;
  if (Date.now() > v.expires) { store.delete(key); return null; }
  return v.value;
}

module.exports = { set, get };