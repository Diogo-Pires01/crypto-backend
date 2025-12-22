const axios = require("axios");
const CryptoData = require("../models/cryptoData.model");

async function fetchCryptoDataAndSave() {
  try {
    const coins = ["bitcoin", "ethereum", "cardano", "solana"];

    CryptoData.deleteOldest(4, (err) => {
      if (err) throw err;
    });

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          ids: coins.join(","),
          order: "market_cap_desc",
          per_page: 4,
          page: 1,
        },
      }
    );

    const data = response.data;

    // salvar cada moeda no DB
    for (const coin of data) {
      const info = {
        nome: coin.id,
        symbol: coin.symbol,
        preco: coin.current_price,
        variacao24h: coin.price_change_percentage_24h,
      };

      await CryptoData.create(info);
    }

    return data;
  } catch (err) {
    console.error("Erro ao buscar dados da API:", err);
    throw err;
  }
}

let cache = {};
let lastFetch = 0;

async function getHistory(coin) {
  const now = Date.now();

  // 5 minutos de cache
  if (cache[coin] && now - lastFetch < 5 * 60 * 1000) {
    return cache[coin];
  }

  const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`;
  const params = { vs_currency: "usd", days: 30 };

  const response = await axios.get(url, { params });

  const prices = response.data.prices.map((p) => ({
    date: new Date(p[0]).toISOString().split("T")[0],
    price: p[1],
  }));

  cache[coin] = prices;
  lastFetch = now;

  return prices;
}

module.exports = { fetchCryptoDataAndSave, getHistory };
