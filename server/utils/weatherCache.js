
import NodeCache from "node-cache";

const weatherCache = new NodeCache({
  stdTTL: 600,
  checkperiod: 120,
  useClones: false
});

// Get fresh cached data
export const getCachedWeather = (key) => {
  return weatherCache.get(key);
};

// Store fresh data and a backup
export const setCachedWeather = (key, data, ttl = 600) => {
  weatherCache.set(key, data, ttl);

  // Keep backup for 24 hours
  weatherCache.set(`stale_${key}`, data, 86400);
};

// Retrieve backup data
export const getStaleWeather = (key) => {
  return weatherCache.get(`stale_${key}`);
};

// Check cache
export const hasCachedWeather = (key) => {
  return weatherCache.has(key);
};
