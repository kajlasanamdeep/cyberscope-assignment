const qs = require('querystring');
const cache = require('../utils/cache');

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

async function getMarkets({ page=1, per_page=50 }) {
  const cacheKey = `markets:${page}:${per_page}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const params = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page,
    page,
    sparkline: false,
    price_change_percentage: '24h'
  };
  const url = `${COINGECKO_BASE}/coins/markets?${qs.stringify(params)}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`CoinGecko ${resp.status}`);
  const raw = await resp.json();

  const mapped = raw.map(c => ({
    id: c.id,
    name: c.name,
    symbol: c.symbol,
    current_price: c.current_price,
    high_24h: c.high_24h,
    low_24h: c.low_24h,
    price_change_percentage_24h: c.price_change_percentage_24h,
    image: c.image,
    market_cap_rank: c.market_cap_rank
  }));

  cache.set(cacheKey, mapped, 30);
  return mapped;
}

async function getCoinDetails(id) {
  const cacheKey = `coin:${id}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const params = {
    localization: false,
    tickers: false,
    market_data: true,
    community_data: false,
    developer_data: false,
    sparkline: false
  };
  const url = `${COINGECKO_BASE}/coins/${encodeURIComponent(id)}?${qs.stringify(params)}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`CoinGecko ${resp.status}`);
  const raw = await resp.json();

  const details = {
    id: raw.id,
    name: raw.name,
    description: raw.description?.en || '',
    image: raw.image?.large || raw.image?.thumb || null,
    market_data: {
      current_price: raw.market_data?.current_price?.usd || null,
      high_24h: raw.market_data?.high_24h?.usd || null,
      low_24h: raw.market_data?.low_24h?.usd || null,
      price_change_percentage_24h: raw.market_data?.price_change_percentage_24h_in_currency?.usd ?? null,
      price_change_percentage_7d: raw.market_data?.price_change_percentage_7d_in_currency?.usd ?? null,
      price_change_percentage_14d: raw.market_data?.price_change_percentage_14d_in_currency?.usd ?? null,
      price_change_percentage_30d: raw.market_data?.price_change_percentage_30d_in_currency?.usd ?? null,
      price_change_percentage_60d: raw.market_data?.price_change_percentage_60d_in_currency?.usd ?? null,
      price_change_percentage_200d: raw.market_data?.price_change_percentage_200d_in_currency?.usd ?? null,
      price_change_percentage_1y: raw.market_data?.price_change_percentage_1y_in_currency?.usd ?? null,
    }
  };

  cache.set(cacheKey, details, 60);
  return details;
}

module.exports = { getMarkets, getCoinDetails };