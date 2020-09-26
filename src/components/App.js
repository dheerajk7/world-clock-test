import React, { Component } from "react";
import Login from "./Login";
import "../styles/App.css";
import Home from "./Home";

class App extends Component {
  constructor(props) {
    super(props);
    // state to maintain username and password and logged in status and current form data as well
    this.state = {
      isLoggedIn: false,
    };
  }

  setIsLoggedInToTrue = () => {
    this.setState({ isLoggedIn: true });
  };

  setIsLoggedInToFalse = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <div>
        {!isLoggedIn && <Login setLoggedIn={this.setIsLoggedInToTrue} />}
        {isLoggedIn && <Home setLoggedIn={this.setIsLoggedInToFalse} />}
      </div>
    );
  }
}

export default App;
