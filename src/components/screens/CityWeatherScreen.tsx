import { useLocation, useParams } from "react-router-dom";
import Loader from "../Loader";
import WeatherTable from "../table/WeatherTable";
import useWeather from "../../hooks/useWeather";
import AlertType from "../AlertType";
import StarIcon from "@mui/icons-material/Star";
import { createToast } from "../../utils/toast";
import { useEffect, useState } from "react";
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
  console.log(weatherData);

  useEffect(() => {
    setIsFavorite(favoriteCities.some((i: FavoriteCity) => i.city === city));
  }, [city, favoriteCities]);

  // aggiungi citta ai preferiti
  const handleAddToFavorite = () => {
    if (!city || !lat || !lon) return;

    if (isFavorite) {
      createToast({
        type: "warn",
        message: "Città già presente nei preferiti!",
      });
      return;
    }
    const favoriteCity: FavoriteCity = {
      city,
      coords: { lat, lon },
      daily: weatherData?.daily,
      units: weatherData?.daily_units,
    };
    addCity(favoriteCity);
    createToast({ type: "success", message: "Città aggiunta ai preferiti" });
  };

  // rimuovi citta dai preferiti
  const handleRemoveFromFavorite = () => {
    if (!city || !lat || !lon) return;

    const cityToRemove: FavoriteCity = { city, coords: { lat, lon } };
    removeCity(cityToRemove);
    createToast({ type: "success", message: "Città rimossa dai preferiti!" });
  };

  if (isLoading && !error) return <Loader />;
  if (error && !isLoading) return <AlertType type="error" message={error} />;
  if (!weatherData) return <AlertType type="error" message="Data not found" />;

  return (
    <div>
      <div className="relative flex items-center justify-between gap-1 mb-6 p-2">
        <h2 className="text-2xl uppercase font-semibold">
          Meteo {city} - Previsioni per 7 giorni
        </h2>
        {isFavorite && (
          <div className="absolute -left-5">
            <StarIcon sx={{ color: "#F97316" }} />
          </div>
        )}
        <FavoriteButton
          isFavorite={isFavorite}
          onAddFavorite={handleAddToFavorite}
          onRemoveFavorite={handleRemoveFromFavorite}
        />
      </div>

      {/* tabella per visualizzare i dati meteo */}
      <WeatherTable weatherData={weatherData} />
    </div>
  );
};

export default CityWeatherScreen;
