import { useCallback, useEffect, useState } from "react";
import { getLocationByCoords } from "../api/reverseGeocodeApi";

const useReverseGeocode = (
  lat: number | undefined,
  lon: number | undefined
) => {
  const [city, setCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // funzione per ottenere il nome della citta basato sulle coordinate
  const getCityName = useCallback(async () => {
    try {
      if (lat && lon) {
        setIsLoading(true);
        const data = await getLocationByCoords(lat, lon);
        setCity(data.address.city);
      }
    } catch (err: any) {
      console.error(err);
      setError(err as string);
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
