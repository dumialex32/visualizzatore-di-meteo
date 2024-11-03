import useFavoriteCities from "../../hooks/useFavoriteCities";
import AlertType from "../AlertType";
import FavoriteCityCard from "../FavoriteCityCard";

const FavoriteCittiesScreen: React.FC = () => {
  const { favoriteCities, removeCity } = useFavoriteCities();
  console.log(favoriteCities);

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
        <h2 className="text-2xl uppercase">Città favorite</h2>
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
