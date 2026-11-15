
import express from "express";

import {
  fetchCurrentWeather,
  fetchWeatherForecast
} from "../controllers/weatherController.js";

import { validateCity } from "../middleware/validateCity.js";

const router = express.Router();

// Current weather
router.get("/current", validateCity, fetchCurrentWeather);

// Five-day forecast
router.get("/forecast", validateCity, fetchWeatherForecast);

export default router;
