import useFavoriteCities from "../../hooks/useFavoriteCities";
import AlertType from "../AlertType";
import FavoriteCityCard from "../FavoriteCityCard";

const FavoriteCittiesScreen: React.FC = () => {
  const { favoriteCities, removeCity, removeAllCities } = useFavoriteCities();

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

      <ul className="grid grid-cols-6 gap-2">
        {favoriteCities.map((fc, i) => {
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
  );
};

export default FavoriteCittiesScreen;
