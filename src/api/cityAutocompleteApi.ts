import axios, { isAxiosError } from "axios";

export const cityAutoCompleteApi = async (city: string) => {
  if (!city.trim()) return;

  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        city
      )}&format=json&addressdetails=1&limit=5`
    );
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response) {
        throw `${err.response.status} - ${
          err.response.data.message || "Something went wrong"
        }`;
      } else if (err.request) {
        throw "Network error: no response from server";
      } else {
        throw err.message;
      }
    } else {
      throw `Error: ${
        err instanceof Error ? err.message : "An unknown error occurred"
      }`;
    }
  }
};
