import { useState } from "react";

const API_KEY = "7c8964e22ebc8ff90bdcee96a99b0b9d";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("City not found. Please try again.");
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") getWeather();
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 480, padding: "0 20px" }}>
        <h1 style={{ textAlign: "center", color: "white", fontSize: 32, marginBottom: 8 }}>🌤️ Weather App</h1>
        <p style={{ textAlign: "center", color: "#aaa", marginBottom: 32 }}>Search any city in the world</p>

        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <input
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKey}
            style={{ flex: 1, padding: "12px 16px", borderRadius: 10, border: "none", fontSize: 15, outline: "none" }}
          />
          <button
            onClick={getWeather}
            style={{ padding: "12px 20px", borderRadius: 10, border: "none", background: "#e94560", color: "white", fontSize: 15, cursor: "pointer", fontWeight: 600 }}
          >
            Search
          </button>
        </div>

        {loading && <p style={{ textAlign: "center", color: "white" }}>Loading...</p>}
        {error && <p style={{ textAlign: "center", color: "#e94560" }}>{error}</p>}

        {weather && (
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 16, padding: 28, color: "white", backdropFilter: "blur(10px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 28 }}>{weather.name}, {weather.sys.country}</h2>
                <p style={{ margin: 0, color: "#aaa", textTransform: "capitalize" }}>{weather.weather[0].description}</p>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                style={{ width: 70 }}
              />
            </div>

            <div style={{ fontSize: 64, fontWeight: 700, textAlign: "center", margin: "10px 0" }}>
              {Math.round(weather.main.temp)}°C
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 20 }}>
              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: 14, textAlign: "center" }}>
                <p style={{ margin: 0, color: "#aaa", fontSize: 12 }}>Feels like</p>
                <p style={{ margin: 0, fontWeight: 600 }}>{Math.round(weather.main.feels_like)}°C</p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: 14, textAlign: "center" }}>
                <p style={{ margin: 0, color: "#aaa", fontSize: 12 }}>Humidity</p>
                <p style={{ margin: 0, fontWeight: 600 }}>{weather.main.humidity}%</p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: 14, textAlign: "center" }}>
                <p style={{ margin: 0, color: "#aaa", fontSize: 12 }}>Wind</p>
                <p style={{ margin: 0, fontWeight: 600 }}>{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}