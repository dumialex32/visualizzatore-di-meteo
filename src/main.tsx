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
import CityWeatherScreen from "./components/screens/CityWeatherScreen.tsx";
import HomeScreen from "./components/screens/HomeScreen.tsx";
import FavoriteCittiesScreen from "./components/screens/FavoriteCittiesScreen.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomeScreen />} />
      <Route path="/meteo/:city" element={<CityWeatherScreen />} />
      <Route path="/fav-cities" element={<FavoriteCittiesScreen />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
