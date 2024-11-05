import { useNavigate } from "react-router-dom";
import {
  FavoriteCityToRemove,
  FavoriteDailyData,
} from "../types/favoriteCityTypes";

interface FavoriteCityCardProps {
  favoriteCity: FavoriteDailyData;
  onRemoveCity: (favoriteCity: FavoriteCityToRemove) => void;
}

const FavoriteCityCard: React.FC<FavoriteCityCardProps> = ({
  favoriteCity,
  onRemoveCity,
}) => {
  const navigate = useNavigate();
  const {
    units: { temperature_2m_max, temperature_2m_min },
  } = favoriteCity;

  return (
    <div className="flex flex-col gap-4 shadow-md px-4 py-4">
      <h2 className="text-2xl text-main-color overflow-hidden whitespace-nowrap text-ellipsis">
        {favoriteCity.city}
      </h2>

      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-2 gap-2 ">
          <p>Max:</p>
          <p className="font-semibold">
            {favoriteCity.maxDailyTemp}
            {temperature_2m_max}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 ">
          <p>Min:</p>
          <p className="font-semibold">
            {favoriteCity.minDailyTemp}
            {temperature_2m_min}
          </p>
        </div>
      </div>

      <button
        className="btn"
        onClick={() =>
          navigate(`/meteo/${favoriteCity.city}`, {
            state: favoriteCity.coords,
          })
        }
      >
        Vizzualiza detagli
      </button>
      <button
        className="btn btn secondary"
        onClick={() => onRemoveCity(favoriteCity.city)}
      >
        Rimuovi dai favoriti
      </button>
    </div>
  );
};

export default FavoriteCityCard;
