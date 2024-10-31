import { formatDegrees, formatTime } from "../utils/formatters";

interface HourlyWeatherData {
  time: string;
  temperature: number;
  description: { description: string; image: string };
  humidity: number;
  windSpeed: number;
}

const HourlyWeatherDataRow: React.FC<{
  hourlyWeatherData: HourlyWeatherData;
}> = ({ hourlyWeatherData }) => {
  const { time, temperature, description, humidity, windSpeed, units } =
    hourlyWeatherData;

  return (
    <ul className="grid grid-cols-5 p-2 border-b-2 items-center">
      <li>{formatTime(time)}</li>
      <div>{`${temperature}${units.tempUnit}`}</div>
      <div>{`${humidity}${units.humidityUnit}`}</div>
      <div>{`${windSpeed}${units.windUnit}`}</div>
      <div className="grid grid-cols-[2fr,1fr] items-center">
        <p>{description.description}</p>
        <img src={description.image} className="h-12" />
      </div>
    </ul>
  );
};

export default HourlyWeatherDataRow;
