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

  // login user by changing isLoggedIn to true
  setIsLoggedInToTrue = () => {
    this.setState({ isLoggedIn: true });
  };

  // logout user by changing isLoggedIn to false
  setIsLoggedInToFalse = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn } = this.state;
    // rendering component of the basis of user login status
    return (
      <div>
        {!isLoggedIn && <Login setLoggedIn={this.setIsLoggedInToTrue} />}
        {isLoggedIn && <Home setLoggedIn={this.setIsLoggedInToFalse} />}
      </div>
    );
  }
}

export default App;
