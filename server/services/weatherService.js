
import axios from "axios";
import { env } from "../config/env.js";

const BASE_URL = "https://api.openweathermap.org";

const weatherAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    appid: env.OPENWEATHER_API_KEY
  }
});

// Handle external API errors
const handleAPIError = (error) => {
  if (error.response?.status === 401) {
    const apiError = new Error(
      "Invalid or inactive OpenWeatherMap API key."
    );
    apiError.statusCode = 502;
    throw apiError;
  }

  if (error.response?.status === 429) {
    const apiError = new Error(
      "Weather API request limit exceeded."
    );
    apiError.statusCode = 503;
    throw apiError;
  }

  if (error.code === "ECONNABORTED") {
    const apiError = new Error(
      "Weather service request timed out."
    );
    apiError.statusCode = 504;
    throw apiError;
  }

  const apiError = new Error(
    "Unable to retrieve weather information."
  );

  apiError.statusCode = 502;
  throw apiError;
};

// Convert city name into geographic coordinates
export const getCoordinates = async (city) => {
  try {
    const response = await weatherAPI.get("/geo/1.0/direct", {
      params: {
        q: city,
        limit: 1
      }
    });

    if (!response.data.length) {
      const error = new Error(
        `Location "${city}" was not found.`
      );
      error.statusCode = 404;
      throw error;
    }

    const location = response.data[0];

    return {
      name: location.name,
      state: location.state || "",
      country: location.country,
      lat: location.lat,
      lon: location.lon
    };
  } catch (error) {
    if (error.statusCode) throw error;
    handleAPIError(error);
  }
};

// Fetch current weather
export const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await weatherAPI.get("/data/2.5/weather", {
      params: {
        lat,
        lon,
        units: "metric"
      }
    });

    return response.data;
  } catch (error) {
    handleAPIError(error);
  }
};

// Fetch five-day forecast
export const getWeatherForecast = async (lat, lon) => {
  try {
    const response = await weatherAPI.get("/data/2.5/forecast", {
      params: {
        lat,
        lon,
        units: "metric"
      }
    });

    return response.data;
  } catch (error) {
    handleAPIError(error);
  }
};
