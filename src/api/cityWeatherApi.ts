import axios, { isAxiosError } from "axios";
import { WeatherData } from "../types/weatherDataTypes";

export const getCityWeatherApi = async (coords: [lat: string, lon: string]) => {
  const [lat, lon] = coords;
  try {
    const res = await axios.get<WeatherData>(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
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
