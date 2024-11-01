import { useState } from "react";
import { WeatherData } from "../types/weatherDataTypes";
import DailyTab from "./DailyTab";
import HourlyWeatherDataRow from "./HourlyWeatherDataRow";
import { WeatherCodeInterpretation } from "../types/weatherDataTypes";
import weatherCodeInterpretationData from "../data/weatherCodeInterpretation.json";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { ROWS_PER_PAGE } from "../variables";

const timeMap: Record<number, "day" | "night"> = {
  0: "night",
  1: "day",
};

const columns = [
  "Ora",
  "Temperatura",
  "Umidita",
  "Velocita del vento",
  "Condizioni meteo",
];

const weatherCodeInterpretation: WeatherCodeInterpretation =
  weatherCodeInterpretationData;

const WeatherTable: React.FC<{ weatherData: WeatherData }> = ({
  weatherData,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = ROWS_PER_PAGE;

  const units = {
    humidityUnit: weatherData?.hourly_units.relative_humidity_2m,
    tempUnit: weatherData?.hourly_units.temperature_2m,
    windUnit: weatherData?.hourly_units.wind_speed_10m,
  };

  const handleActiveTab = (i: number) => {
    setActiveTab(i);
  };

  const getWeatherCodeInterpretation = (code: number, time: number) => {
    const dayTime = timeMap[time];

    return weatherCodeInterpretation[code][dayTime];
  };

  // manipolare la meteo data
  const getTabHourlyData = () => {
    const currentTabDate = weatherData?.daily.time[activeTab];
    if (!currentTabDate) return [];

    return weatherData?.hourly.time
      .map((time, i) => {
        const description = getWeatherCodeInterpretation(
          weatherData.hourly.weather_code[i],
          weatherData.hourly.is_day[i]
        );

        return {
          time: time,
          temperature: weatherData.hourly.temperature_2m[i],
          description,
          humidity: weatherData.hourly.relative_humidity_2m[i],
          windSpeed: weatherData.hourly.wind_speed_10m[i],
          units,
        };
      })
      .filter((d) => d.time.startsWith(currentTabDate));
  };

  // paginazione
  const tabHourlyData = getTabHourlyData();

  const handleNextPage = () => {
    if (currentPage * rowsPerPage < tabHourlyData.length)
      setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const tabPaginatedHourlyData = tabHourlyData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      {/* le schede della tabella giornaliera */}
      <ul className="grid grid-cols-7 gap-2">
        {weatherData?.daily.time.map((date, i) => {
          return (
            <DailyTab
              key={i}
              date={date}
              isActive={activeTab === i}
              onClick={() => handleActiveTab(i)}
            />
          );
        })}
      </ul>

      <div className="flex flex-col p-4">
        {/* le collone della tabella */}
        <div className="grid grid-cols-5 shadow-md p-2">
          {columns.map((c) => (
            <div key={c} className="font-semibold">
              {c}
            </div>
          ))}
        </div>

        {/* corpo della tabella */}
        <div className="border rounded-md">
          {tabPaginatedHourlyData.map((d, i) => {
            return <HourlyWeatherDataRow key={i} tabHourlyData={d} />;
          })}
        </div>

        {/* pie di tabella*/}

        <div className="flex justify-center shadow-md p-2">
          <div className="flex gap-4">
            <button disabled={currentPage === 1} onClick={handlePreviousPage}>
              <KeyboardArrowLeft
                sx={{ color: `${currentPage === 1 && "#cbd5e1"}` }}
              />
            </button>
            <button
              disabled={currentPage === tabHourlyData.length}
              onClick={handleNextPage}
            >
              <KeyboardArrowRight
                sx={{
                  color: `${
                    currentPage * rowsPerPage > tabHourlyData.length - 1 &&
                    "#cbd5e1"
                  }`,
                }}
              />
            </button>

            <div>
              {currentPage} of {Math.ceil(tabHourlyData.length / rowsPerPage)}
            </div>
          </div>
        </div>

        <></>
      </div>
    </div>
  );
};

export default WeatherTable;
