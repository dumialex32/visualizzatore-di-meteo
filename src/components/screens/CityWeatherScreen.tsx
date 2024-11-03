import { useLocation, useParams } from "react-router-dom";
import Loader from "../Loader";
import WeatherTable from "../WeatherTable";
import useWeather from "../../hooks/useWeather";
import AlertType from "../AlertType";
import StarIcon from "@mui/icons-material/Star";
import { createToast } from "../../utils/toast";
import { useEffect, useState, useCallback } from "react";
import useFavoriteCities from "../../hooks/useFavoriteCities";
import FavoriteButton from "../FavoriteButton";
import { FavoriteCity } from "../../types/favoriteCityTypes";

const CityWeatherScreen: React.FC = () => {
  const location = useLocation();
  const { city } = useParams<{ city: string }>();
  const { lat, lon } = location.state;
  const { weatherData, isLoading, error } = useWeather(lat, lon);
  const { favoriteCities, addCity, removeCity } = useFavoriteCities();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(favoriteCities.some((i: FavoriteCity) => i.city === city));
  }, [city, favoriteCities]);

  const addToFavorite = useCallback(() => {
    if (!city || !lat || !lon) return;

    if (isFavorite) {
      createToast({
        type: "warn",
        message: "Città già presente nei preferiti!",
      });
      return;
    }
    const favoriteCity: FavoriteCity = { city, coords: { lat, lon } };
    addCity(favoriteCity);
    createToast({ type: "success", message: "Città aggiunta ai preferiti" });
  }, [isFavorite, city, lat, lon, addCity]);

  const removeFavorite = useCallback(() => {
    if (!city || !lat || !lon) return;

    const cityToRemove: FavoriteCity = { city, coords: { lat, lon } };
    removeCity(cityToRemove);
    createToast({ type: "success", message: "Città rimossa dai preferiti!" });
  }, [city, lat, lon, removeCity]);

  if (isLoading && !error) return <Loader />;
  if (error && !isLoading) return <AlertType type="error" message={error} />;
  if (!weatherData) return <AlertType type="error" message="Data not found" />;

  return (
    <div>
      <div className="relative flex items-center justify-between gap-1 mb-6 p-2">
        <h2 className="text-2xl uppercase">
          Meteo {city} - Previsioni per 7 giorni
        </h2>
        {isFavorite && (
          <div className="absolute -left-5">
            <StarIcon sx={{ color: "#F97316" }} />
          </div>
        )}
        <FavoriteButton
          isFavorite={isFavorite}
          onAdd={addToFavorite}
          onRemove={removeFavorite}
        />
      </div>

      <WeatherTable weatherData={weatherData} />
    </div>
  );
};

export default CityWeatherScreen;
