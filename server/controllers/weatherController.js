
import {
  getCoordinates,
  getCurrentWeather,
  getWeatherForecast
} from "../services/weatherService.js";

import {
  getCachedWeather,
  setCachedWeather,
  getStaleWeather
} from "../utils/weatherCache.js";

// Current weather
export const fetchCurrentWeather = async (req, res, next) => {
  try {
    const { city } = req.query;
    const cacheKey = `current_${city.toLowerCase()}`;

    // Check cache
    const cachedData = getCachedWeather(cacheKey);

    if (cachedData) {
      return res.status(200).json({
        ...cachedData,
        cached: true
      });
    }

    const location = await getCoordinates(city);

    const weather = await getCurrentWeather(
      location.lat,
      location.lon
    );

    const responseData = {
      success: true,
      message: "Current weather fetched successfully",
      location,
      data: weather
    };

    // Cache for 10 minutes
    setCachedWeather(cacheKey, responseData, 600);

    res.status(200).json({
      ...responseData,
      cached: false
    });

  } catch (error) {
        const staleData = getStaleWeather(cacheKey);

        if (staleData) {
            return res.status(200).json({
                ...staleData,
                cached: true,
                stale: true,
                warning: "Showing previously saved weather data."
            });
        }
        next(error);
  }
};

// Five-day forecast
export const fetchWeatherForecast = async (req, res, next) => {
  try {
    const { city } = req.query;
    const cacheKey = `forecast_${city.toLowerCase()}`;

    // Check cache
    const cachedData = getCachedWeather(cacheKey);

    if (cachedData) {
      return res.status(200).json({
        ...cachedData,
        cached: true
      });
    }

    const location = await getCoordinates(city);

    const forecast = await getWeatherForecast(
      location.lat,
      location.lon
    );

    const responseData = {
      success: true,
      message: "Weather forecast fetched successfully",
      location,
      data: forecast
    };

    // Cache for 30 minutes
    setCachedWeather(cacheKey, responseData, 1800);

    res.status(200).json({
      ...responseData,
      cached: false
    });

  } catch (error) {
        const staleData = getStaleWeather(cacheKey);

        if (staleData) {
            return res.status(200).json({
                ...staleData,
                cached: true,
                stale: true,
                warning: "Showing previously saved weather data."
            });
        }
        next(error);
  }
};
