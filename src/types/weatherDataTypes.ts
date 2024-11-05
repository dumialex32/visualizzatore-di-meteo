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

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
}

export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface TabHourlyData {
  time: string;
  temperature: number;
  description: DayNightDescription;
  humidity: number;
  windSpeed: number;
  units: {
    humidityUnit: string;
    tempUnit: string;
    windUnit: string;
  };
}

// weatherCodeInterpretation
export interface DayNightDescription {
  description: string;
  image: string;
}

interface WeatherDescriptionEntry {
  day: DayNightDescription;
  night: DayNightDescription;
}

export type WeatherCodeInterpretation = Record<number, WeatherDescriptionEntry>;
