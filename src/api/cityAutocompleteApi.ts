import { fetchAxiosData } from "../utils/fetchAxiosData";

export const cityAutoCompleteApi = async (city: string) => {
  if (!city.trim()) return;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    city
  )}&format=json&addressdetails=1&limit=5`;
  return fetchAxiosData(url);
};
