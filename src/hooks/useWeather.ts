import { useCallback, useEffect, useState } from "react";
import { getCityWeatherApi } from "../api/cityWeatherApi";
import { WeatherData } from "../types/weatherDataTypes";

const useWeather = (lat: string, lon: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getWeather = useCallback(async () => {
    if (!lat || !lon) throw new Error("Coords not provided");

    try {
      setIsLoading(true);
      const data = await getCityWeatherApi(lat, lon);
      setWeatherData(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [lat, lon]);
  useEffect(() => {
    getWeather();
  }, [getWeather]);

  return { weatherData, error, isLoading };
};

export default useWeather;
