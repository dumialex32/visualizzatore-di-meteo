import { DailyData, DailyUnits } from "./weatherDataTypes";

export interface FavoriteCity {
  city: string;
  coords: { lat: string; lon: string };
  daily: DailyData;
  units: DailyUnits;
}

export type FavoriteCityToRemove = string;

export interface FavoriteDailyData {
  maxDailyTemp: number;
  minDailyTemp: number;
  city: string;
  coords: {
    lat: string;
    lon: string;
  };
  daily: DailyData;
  units: DailyUnits;
}
