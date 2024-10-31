import { useParams } from "react-router-dom";
import Loader from "../Loader";
import WeatherTable from "../WeatherTable";
import useWeather from "../../hooks/useWeather";

const CityWeatherScreen: React.FC = () => {
  const params = useParams();
  const lat = params.lat || "";
  const lon = params.lon || "";

  const { weatherData, isLoading, error } = useWeather(lat, lon);

  console.log(weatherData);

  if (!weatherData) return <div>ERROR</div>; // TO DO

  return (
    <div>
      {/* to do nome cita dinamico */}
      <h2 className="text-3xl p-2 mb-5">Meteo citta_placeholder</h2>
      {isLoading && <Loader />}

      {/* to do error component*/}
      <WeatherTable weatherData={weatherData} />
    </div>
  );
};

export default CityWeatherScreen;
