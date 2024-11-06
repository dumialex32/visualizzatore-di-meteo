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
    lat: number;
    lon: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
  const [error, setError] = useState<string>("");

  // funzione per gestire il cambiamento dell'input della citta
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setSelectedCityCoords(null);
  };

  // funzione per cercare la citta in base all'input attuale
  const searchCity = useCallback(async () => {
    if (selectedCityCoords) return; // se sono gia state selezionate delle coordinate, non eseguire la ricerca
    try {
      setIsLoading(true);
      const data = await cityAutoCompleteApi(city);

      setSuggestions(data);
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  }, [city, selectedCityCoords]);

  // funzione per gestire la selezione di una citta dai suggerimenti
  const handleSelectedCity = (
    selectedCity: string,
    coords: { lat: number; lon: number }
  ) => {
    setCity(selectedCity);
    setSuggestions([]);
    setSelectedCityCoords(coords);
    inputRef.current?.focus();
  };

  // funzione per gestire il submit del form
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

  // effetto per eseguire la ricerca della citta dopo un ritardo
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
    isLoading,
    handleSubmit,
    handleSelectedCity,
    handleInputChange,
  };
};

export default useSearchCity;
