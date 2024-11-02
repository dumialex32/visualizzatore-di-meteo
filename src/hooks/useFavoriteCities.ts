import { useState } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";
import { isEqual } from "../utils/general";
import { FavoriteCity } from "../types/favoriteCityTypes";

const useFavoriteCities = () => {
  const [favoriteCities, setFavoriteCities] = useState<FavoriteCity[]>(() =>
    getLocalStorageItem("favoriteCities", [])
  );

  const addCity = (city) => {
    const updatedCities = [...favoriteCities, city];
    setLocalStorageItem("favoriteCities", updatedCities);
    setFavoriteCities(updatedCities);
  };

  const removeCity = (city) => {
    const updatedCities = favoriteCities.filter((c) => !isEqual(c, city));
    setLocalStorageItem("favoriteCities", updatedCities);
    setFavoriteCities(updatedCities);
  };

  return {
    favoriteCities,
    addCity,
    removeCity,
  };
};

export default useFavoriteCities;
