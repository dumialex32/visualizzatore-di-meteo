import { useLocation, useParams } from "react-router-dom";
import Loader from "../Loader";
import WeatherTable from "../WeatherTable";
import useWeather from "../../hooks/useWeather";
import AlertType from "../AlertType";

const CityWeatherScreen: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const lat = params.lat || "";
  const lon = params.lon || "";

  const cityName = location.state;

  const { weatherData, isLoading, error } = useWeather(lat, lon);

  console.log(weatherData);

  return (
    <div>
      {isLoading && !error && <Loader />}
      {error && !isLoading && <AlertType type="error" message="Error" />}

      <h2 className="text-2xl p-2 mb-5 uppercase">
        Meteo {cityName} - Previsioni per 7 giorni
      </h2>

      <WeatherTable weatherData={weatherData} />
    </div>
  );
};

export default CityWeatherScreen;
