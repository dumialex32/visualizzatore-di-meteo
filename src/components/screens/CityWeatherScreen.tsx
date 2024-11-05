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
import {
  FavoriteCity,
  FavoriteCityToRemove,
} from "../../types/favoriteCityTypes";

const CityWeatherScreen: React.FC = () => {
  // recupera le coordinate dalla proprieta "state" della posizione e il nome della citta dai parametri URL
  const location = useLocation();
  const { city } = useParams<{ city: string }>();
  const { lat, lon } = location.state;

  // recupera i dati meteo utilizzando le coordinate estratte
  const { weatherData, isLoading, error } = useWeather(lat, lon);

  const { favoriteCities, addCity, favoriteCityToRemove } = useFavoriteCities();

  // stato per controllare se la citta corrente e gia aggiunta ai preferiti o no
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  console.log(weatherData);

  // controlla se la citta corrente e nei preferiti ogni volta che citta o preferiti cambiano
  useEffect(() => {
    setIsFavorite(favoriteCities.some((i: FavoriteCity) => i.city === city));
  }, [city, favoriteCities]);

  // aggiungere la citta ai preferiti
  const handleAddToFavorite = () => {
    if (!city || !lat || !lon || !weatherData) return;

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
    console.log(favoriteCity);
    addCity(favoriteCity);
    createToast({ type: "success", message: "Città aggiunta ai preferiti" });
  };

  // rimuovere la citta dai preferiti
  const handleRemoveFromFavorite = () => {
    if (!city || !lat || !lon) return;

    const cityToRemove: FavoriteCityToRemove = city;
    console.log(cityToRemove);
    favoriteCityToRemove(cityToRemove);
    createToast({ type: "success", message: "Città rimossa dai preferiti!" });
  };

  // rendering condizionale basato sul stato di caricamento, errore e o dati meteo mancanti
  if (isLoading && !error) return <Loader />;
  if (error && !isLoading) return <AlertType type="error" message={error} />;
  if (!weatherData) return <AlertType type="error" message="Data not found" />;

  return (
    <div>
      <div className="relative flex items-center justify-between gap-1 mb-6 p-2">
        <h2 className="text-2xl uppercase font-semibold">
          Meteo {city} - Previsioni per 7 giorni
        </h2>
        {/* rendering condizionale dell'icona se la citta e nei preferiti */}
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
