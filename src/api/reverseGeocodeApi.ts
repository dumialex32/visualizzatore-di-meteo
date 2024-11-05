import { fetchAxiosData } from "../utils/fetchAxiosData";

export const getLocationByCoords = async (lat: number, lon: number) => {
  if (!lat || !lon) throw new Error("Coordinate non fornite");
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  return fetchAxiosData(url);
};
