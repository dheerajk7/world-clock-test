import React, { Component } from "react";
import Login from "./Login";
import Home from "./Home";

class App extends Component {
  constructor(props) {
    super(props);
    // state to maintain username and password and logged in status and current form data as well
    this.state = {
      isLoggedIn: false,
      userList: [
        { username: "admin", password: "admin" },
        { username: "test", password: "test123" },
      ],
      input: {
        username: "",
        password: "",
      },
    };
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <div>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </div>
    );
  }
}

export default App;
