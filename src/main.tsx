import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import FavCittiesWeatherScreen from "./components/screens/FavCittiesWeatherScreen.tsx";
import CityWeatherScreen from "./components/screens/CityWeatherScreen.tsx";
import HomeScreen from "./components/screens/HomeScreen.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomeScreen />} />
      <Route path="/meteo/:lat/:lon" element={<CityWeatherScreen />} />
      <Route path="/fav-cities" element={<FavCittiesWeatherScreen />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
