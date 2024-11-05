import { useState } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";

import { FavoriteCityToRemove, FavoriteCity } from "../types/favoriteCityTypes";

const useFavoriteCities = () => {
  const [favoriteCities, setFavoriteCities] = useState<FavoriteCity[]>(() =>
    getLocalStorageItem("favoriteCities", [])
  );

  const addCity = (city: FavoriteCity) => {
    const updatedCities = [...favoriteCities, city];
    setLocalStorageItem("favoriteCities", updatedCities);
    setFavoriteCities(updatedCities);
  };

  const favoriteCityToRemove = (city: FavoriteCityToRemove) => {
    const updatedCities = favoriteCities.filter((c) => c.city !== city);

    if (updatedCities.length === 0) {
      localStorage.removeItem("favoriteCities");
    } else {
      setLocalStorageItem("favoriteCities", updatedCities);
    }
    setFavoriteCities(updatedCities);
  };

  const removeAllCities = () => {
    localStorage.clear();
    setFavoriteCities([]);
  };

  return {
    favoriteCities,
    addCity,
    favoriteCityToRemove,
    removeAllCities,
  };
};

export default useFavoriteCities;
