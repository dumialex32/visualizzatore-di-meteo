import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cityAutoCompleteApi } from "../api/cityAutocompleteApi";

import { Suggestions } from "../types/suggestionsTypes";

const useSearchCity = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState<string>("");
  const [selectedCityCoords, setSelectedCityCoords] = useState<
    [lat: string, lon: string] | []
  >([]);
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
  const [error, setError] = useState<string>("");
  console.log(suggestions);
  const [lat, lon] = selectedCityCoords;

  const searchCity = useCallback(async () => {
    if (selectedCityCoords.length > 0) return;
    try {
      const data = await cityAutoCompleteApi(city);
      setSuggestions(data);
    } catch (err) {
      setError(err as string);
    }
  }, [city, selectedCityCoords.length]);

  const handleSelectedCity = (
    selectedCity: string,
    coords: [lat: string, lng: string]
  ) => {
    console.log(selectedCity);
    setCity(selectedCity);
    setSuggestions([]);
    setSelectedCityCoords(coords);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!lat || !lon) {
      console.error("Latitude or Longitude is undefined");
      return;
    }

    navigate(`/meteo/${lat}/${lon}`, { state: city });
    setCity("");
    setSelectedCityCoords([]);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      searchCity();
    }, 400);

    return () => clearTimeout(debounceTimeout);
  }, [city, searchCity]);

  return { handleSubmit, city, setCity, suggestions, handleSelectedCity };
};

export default useSearchCity;
