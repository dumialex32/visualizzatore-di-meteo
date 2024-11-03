import { useCallback, useEffect, useState } from "react";
import { getLocationByCoords } from "../api/reverseGeocodeApi";

const useReverseGeocode = (lat: number, lon: number) => {
  const [city, setCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getCityName = useCallback(async () => {
    if (lat && lon) {
      try {
        setIsLoading(true);
        const data = await getLocationByCoords(lat, lon);
        setCity(data.address.city);
      } catch (err: any) {
        console.error(err);
        setError(err as string);
      } finally {
        setIsLoading(false);
      }
    }
  }, [lat, lon]);

  useEffect(() => {
    getCityName();
  }, [getCityName]);

  return { city, isLoading, error };
};

export default useReverseGeocode;
