import useFavoriteCities from "../../hooks/useFavoriteCities";
import AlertType from "../AlertType";
import FavoriteCityCard from "../FavoriteCityCard";
import SortButtons from "../SortButtons";
import useSort from "../../hooks/useSort";
import { FavoriteDailyData } from "../../types/favoriteCityTypes";

const FavoriteCittiesScreen: React.FC = () => {
  const { favoriteCities, favoriteCityToRemove, removeAllCities } =
    useFavoriteCities();

  // ottieni la data di oggi in formato ISO 8601 per mappare la temperatura minima e massima di oggi
  const today = new Date().toISOString().split("T")[0];

  // crea un array di oggetti che include maxTemp e minTemp di oggi per ogni citta preferita
  const favoriteDailyData: FavoriteDailyData[] = favoriteCities.map((fc) => {
    const cardTimeIndex = fc.daily.time.indexOf(today);

    const maxDailyTemp = fc.daily.temperature_2m_max[cardTimeIndex];
    const minDailyTemp = fc.daily.temperature_2m_min[cardTimeIndex];

    return { ...fc, maxDailyTemp, minDailyTemp };
  });

  // ordina le citta preferite in base alla temperatura massima di oggi
  const {
    sortDirection,
    sortedData: sortedFavoriteCities,
    handleSortDirectionAsc,
    handleSortDirectionDesc,
  } = useSort(favoriteDailyData, "maxDailyTemp");

  if (!favoriteCities || favoriteCities.length === 0)
    return (
      <AlertType
        type="info"
        message="Nessuna citta aggiunta ancora ai favoriti."
      />
    );

  return (
    <div>
      <div className="relative flex items-center justify-between gap-1 mb-6 p-2">
        <h2 className="text-2xl uppercase font-semibold">Città favorite</h2>

        <button className="btn secondary" onClick={removeAllCities}>
          Rimuovi tutte le citta
        </button>
      </div>

      <div className="flex flex-col gap-4 items-start">
        <SortButtons
          label="Temperatura"
          sortDirection={sortDirection}
          onHandleSortAsc={handleSortDirectionAsc}
          onHandleSortDesc={handleSortDirectionDesc}
        />

        <ul className="grid grid-cols-6 gap-2">
          {sortedFavoriteCities.map((fc, i) => {
            return (
              <FavoriteCityCard
                key={i}
                favoriteCity={fc}
                onRemoveCity={favoriteCityToRemove}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FavoriteCittiesScreen;
