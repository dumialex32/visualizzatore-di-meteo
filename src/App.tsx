import { Outlet } from "react-router-dom";
import MainNav from "./components/MainNav";
import { useState } from "react";
import { WeatherData } from "./types/weatherDataTypes";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  return (
    <div className="container mx-auto shadow-md h-screen my-8">
      <MainNav onSetWeatherData={setWeatherData} />

      <main className="p-8">
        <Outlet context={{ weatherData }} />
      </main>
    </div>
  );
}

export default App;
