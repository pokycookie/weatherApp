import React from "react";
import PropTypes from "prop-types";

function Food({ isFood, name, price }) {
  if (isFood) {
    return (
      <p>
        I like {name}. ({price})
      </p>
    );
  } else {
    return (
      <p>
        {name} is not Food. ({price})
      </p>
    );
  }
}

const AJAX = [
  {
    name: "Chicken",
    price: 18000,
    food: true,
  },
  {
    name: "Pizza",
    price: 9000,
    food: true,
  },
  {
    name: "Bottle",
    price: 5000,
    food: false,
  },
  {
    name: "Ramen",
    price: 2000,
    food: true,
  },
];

// Should use this name => (Function name).propTypes = {...}
Food.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isFood: PropTypes.bool.isRequired,
};

// Function Component
// eslint-disable-next-line no-unused-vars
function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      {AJAX.map((element, index) => (
        <Food key={index} name={element.name} isFood={element.food} price={element.price} />
      ))}
    </div>
  );
}

// Class Component
class classApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.increase = this.increase.bind(this);
    console.log(this);
  }

  increase() {
    console.log("Increase");
    this.setState({ count: this.state.count + 1 });
    // Bad Example
  }
  decrease = () => {
    console.log("Decrease");
    this.setState((current) => ({ count: current.count - 1 }));
    // Good Example
  };

  componentDidMount() {
    console.log("After Render");
  }
  componentDidUpdate() {
    console.log("Update");
  }

  // Render
  render() {
    console.log("Render");
    return (
      <div>
        <h1>I'm a Class Component</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increase}>Increase</button>
        <button onClick={this.decrease}>Decrease</button>
      </div>
    );
  }
}

export default classApp;
