import { useNavigate } from "react-router-dom";
import hpLogo from "../../assets/hp-logo.png";
import useGeolocation from "../../hooks/useGeolocation";

import useReverseGeocode from "../../hooks/useReverseGeocode";

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentPosition, error: currentPositionError } = useGeolocation();
  const lat = currentPosition?.lat;
  const lon = currentPosition?.lon;

  const { city, error: reverseGeocodeError } = useReverseGeocode(lat, lon);

  console.log(city);

  const handleCurrentLocationWeather = () => {
    navigate(`/meteo/${city}`, { state: { lat, lon } });
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="grid grid-cols-2 gap-14 max-h-96 shadow-md p-8">
        <div className="flex flex-col gap-6 max-w-96">
          <h1 className="text-4xl font-bold">
            Benvenuto nell'app <span className="text-main-color">VizMeteo</span>
            !
          </h1>
          <p className="text-md">
            Cerca facilmente le previsioni meteo per le città che preferisci,
            salva le tue località preferite e ottieni aggiornamenti in tempo
            reale su temperatura, umidità, velocità del vento e condizioni
            atmosferiche, per le prossime 24 ore.
          </p>

          {!currentPositionError && !reverseGeocodeError && (
            <div className="flex flex-col gap-1">
              <p className="text-center">
                Per cercare le previsioni meteo della tua cita
              </p>
              <button
                className="btn text-center"
                onClick={handleCurrentLocationWeather}
              >
                Premi qui
              </button>
            </div>
          )}
        </div>

        <div className="justify-self-start">
          <img src={hpLogo} />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
