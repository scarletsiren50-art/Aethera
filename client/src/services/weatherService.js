
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Fetch current weather
export const getCurrentWeather = async (city) => {
  const response = await API.get("/weather/current", {
    params: { city }
  });

  return response.data;
};

// Fetch five-day forecast
export const getWeatherForecast = async (city) => {
  const response = await API.get("/weather/forecast", {
    params: { city }
  });

  return response.data;
};

export default API;
