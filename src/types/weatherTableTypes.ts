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
