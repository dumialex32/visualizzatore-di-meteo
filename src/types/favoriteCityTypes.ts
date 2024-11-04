interface Daily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

interface Units {
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
}

export interface FavoriteCity {
  city: string;
  coords: { lat: string; lon: string };
  daily: Daily;
  units: Units;
  maxDailyTemp: number;
  minDailyTemp: number;
}
