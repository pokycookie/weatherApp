import React from "react";
import axios from "axios";
import { Weather } from "./Weather";

export class GeoLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      address: "Korea",
    };
  }

  // Get Address with Daum API
  getAddress = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        this.setState({ address: data.address });
        this.getGeoLocation(data.address);
      },
    }).open();
  };

  // Get current Address
  getCurrentAddress = async () => {
    const {
      coords: { latitude, longitude },
    } = await this.getCurrentGeoLocation();
    const address = await this.getGeoLoactionAddress(latitude, longitude);
    this.setState({ latitude, longitude, address });
  };

  // Get current geoLocation
  getCurrentGeoLocation = () => {
    if ("geolocation" in navigator) {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    } else {
      console.log("Can't access geoLocation");
    }
  };

  // Get geoLocation with Address
  getGeoLocation = async (address) => {
    const geoLocationList = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${address}`, {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KakaoKEY}`,
      },
    });
    this.setState({ longitude: geoLocationList.data.documents[0].x, latitude: geoLocationList.data.documents[0].y });
  };

  // Get Address with geoLocation
  getGeoLoactionAddress = async (latitude, longitude) => {
    const geoLocationData = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`, {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KakaoKEY}`,
      },
    });
    const address = geoLocationData.data.documents[0].address_name;
    return address;
  };

  render() {
    return (
      <div className="app">
        <div className="geoLocation">
          <div className="location">
            <span className="icon">
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <span className="value">{this.state.address}</span>
          </div>
          <div className="controller">
            <button onClick={this.getAddress}>위치 검색</button>
            <button onClick={this.getCurrentAddress}>내 위치</button>
          </div>
        </div>
        <Weather latitude={this.state.latitude} longitude={this.state.longitude} />
      </div>
    );
  }

  async componentDidMount() {
    const {
      coords: { latitude, longitude },
    } = await this.getCurrentGeoLocation();
    const address = await this.getGeoLoactionAddress(latitude, longitude);
    this.setState({ latitude, longitude, address });
  }
}
