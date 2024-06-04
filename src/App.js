import React, {useState} from 'react';

const api = {
  key: "58a981834c37c6a79350536d546bc950",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={
      (typeof weather.main != "undefined") ? (
          (weather.main.temp > 16) ? 'app warm' : 'app')
        : 'app'}
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className="context-box">
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="weather">
                  <div>
                    {weather.weather[0].main}
                  </div>
                  <img className="weather-icon" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                       alt="icon"/>
                </div>
              </div>
            </div>
          ) : (
            <div className="default-view">
              <div className="main-view">Сервис прогноза погоды</div>
              <div className="support-view">Введите название города в поиск!</div>
            </div>
          )}
        </div>
      </main>
    </div>);
}

export default App;
