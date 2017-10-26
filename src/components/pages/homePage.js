import React, { Component } from 'react';
import axios from 'axios';

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
  doSearch = () => {
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
        temperature: response.data.currently.temperature,
        apparentTemperature: response.data.currently.apparentTemperature
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
    const { add, lat, lng, address, temperature, apparentTemperature } = this.state;
    return (
      <div className="container-fluid">
        <h1>
          Weather
        </h1>
          <div className="weather-info">
            address: {add}<br />
            latitude: {lat}<br />
            longitude: {lng}<br />
            temperature: {temperature}<br />
            feels like: {apparentTemperature}
          </div>
        
          <div id="address" className="form-group">
            <input className="form-control" type="text" name="address" placeholder="Location" value={address} onChange={this.onChangeAddress} />
          </div>
          <div id="address" className="form-group">
            <button className="btn btn-lg btn-primary btn-block" onClick={this.doSearch}>Search!</button>
          </div>
      </div>
    );
  }
}

export default Homepage;