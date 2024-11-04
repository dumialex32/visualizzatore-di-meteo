import { useNavigate } from "react-router-dom";
import { FavoriteCity } from "../types/favoriteCityTypes";

interface FavoriteCityCardProps {
  favoriteCity: FavoriteCity;
  onRemoveCity: (favoriteCity: FavoriteCity) => void;
}

const FavoriteCityCard: React.FC<FavoriteCityCardProps> = ({
  favoriteCity,
  onRemoveCity,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 shadow-md px-2 py-4">
      <h1 className="text-2xl text-main-color font-semibold ">
        {favoriteCity.city}
      </h1>
      <button
        className="btn"
        onClick={() =>
          navigate(`/meteo/${favoriteCity.city}`, {
            state: favoriteCity.coords,
          })
        }
      >
        Vizzualiza dati meteo
      </button>
      <button
        className="btn btn secondary"
        onClick={() => onRemoveCity(favoriteCity)}
      >
        Rimuovi dai favoriti
      </button>
    </div>
  );
};

export default FavoriteCityCard;
