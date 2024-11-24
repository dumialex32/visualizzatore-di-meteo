import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lon: number;
  }>();
  const [error, setError] = useState<string>("");
  console.log(currentPosition);
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  }, []);

  function handleSuccess(pos: GeolocationPosition) {
    const crd = pos.coords;

    setCurrentPosition({ lat: crd.latitude, lon: crd.longitude });
  }

  function handleError(err: any) {
    console.error(err);
    setError(`ERROR(${err.code}): ${err.message}`);
  }

  return { currentPosition, error };
};
export default useGeolocation;
