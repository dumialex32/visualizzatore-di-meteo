import useFavoriteCities from "../../hooks/useFavoriteCities";
import AlertType from "../AlertType";
import FavoriteCityCard from "../FavoriteCityCard";
import SortButtons from "../SortButtons";
import useSort from "../../hooks/useSort";

const FavoriteCittiesScreen: React.FC = () => {
  const { favoriteCities, removeCity, removeAllCities } = useFavoriteCities();

  // prendiamo la data di oggi in formato iso8601 per mapare la la temp min e temp max di oggi
  const today = new Date().toISOString().split("T")[0];

  // crea un oggetto con 2 nuove propieta max temp e min temp
  const dailyTemps = favoriteCities.map((fc) => {
    const cardTimeIndex = fc.daily.time.indexOf(today);

    const maxDailyTemp = fc.daily.temperature_2m_max[cardTimeIndex];
    const minDailyTemp = fc.daily.temperature_2m_min[cardTimeIndex];

    return { ...fc, maxDailyTemp, minDailyTemp };
  });

  const {
    sortDirection,
    sortedData: sortedFavoriteCities,
    handleSortDirectionAsc,
    handleSortDirectionDesc,
  } = useSort(dailyTemps, "maxDailyTemp");

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
                onRemoveCity={removeCity}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FavoriteCittiesScreen;
