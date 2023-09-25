import { Coin } from "@/types/Coin";
import axios from "axios";

const COINGECKO_API_BASE_URL = "https://api.coingecko.com/api/v3";

// Function to make a generic GET request to the CoinGecko API
async function fetchCoinGeckoData(path: string, params: Record<string, any> = {}) {
  try {
    const response = await axios.get(`${COINGECKO_API_BASE_URL}${path}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from CoinGecko API: ${error}`);
    throw error;
  }
}

export const coinList = async () => {
  return fetchCoinGeckoData("/coins/list");
};

export const topCoins = async () => {
  return fetchCoinGeckoData("/coins/markets", {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: 20,
    page: 1,
    sparkline: false,
  });
};

export const getTopCryptos = async (limit = 10, ids: string[] | null = null) => {
  const params = {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: limit,
    page: 1,
    sparkline: false,
    ids: "",
  };

  if (ids) {
    params.ids = ids.join(",");
  }

  const data = await fetchCoinGeckoData("/coins/markets", params);

  // Set symbol to uppercase for each item in top
  data.forEach((item: Coin) => {
    item.symbol = item.symbol.toUpperCase();
  });

  return data;
};

export const getSpecificCryptos = async (cryptoIds: string[]) => {
  // Hack to tolerate the free API constraints, await for 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const params = {
    vs_currency: "usd",
    ids: cryptoIds.join(","),
    order: "market_cap_desc",
    sparkline: false,
  };

  const data = await fetchCoinGeckoData("/coins/markets", params);

  // Set symbol to uppercase for each item in top
  data.forEach((item: Coin) => {
    item.symbol = item.symbol.toUpperCase();
  });

  return data;
};
