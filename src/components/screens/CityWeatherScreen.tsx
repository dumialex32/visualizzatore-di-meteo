import { useLocation, useParams } from "react-router-dom";
import Loader from "../Loader";
import WeatherTable from "../WeatherTable";
import useWeather from "../../hooks/useWeather";
import AlertType from "../AlertType";

const CityWeatherScreen: React.FC = () => {
  const location = useLocation();
  const { city } = useParams();
  const [lat, lon] = location.state;

  const { weatherData, isLoading, error } = useWeather(lat, lon);

  console.log(weatherData);

  if (isLoading && !error) return <Loader />;
  if (error && !isLoading) return <AlertType type="error" message={error} />;
  if (!weatherData) return <AlertType type="error" message="Data not found" />;

  return (
    <div>
      <h2 className="text-2xl p-2 mb-5 uppercase">
        Meteo {city} - Previsioni per 7 giorni
      </h2>

      <WeatherTable weatherData={weatherData} />
    </div>
  );
};

export default CityWeatherScreen;
