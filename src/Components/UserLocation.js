import React from 'react';

function UserLocation(props) {
  const {
    temperature,
    description,
    location,
    region,
    country,
    wind_speed,
    pressure,
    precip,
    humidity,
    img,
  } = props.weather;

  console.log(props.weather);
  return (
    <div className="user-weather">
      <div className="col-md-9">
        <h6>
          {new Date().toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </h6>
        <img className="mainImg" src={img} alt="weather-img" />
      </div>
      <div className="row">
        <div className="col-md-3 weather-temp">
          <h1>
            {temperature}
            <sup> o</sup>C, {description}
          </h1>
          <h4>{location}</h4>
          <p>
            {region} {country}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 weather-info">
          <p>
            <b>Wind Speed</b> (kmph)
          </p>
          <h2>{wind_speed}</h2>
        </div>

        <div className="col-md-3 weather-info">
          <p>
            <b> Pressure</b> (mbar)
          </p>
          <h2>{pressure}</h2>
        </div>

        <div className="col-md-3 weather-info">
          <p>
            <b>Precipitation</b> (mm)
          </p>
          <h2>{precip}</h2>
        </div>

        <div className="col-md-3 weather-info">
          <p>
            <b>Humidity</b> (%)
          </p>
          <h2>{humidity}</h2>
        </div>
      </div>
    </div>
  );
}

export default UserLocation;
