import React from "react";
import { GeoLocation } from "./geoLocation";
import "../Scss/main.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="root">
        <GeoLocation />
      </div>
    );
  }

  componentDidMount() {}

  componentDidUpdate() {}
}

export default App;
