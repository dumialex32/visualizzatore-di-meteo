import { formatTime } from "../utils/formatters";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AirIcon from "@mui/icons-material/Air";
import { TabHourlyData } from "../types/weatherDataTypes";

const tableHourlyDataRow: React.FC<{
  tabHourlyData: TabHourlyData;
}> = ({ tabHourlyData }) => {
  const { time, temperature, description, humidity, windSpeed, units } =
    tabHourlyData;

  return (
    <ul className="grid grid-cols-5 p-2 border-b-2 items-center">
      <li>
        <div className="grid grid-cols-[1fr_8fr] gap-1 items-center">
          <AccessTimeIcon sx={{ color: "#F97316" }} />
          <p>{formatTime(time)}</p>
        </div>
      </li>
      <li>
        <div>{`${temperature}${units.tempUnit}`}</div>
      </li>
      <li>
        <div>{`${humidity}${units.humidityUnit}`}</div>
      </li>
      <li>
        <div className="grid grid-cols-[2rem_1fr] gap-1">
          <AirIcon sx={{ color: "#d1d5db" }} />
          <p>{`${windSpeed}${units.windUnit}`}</p>
        </div>
      </li>
      <li>
        <div className="grid grid-cols-[3rem_5fr] gap-1 items-center">
          <img src={description.image} className="h-12" />
          <p>{description.description}</p>
        </div>
      </li>
    </ul>
  );
};

export default tableHourlyDataRow;
