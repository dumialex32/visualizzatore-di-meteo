import { useCallback, useEffect, useState } from "react";
import { getLocationByCoords } from "../api/reverseGeocodeApi";

const useReverseGeocode = (
  lat: number | undefined,
  lon: number | undefined
) => {
  console.log(lat, lon);
  const [city, setCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  console.log(city);

  // funzione per ottenere il nome della citta basato sulle coordinate
  const getCityName = useCallback(async () => {
    try {
      if (!lat || !lon)
        throw new Error(
          "Coordinate non fornite. Assicurati di abilitare la geolocalizzazione."
        );

      setIsLoading(true);
      const data = await getLocationByCoords(lat, lon);
      console.log(data);
      setCity(data.address.city ? data.address.city : data.address.town);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Si è verificato un errore.");
    } finally {
      setIsLoading(false);
    }
  }, [lat, lon]);

  // effetto che chiama getCityName quando le coordinate cambiano
  useEffect(() => {
    if (lat && lon) {
      getCityName();
    }
  }, [getCityName, lat, lon]);

  return { city, isLoading, error };
};

export default useReverseGeocode;
