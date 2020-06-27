import React from "react";
import axios from "axios";

function getStandardTime(time, mode) {
  // mode 0: 00:00 (year-month-date), 1: 00:00, 2: month / date
  const hours = `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}`;
  const minutes = `${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}`;
  const year = `${time.getFullYear() < 10 ? `0${time.getFullYear()}` : time.getFullYear()}`;
  const month = `${time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1}`;
  const date = `${time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()}`;
  switch (mode) {
    case 0:
      return `${hours}:${minutes} (${year}-${month}-${date})`;
    case 1:
      return `${hours}:${minutes}`;
    case 2:
      return `${month}/${date}`;
    default:
      return `${hours}:${minutes} (${year}-${month}-${date})`;
  }
}

export class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {
        dt: new Date(),
        clouds: 0,
        feels_like: 0,
        humidity: 0,
        pressure: 0,
        temp: 0,
        wind_deg: 0,
        wind_speed: 0,
        weather: {},
        icon: "01d",
        description: "null",
        sunrise: 0,
        sunset: 0,
      },
      daily: [],
    };
  }

  getWeatherData = async (latitude, longitude) => {
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OpenWeatherKEY}&units=metric`);
    console.log(weatherData);
    return weatherData;
  };

  render() {
    return (
      <div className="weather">
        <div className="current__weather">
          <div className="info__temp">
            <div className="main">
              <img className="icon" src={`http://openweathermap.org/img/wn/${this.state.current.icon}@2x.png`} alt={this.state.current.description} />
              <span className="temp">{Math.floor(this.state.current.temp)}℃</span>
            </div>
            <span className="feels">체감온도 {Math.floor(this.state.current.feels_like)}℃</span>
          </div>
          <div className="info__other">
            <div className="humidity">
              <div className="icon">
                <i className="fas fa-tint"></i>
              </div>
              <span className="value">{this.state.current.humidity}%</span>
            </div>
            <div className="wind">
              <div className="icon">
                <i className="fas fa-wind"></i>
              </div>
              <div className="wind-deg" id="currentWindDeg">
                <i className="fas fa-long-arrow-alt-up"></i>
              </div>
              <span className="wind-speed">{this.state.current.wind_speed} m/s</span>
            </div>
            <div className="clouds">
              <div className="icon">
                <i className="fas fa-cloud"></i>
              </div>
              <span className="value">{this.state.current.clouds}%</span>
            </div>
          </div>
        </div>
        <div className="daily__weather__area">
          {this.state.daily.map((element, index) => {
            if (index !== 0) {
              return (
                <div className="daily__weather" key={index}>
                  <span className="time">{getStandardTime(element.dt, 2)}</span>
                  <img className="icon" src={`http://openweathermap.org/img/wn/${element.weather_icon}.png`} alt={element.weather_description} />
                  <span className="max-temp">{element.max_temp}℃</span>
                  <span className="min-temp">{element.min_temp}℃</span>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }

  async componentDidUpdate(prevProps) {
    const windDegElement = document.querySelector("#currentWindDeg");
    const windDegValue = parseInt(this.state.current.wind_deg);
    windDegElement.style.transform = `rotate(${windDegValue}deg)`;
    if (this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude) {
      const {
        data: {
          current: { clouds, dt, feels_like, humidity, pressure, sunrise, sunset, temp, uvi, weather, wind_deg, wind_speed },
          daily,
        },
      } = await this.getWeatherData(this.props.latitude, this.props.longitude);
      const dailyArr = daily.map((element) => {
        return {
          dt: new Date(element.dt * 1000),
          max_temp: Math.floor(element.temp.max),
          min_temp: Math.floor(element.temp.min),
          humidity: element.humidity,
          weather_description: element.weather[0].description,
          weather_icon: element.weather[0].icon,
        };
      });
      this.setState({
        current: {
          clouds,
          dt: new Date(dt * 1000),
          feels_like,
          humidity,
          pressure,
          sunrise,
          sunset,
          temp,
          uvi,
          weather,
          icon: weather[0].icon,
          description: weather[0].description,
          wind_deg,
          wind_speed,
        },
        daily: dailyArr,
      });
    }
  }
}
