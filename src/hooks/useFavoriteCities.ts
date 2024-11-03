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
    console.log(city);
    const updatedCities = [...favoriteCities, city];
    setLocalStorageItem("favoriteCities", updatedCities);
    setFavoriteCities(updatedCities);
  };

  const removeCity = (city: FavoriteCity) => {
    const updatedCities = favoriteCities.filter((c) => c.city !== city.city);

    console.log(updatedCities);
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
