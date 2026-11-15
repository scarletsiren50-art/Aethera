
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  CloudFog
} from "lucide-react";

const WeatherVisual = ({ weather }) => {
  if (!weather) return null;

  const conditionId = weather.id;
  const isNight = weather.icon?.endsWith("n");

  let VisualIcon = Cloud;
  let conditionClass = "weather-cloudy";

  // Thunderstorms: 200–232
  if (conditionId >= 200 && conditionId <= 232) {
    VisualIcon = CloudLightning;
    conditionClass = "weather-storm";
  }

  // Drizzle: 300–321
  else if (conditionId >= 300 && conditionId <= 321) {
    VisualIcon = CloudDrizzle;
    conditionClass = "weather-drizzle";
  }

  // Rain: 500–531
  else if (conditionId >= 500 && conditionId <= 531) {
    VisualIcon = CloudRain;
    conditionClass = "weather-rain";
  }

  // Snow: 600–622
  else if (conditionId >= 600 && conditionId <= 622) {
    VisualIcon = CloudSnow;
    conditionClass = "weather-snow";
  }

  // Atmosphere: mist, smoke, haze, fog, etc.
  else if (conditionId >= 701 && conditionId <= 781) {
    VisualIcon = CloudFog;
    conditionClass = "weather-fog";
  }

  // Clear sky
  else if (conditionId === 800) {
    VisualIcon = isNight ? Moon : Sun;
    conditionClass = isNight
      ? "weather-clear-night"
      : "weather-clear-day";
  }

  // Few clouds
  else if (conditionId === 801) {
    VisualIcon = isNight ? CloudMoon : CloudSun;
    conditionClass = "weather-few-clouds";
  }

  // Scattered clouds
  else if (conditionId === 802) {
    VisualIcon = CloudSun;
    conditionClass = "weather-scattered";
  }

  // Broken clouds / overcast
  else if (conditionId === 803 || conditionId === 804) {
    VisualIcon = Cloud;
    conditionClass = "weather-overcast";
  }

  return (
    <div className={`weather-visual ${conditionClass}`}>
      <div className="weather-visual-glow"></div>

      <VisualIcon
        className="weather-main-icon"
        size={112}
        strokeWidth={1.35}
        aria-hidden="true"
      />

      <div className="weather-visual-caption">
        {weather.main}
      </div>

      <div className="weather-visual-description">
        {weather.description}
      </div>
    </div>
  );
};

export default WeatherVisual;
