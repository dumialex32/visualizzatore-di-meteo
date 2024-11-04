import { useState } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";
// import { isEqual } from "../utils/general";
import { FavoriteCity } from "../types/favoriteCityTypes";

const useFavoriteCities = () => {
  const [favoriteCities, setFavoriteCities] = useState<FavoriteCity[]>(() =>
    getLocalStorageItem("favoriteCities", [])
  );

  const addCity = (city: FavoriteCity) => {
    const updatedCities = [...favoriteCities, city];
    setLocalStorageItem("favoriteCities", updatedCities);
    setFavoriteCities(updatedCities);
  };

  const removeCity = (city: FavoriteCity) => {
    const updatedCities = favoriteCities.filter((c) => c.city !== city.city);

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
    removeCity,
    removeAllCities,
  };
};

export default useFavoriteCities;
