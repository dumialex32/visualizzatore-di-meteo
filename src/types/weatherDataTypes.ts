export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: HourlyData;
  daily_units: DailyUnits;
  daily: DailyData;
}

interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  weather_code: string;
  wind_speed_10m: string;
  is_day: string;
}

interface HourlyData {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  is_day: number[];
}

interface DailyUnits {
  time: string;
}

interface DailyData {
  time: string[];
}
