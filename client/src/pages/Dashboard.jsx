
import { useEffect, useState } from "react";

import {
  MapPin,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  CloudSun,
  RefreshCw
} from "lucide-react";

import { getCurrentWeather } from "../services/weatherService";
import SearchBar from "../components/SearchBar";
import ThemeToggle from "../components/ThemeToggle";
import WeatherVisual from "../components/WeatherVisual";

const Dashboard = () => {
  const [city, setCity] = useState("Hyderabad");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async (searchCity) => {
    setLoading(true);
    setError("");

    try {
      const response = await getCurrentWeather(searchCity);

      setWeather(response.data);
      setLocation(response.location);
      setCity(response.location.name);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to fetch weather. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("Hyderabad");
  }, []);

  const formatTime = (timestamp, timezone) => {
    if (!timestamp) return "--:--";

    return new Date(
      (timestamp + timezone) * 1000
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC"
    });
  };

  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const insights = weather
    ? [
        {
          label: "Humidity",
          value: `${weather.main.humidity}%`,
          icon: Droplets
        },
        {
          label: "Wind Speed",
          value: `${weather.wind.speed} m/s`,
          icon: Wind
        },
        {
          label: "Visibility",
          value: `${(weather.visibility / 1000).toFixed(1)} km`,
          icon: Eye
        },
        {
          label: "Pressure",
          value: `${weather.main.pressure} hPa`,
          icon: Gauge
        }
      ]
    : [];

  return (
    <main className="dashboard">

      {/* Navigation */}
      <header className="topbar">

        <div className="brand">
          <div className="brand-icon">
            <CloudSun size={27} />
          </div>

          <div>
            <h1>Aethera<span>.</span></h1>
            <p>WEATHER INTELLIGENCE</p>
          </div>
        </div>

        <div className="topbar-actions">
          <SearchBar
            onSearch={fetchWeather}
            loading={loading}
          />

          <ThemeToggle />
        </div>

      </header>

      {/* Main content */}
      <section className="dashboard-content">

        <div className="welcome-section">
          <div>
            <p className="eyebrow">YOUR WEATHER SPACE</p>
            <h2>Discover your atmosphere.</h2>
            <p className="date-text">{formatDate()}</p>
          </div>

          <button
            className="refresh-button"
            onClick={() => fetchWeather(city)}
            disabled={loading}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading && !weather ? (
          <div className="loading-card">
            <div className="loader"></div>
            <p>Reading the atmosphere...</p>
          </div>
        ) : weather && location ? (
          <>
            {/* Weather Hero */}
            <section className="weather-hero">

              <div className="hero-glow hero-glow-one"></div>
              <div className="hero-glow hero-glow-two"></div>

              <div className="hero-content">

                <div className="location-label">
                  <MapPin size={16} />
                  {location.name}, {location.state || location.country}
                </div>

                <p className="hero-description">
                  {weather.weather[0].description}
                </p>

                <div className="temperature">
                  {Math.round(weather.main.temp)}
                  <span>°C</span>
                </div>

                <p className="feels-like">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </p>

                <div className="temperature-range">
                  H: {Math.round(weather.main.temp_max)}° 
                  <span>·</span>
                  L: {Math.round(weather.main.temp_min)}°
                </div>

              </div>

              <WeatherVisual weather={weather.weather[0]} />

              <div className="hero-footer">
                <span>
                  <Sunrise size={17} />
                  Sunrise {formatTime(weather.sys.sunrise, weather.timezone)}
                </span>

                <span>
                  <Sunset size={17} />
                  Sunset {formatTime(weather.sys.sunset, weather.timezone)}
                </span>
              </div>

            </section>

            {/* Weather Insights */}
            <section className="insights-section">

              <div className="section-heading">
                <div>
                  <p className="eyebrow">ATMOSPHERIC DETAILS</p>
                  <h3>Weather insights</h3>
                </div>

                <span>Live data</span>
              </div>

              <div className="insights-grid">

                {insights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="insight-card" key={item.label}>
                      <div className="insight-icon">
                        <Icon size={21} />
                      </div>

                      <p>{item.label}</p>
                      <h4>{item.value}</h4>
                    </div>
                  );
                })}

              </div>
            </section>
          </>
        ) : null}

      </section>

      <footer className="dashboard-footer">
        <span>© 2026 Aethera Weather Intelligence</span>
        <span>Powered by OpenWeatherMap</span>
      </footer>

    </main>
  );
};

export default Dashboard;
