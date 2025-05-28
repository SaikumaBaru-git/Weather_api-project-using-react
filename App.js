import React, { useState } from "react";
import axios from "axios";

// Map weather conditions to image filenames
const weatherImages = {
  Clear: "clear.jpeg",
  Clouds: "clouds.jpeg",
  Rain: "rain.jpeg",
  Drizzle: "drizzle.jpeg",
  Thunderstorm: "thunderstorm.jpeg",
  Snow: "snow.jpeg",
  Mist: "mist.jpeg",
  Haze: "haze.jpeg",
};


// Map weather to emojis
const weatherEmojis = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Haze: "🌫️",
};

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState(null); // <-- New state
  const [error, setError] = useState(null);

  const apiKey = "d37ec9db42b2318ca6e492858eb4f31f";

  const fetchWeather = () => {
    if (!city) return;

    setError(null);
    setWeather(null);
    setTemperature(null);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      .then((res) => {
        setWeather(res.data.weather[0].main);
        setTemperature(res.data.main.temp); // <-- Set temperature
      })
      .catch(() => {
        setError("City not found!");
      });
  };

  
const backgroundImage = weather ? (weatherImages[weather] || "default.jpeg") : "default.jpeg";

 const style = {
  height: "100vh",
  backgroundImage: `url(/backgrounds/${backgroundImage})`, // 👈 Updated path
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};


  const boxStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "30px",
    borderRadius: "10px",
    color: "#fff",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
  };

  const inputStyle = {
    padding: "12px",
    width: "100%",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "12px",
    width: "100%",
    backgroundColor: "#007BFF",
    color: "white",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  };

  const errorStyle = {
    color: "#FF6B6B",
    marginTop: "10px",
    fontWeight: "bold",
  };

  return (
    <div style={style}>
      <div style={boxStyle}>
        <h1>🌍 Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchWeather();
          }}
          style={inputStyle}
        />
        <button onClick={fetchWeather} style={buttonStyle}>
          Search
        </button>

        {error && <p style={errorStyle}>{error}</p>}

        {weather && !error && (
          <>
            <h2>{weatherEmojis[weather] || "🌈"} {weather}</h2>
            <h3>Temperature: {temperature} °C</h3> {/* Temperature display */}
          </>
        )}
      </div>
    </div>
  );
}
