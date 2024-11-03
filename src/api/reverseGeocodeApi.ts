import axios, { isAxiosError } from "axios";

export const getLocationByCoords = async (lat: number, lon: number) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
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
      throw err instanceof Error ? err.message : "An unknown error occurred";
    }
  }
};
