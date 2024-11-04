import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { cityAutoCompleteApi } from "../api/cityAutocompleteApi";
import { Suggestions } from "../types/suggestionsTypes";

const useSearchCity = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [city, setCity] = useState<string>("");
  const [selectedCityCoords, setSelectedCityCoords] = useState<{
    lat: string;
    lon: string;
  } | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setSelectedCityCoords(null);
  };

  const searchCity = useCallback(async () => {
    if (selectedCityCoords) return;
    try {
      const data = await cityAutoCompleteApi(city);
      setSuggestions(data);
    } catch (err) {
      setError(err as string);
    }
  }, [city, selectedCityCoords]);

  const handleSelectedCity = (
    selectedCity: string,
    coords: { lat: string; lon: string }
  ) => {
    setCity(selectedCity);
    setSuggestions([]);
    setSelectedCityCoords(coords);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCityCoords) {
      console.error("Latitude or Longitude is undefined");
      return;
    }

    navigate(`/meteo/${city}`, { state: selectedCityCoords });
    setCity("");
    setSelectedCityCoords(null);
    inputRef.current?.blur();
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      searchCity();
    }, 400);

    return () => clearTimeout(debounceTimeout);
  }, [city, searchCity]);

  return {
    city,
    inputRef,
    suggestions,
    error,
    handleSubmit,
    handleSelectedCity,
    handleInputChange,
  };
};

export default useSearchCity;
