interface DayNightDescription {
  description: string;
  image: string;
}

interface WeatherDescriptionEntry {
  day: DayNightDescription;
  night: DayNightDescription;
}

export type WeatherCodeInterpretation = Record<number, WeatherDescriptionEntry>;
