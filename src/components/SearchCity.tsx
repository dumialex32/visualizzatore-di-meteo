import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ThermostatIcon from "@mui/icons-material/Thermostat";

const SearchCity: React.FC = () => {
  const [city, setCity] = useState<string>("");
  console.log(city);

  const searchCity = async () => {
    try {
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-[3rem_1fr_3rem] px-4 py-2 max-w-96 rounded-md items-center border ">
      <div className="text-main-color border-r">
        <ThermostatIcon />
      </div>
      <input
        className="px-2 py-1 focus:outline-none bg-inherit"
        type="text"
        placeholder="Aggiungi luogo"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="border-l" type="submit">
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchCity;
