import { useOutletContext } from "react-router-dom";
import { WeatherContext } from "../../types/weatherDataTypes";

const CityWeatherScreen: React.FC = () => {
  const { weatherData } = useOutletContext<WeatherContext>();
  console.log(weatherData);
  return <div>city screen</div>;
};

export default CityWeatherScreen;
