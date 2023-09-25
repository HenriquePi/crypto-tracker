"use client"
import React, { createContext, useState, useEffect, ReactNode } from "react";
import localforage from "localforage";
import { getTopCryptos, getSpecificCryptos } from "@/utils/cryptoAPI"; // Replace with your API functions and types
import { Coin } from "@/types/Coin";

const APP_NAME = "CRYPTO_TRACKER";

localforage.config({
  name: APP_NAME,
  version: 1.0,
  storeName: "keyvaluepairs",
  description: "",
});

const LOCAL_STORAGE_KEYS = Object.freeze({
  FAVORITE_CRYPTOS: `${APP_NAME}_FAVORITE_CRYPTOS`,
});

const checkForStoredFavorites = async () => {
  try {
    const storedFavorites = await localforage.getItem<string[]>(
      LOCAL_STORAGE_KEYS.FAVORITE_CRYPTOS
    );
    if (Array.isArray(storedFavorites)) {
      return storedFavorites;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

const updateStoredFavorites = async (favorites: string[]) => {
  try {
    await localforage.setItem(
      LOCAL_STORAGE_KEYS.FAVORITE_CRYPTOS,
      favorites
    );
  } catch (e) {
    console.error(e);
  }
};

export const UserContext = createContext({
  getTopAmount: 10,
  setGetTopAmount: (newAmount: number) => {},
  favoriteCryptos: [] as string[],
  trackedCryptoData: [] as Coin[],
  topCryptoData: [] as Coin[],
  updateFavoriteCryptos: (newFavorites: string[]) => {},
  searchQuery: '' as string,
  setSearchQuery: (newQuery: string) => {},

});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [favoriteCryptos, setFavoriteCryptos] = useState<string[]>([]);
  const [trackedCryptoData, setTrackedCryptoData] = useState<Coin[]>([]);
  const [topCryptoData, setTopCryptoData] = useState<Coin[]>([]);
  const [getTopAmount, setGetTopAmount] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const updateFavoriteCryptos = async (newFavorites: string[]) => {
    setFavoriteCryptos(newFavorites);
    updateStoredFavorites(newFavorites);
  };

  const fetchTopCryptosData = async () => {
    try {
      const topData = await getTopCryptos(getTopAmount, favoriteCryptos); // Fetch top 10 data
      if (searchQuery.length > 0) {
        const filteredData = topData.filter((item: Coin) => {
          return item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.symbol.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setTopCryptoData(filteredData); // Set top data
      } else {
        setTopCryptoData(topData);
      }
    } catch (error) {
      console.error("Error fetching top cryptocurrencies:", error);
    }
  };

  const fetchTrackedCryptosData = async () => {
    try {
      const trackedData = await getSpecificCryptos(favoriteCryptos);
      setTrackedCryptoData(trackedData);
    } catch (error) {
      console.error("Error fetching specific cryptocurrencies:", error);
    }
  };

  const getCryptos = async () => {
    await fetchTopCryptosData();
    await fetchTrackedCryptosData();
  };

  // On mount, check for stored favorites
  useEffect(() => {
    checkForStoredFavorites().then((storedFavorites) => {
      setFavoriteCryptos(storedFavorites);
    });
  }, []);

  // refresh data every minute
  useEffect(() => {
    // Set up a timer to fetch data every minute
    const timer = setInterval(getCryptos, 60000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // update cryptos on change of tracked list
  useEffect(() => {
    fetchTrackedCryptosData();
  }, [favoriteCryptos]);

  // update cryptos on change of top amount
  useEffect(() => {
    fetchTopCryptosData();
  }, [getTopAmount, searchQuery]);


  return (
    <UserContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        getTopAmount,
        setGetTopAmount,
        favoriteCryptos,
        trackedCryptoData,
        topCryptoData,
        updateFavoriteCryptos,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

