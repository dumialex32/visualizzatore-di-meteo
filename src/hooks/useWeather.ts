import { useCallback, useEffect, useState } from "react";
import { getCityWeatherApi } from "../api/cityWeatherApi";
import { WeatherData } from "../types/weatherDataTypes";

const useWeather = (lat: string, lon: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getWeather = useCallback(async () => {
    try {
      if (!lat || !lon) throw new Error("Coords not provided");

      setIsLoading(true);
      const data = await getCityWeatherApi(lat, lon);
      setWeatherData(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [lat, lon]);
  useEffect(() => {
    getWeather();
  }, [getWeather, lat, lon]);

  return { weatherData, error, isLoading };
};

export default useWeather;
