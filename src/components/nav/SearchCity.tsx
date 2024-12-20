import SearchIcon from "@mui/icons-material/Search";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import useSearchCity from "../../hooks/useSearchCity";
import AlertType from "../AlertType";

const SearchCity: React.FC = () => {
  const {
    city,
    suggestions,
    inputRef,
    error,
    handleSelectedCity,
    handleSubmit,
    handleInputChange,
  } = useSearchCity();

  return (
    <form
      className="grid grid-cols-[3rem_1fr_3rem] px-4 py-2 max-w-96 rounded-md items-center border"
      onSubmit={handleSubmit}
    >
      <div className="text-main-color border-r">
        <ThermostatIcon />
      </div>
      <div className="relative">
        <input
          className="px-2 py-1 focus:outline-none bg-inherit"
          type="text"
          placeholder="Aggiungi luogo"
          value={city}
          ref={inputRef}
          onChange={handleInputChange}
        />
        {/* se ci sono suggerimenti, e nessun errore, visualizza un menu a discesa con i suggerimenti */}
        {suggestions && suggestions.length > 0 && (
          <div className="absolute left-0 top-full mt-1 w-full bg-white border shadow-md z-10">
            {error ? (
              <AlertType
                type="error"
                message={error || "Recupero suggerimenti fallito"}
              />
            ) : (
              suggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    handleSelectedCity(s.name, {
                      lat: Number(s.lat),
                      lon: Number(s.lon),
                    })
                  }
                >
                  {s.display_name}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <button className="border-l" type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchCity;
