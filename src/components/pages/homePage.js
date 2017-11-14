import React, { Component } from 'react';
import axios from 'axios';
import jquery from '../../index';

class Homepage extends Component {

  // constructor to initialize state
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      temperature: '',
      apparentTemperature: '',
      lat: '',
      lng: ''
    }
  }
  // handler for 'address' controlled input
  onChangeAddress = (e) => {
    this.setState({ address: e.target.value });
  }
  // execute search
  doSearch = (e) => {
    e.preventDefault()
    const encodedAddress = encodeURIComponent(this.state.address);
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    axios.get(geocodeUrl).then((response) => {
      if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address.');
      }
      this.setState({
        lat: response.data.results[0].geometry.location.lat,
        lng: response.data.results[0].geometry.location.lng,
        add: response.data.results[0].formatted_address
      });
      const weatherUrl = `https://api.darksky.net/forecast/c19cc88150a85b69753b7fc23e3ca99d/${this.state.lat},${this.state.lng}`;
      
      console.log(response.data.results[0].formatted_address);
      console.log(weatherUrl);
      return axios.get(weatherUrl);
    }).then((response) => {
      this.setState({
        temperature: "It is currently: " + response.data.currently.temperature + "°F",
        apparentTemperature: "It feels like: " + response.data.currently.apparentTemperature + "°F",
        icon: response.data.currently.icon   
      });

      console.log(`It's currently ${this.state.temperature}. It feels like ${this.state.apparentTemperature}`);
    }).catch((e) => {
      if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers.');
      } else {
        console.log(e.message);
      }
    });
  }



  render() {
    const { add, lat, lng, address, temperature, apparentTemperature, icon } = this.state;
    return (
      <div className="container-fluid">
        <h1>
          Check the current weather anywhere!
        </h1>
        <form id="addres-form">
          <div id="address" className="form-group">
            <input className="form-control" type="text" name="address" placeholder="Location" value={address} onChange={this.onChangeAddress} />
          </div>
          <div id="address" className="form-group">
            <button className="btn btn-lg btn-primary btn-block" onClick={this.doSearch}>Search!</button>
          </div>
        </form>
        <div id="weatherPics">
        <img id="partly-cloudy" src="../../cloudy-day-1.svg"></img>
          <img id ="snowy" src="../../snowy-6.svg"></img>
          <img id="thunder" src="../../thunder.svg"></img>
          <img id="rainy" src="../../rainy-7.svg"></img>
          <img id="day" src="../../day.svg"></img>
        </div>
        <div className="weather-info">
           <div className="address">{add}</div><hr></hr><br />
           {icon}<hr></hr><br />
           <div className="temp">{temperature}</div><hr></hr><br />
            {apparentTemperature}
          </div>
      </div>
    );
  }
}



export default Homepage;