import { useState } from "react";
import { TabHourlyData, WeatherData } from "../../types/weatherDataTypes";
import DailyTab from "./DailyTab";
import HourlyWeatherDataRow from "./HourlyWeatherDataRow";
import { WeatherCodeInterpretation } from "../../types/weatherDataTypes";
import weatherCodeInterpretationData from "../../data/weatherCodeInterpretation.json";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { ROWS_PER_PAGE } from "../../variables";
import WeatherGraph from "./WeatherGraph";
import dayjs from "dayjs";

import SortButtons from "../SortButtons";
import useSort from "../../hooks/useSort";

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
  // const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");

  const units = {
    humidityUnit: weatherData?.hourly_units.relative_humidity_2m,
    tempUnit: weatherData?.hourly_units.temperature_2m,
    windUnit: weatherData?.hourly_units.wind_speed_10m,
  };

  const handleActiveTab = (i: number) => {
    setActiveTab(i);
    setCurrentPage(1);
  };

  // funzione per ottenere la descrizione per ogni codice meteo WMO
  const getWeatherCodeInterpretation = (code: number, time: number) => {
    const dayTime = timeMap[time];

    return weatherCodeInterpretation[code][dayTime];
  };

  // funzione per creare l'oggetto contente i dati meteo giornaglieri per 24h
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

  const tabHourlyData: TabHourlyData[] = getTabHourlyData();

  // ordinamento
  const {
    sortDirection,
    sortedData: sortedTabHourlyData,
    handleSortDirectionAsc,
    handleSortDirectionDesc,
  } = useSort(tabHourlyData, "temperature");

  // crea l'oggeto contenente i dati meteo per 24 ore necessario al grafico
  const graphData = tabHourlyData.map((data) => ({
    ...data,
    time: dayjs(data.time).format("HH:mm"),
    day: data.time,
  }));

  // paginazione
  const handleNextPage = () => {
    if (currentPage * rowsPerPage < sortedTabHourlyData.length)
      setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const tabPaginatedHourlyData = sortedTabHourlyData.slice(
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
          {columns.map((c) => {
            return (
              <div key={c} className="font-semibold flex">
                {c}
                {c === "Temperatura" && (
                  <SortButtons
                    sortDirection={sortDirection}
                    onHandleSortAsc={handleSortDirectionAsc}
                    onHandleSortDesc={handleSortDirectionDesc}
                  />
                )}
              </div>
            );
          })}
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
      </div>

      {/* grafico per visualizzare i dati meteo delle prossime 24 ore per ogni giorno dei prossimi 7 giorni */}
      <WeatherGraph graphData={graphData} />
    </div>
  );
};

export default WeatherTable;
