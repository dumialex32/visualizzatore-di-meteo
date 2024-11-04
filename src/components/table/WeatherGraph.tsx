import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import dayjs from "dayjs";

interface GraphData {
  time: string;
  temperature: number;
}

interface WeatherGraphProps {
  graphData: GraphData[];
}

// pannello personalizzato per il grafico
const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    // console.log(payload);
    const formattedDate = dayjs(payload[0].payload.day).format("DD MMM");
    const temperature = payload[0].value;

    return (
      <div className="p-2 bg-white rounded-md">
        <p className="text-center">{formattedDate}</p>
        <p style={{ margin: 0 }}>
          <span className="font-semibold">Temperatura: {temperature}°C</span>
        </p>
      </div>
    );
  }

  return null;
};

const WeatherGraph: React.FC<WeatherGraphProps> = ({ graphData }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={graphData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis dataKey="time" />
        <YAxis />
        <Area dataKey="temperature" stroke="#fb923c" fill="#fed7aa" />
        <Tooltip content={<CustomTooltip />} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default WeatherGraph;
