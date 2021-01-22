import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import UserLocation from './Components/UserLocation';
import Axios from 'axios';

class App extends React.Component {
  //state
  state = {
    userPosition: {
      latitude: 38,
      longitude: -90,
    },
    weather: {},
    regionInput: '',
    error: '',
  };

  componentDidMount() {
    //check whether geolocation is supported on my divice
    if (navigator.geolocation) {
      //console.log('suported');
      //get the lat and long of device location
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude);
        // console.log(position.coords.longitude);

        let NewPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        this.setState({ userPosition: NewPosition });

        //Weather Api call
        Axios.get(
          `http://api.weatherstack.com/current?access_key=8dc215ffe76001dc9762c59b48f39424&query=${this.state.userPosition.latitude},${this.state.userPosition.longitude}`
        )
          .then((res) => {
            console.log(res);
            let userWeather = {
              temperature: res.data.current.temperature,
              description: res.data.current.weather_descriptions[0],
              location: res.data.location.name,
              region: res.data.location.region,
              country: res.data.location.country,
              wind_speed: res.data.current.wind_speed,
              pressure: res.data.current.pressure,
              precip: res.data.current.precip,
              humidity: res.data.current.humidity,
              img: res.data.current.weather_icons,
            };
            //promise response
            this.setState({ weather: userWeather });
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    }
  }

  //update the value of input field with state

  changeRegion = (value) => {
    this.setState({ regionInput: value });
  };
  //update weather depending on the value user entered

  changeLocation = (e) => {
    e.preventDefault(); //stop refreshing the browser when input enter

    //Api call
    Axios.get(
      `http://api.weatherstack.com/current?access_key=8dc215ffe76001dc9762c59b48f39424&query=${this.state.regionInput}`
    )
      .then((res) => {
        let userWeather = {
          temperature: res.data.current.temperature,
          description: res.data.current.weather_descriptions[0],
          location: res.data.location.name,
          region: res.data.location.region,
          country: res.data.location.country,
          wind_speed: res.data.current.wind_speed,
          pressure: res.data.current.pressure,
          precip: res.data.current.precip,
          humidity: res.data.current.humidity,
          img: res.data.current.weather_icons,
        };
        //promise response
        this.setState({ weather: userWeather });
      })
      .catch((error) => {
        this.setState({ error: error.message });
        // console.log(error.message);
      });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="error">
          Please input valid region or city: {this.state.error}
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="container">
            <Navbar
              changeRegion={this.changeRegion}
              changeLocation={this.changeLocation}
            />

            <UserLocation weather={this.state.weather} />
          </div>
        </div>
      );
    }
  }
}

export default App;
