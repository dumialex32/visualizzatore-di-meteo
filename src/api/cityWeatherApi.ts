import { fetchAxiosData } from "../utils/fetchAxiosData";

export const getCityWeatherApi = async (lat: number, lon: number) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

  return fetchAxiosData(url);
};
