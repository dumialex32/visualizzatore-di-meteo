import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCityWeatherApi } from "../../api/cityWeatherApi";
import { WeatherData } from "../../types/weatherDataTypes";

const CityWeatherScreen: React.FC = () => {
  const params = useParams();
  const { lat, lon } = params;
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  console.log(weatherData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return <div>city screen</div>;
};

export default CityWeatherScreen;
