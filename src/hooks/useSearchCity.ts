import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cityAutoCompleteApi } from "../api/cityAutocompleteApi";
import { getCityWeatherApi } from "../api/cityWeatherApi";
import { Suggestions } from "../types/suggestionsTypes";
import { WeatherDataDispatch } from "../types/weatherDataTypes";

const useSearchCity = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState<string>("");
  const [selectedCityCoords, setSelectedCityCoords] = useState<
    [lat: string, lon: string] | []
  >([]);
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
  const [error, setError] = useState<string>("");

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
    setCity(selectedCity);
    setSuggestions([]);
    setSelectedCityCoords(coords);
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSetWeatherData: WeatherDataDispatch
  ) => {
    e.preventDefault();
    setCity("");
    if (selectedCityCoords.length === 0) return;

    try {
      const data = await getCityWeatherApi(selectedCityCoords);
      onSetWeatherData(data);
      navigate("/city-temp");
    } catch (err) {
      setError(err as string);
    }
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
