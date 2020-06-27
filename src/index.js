import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";

ReactDOM.render(<App />, document.getElementById("root"));

const head = document.querySelector("head");
const script = document.createElement("script");
script.src = process.env.REACT_APP_Fontawesome;
script.crossOrigin = "anonymous";
head.appendChild(script);
