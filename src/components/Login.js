import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // default users in our app
      userList: [
        { username: "admin", password: "admin" },
        { username: "test", password: "test123" },
      ],
      // maintaining form input
      formInput: {
        username: "",
        password: "",
      },
      showErrorMesssage: false,
    };
  }

  // changing value in state on changing input in login form
  handleChange = (e) => {
    let label = e.target.id;
    let value = e.target.value;
    if (label === "username") {
      this.setState({
        formInput: { ...this.state.formInput, username: value },
      });
    } else if (label === "password") {
      this.setState({
        formInput: {
          ...this.state.formInput,
          password: value,
        },
      });
    }
  };

  // login user after checking username and password
  handleLogIn = (e) => {
    e.preventDefault();
    const { userList } = this.state;
    const { username, password } = this.state.formInput;
    for (let user of userList) {
      if (user.username === username.toLowerCase()) {
        if (user.password === password) {
          // calling props to set isLoggedIn to true
          this.props.setLoggedIn();
          return;
        }
      }
    }
    this.setState({ showErrorMesssage: true });
  };

  // reset input field of login form
  handleResetButton = () => {
    this.setState({
      formInput: {
        username: "",
        password: "",
      },
      showErrorMesssage: false,
    });
  };

  // hiding error message on unmounting
  componentWillUnmount() {
    this.setState({ showErrorMesssage: false });
  }

  render() {
    const { showErrorMesssage } = this.state;
    const { username, password } = this.state.formInput;
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div
          className="col col-md-4 col-sm-12 d-flex flex-column align-items-center"
          style={{ height: "400px" }}
        >
          <img
            className="h-25"
            src="data:image/jpeg;base64,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"
            alt="user-icon"
            style={{ textAlign: "center" }}
          ></img>
          <form className="w-100 mt-3">
            <div className="form-group">
              <label htmlFor="username">User Name :</label>
              <input
                id="username"
                type="text"
                className="form-control"
                value={username}
                placeholder="User Name"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password :</label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />
            </div>
            <button
              className="btn btn-success w-100"
              onClick={this.handleLogIn}
            >
              Log In
            </button>
          </form>
          <button
            className="btn btn-warning w-100 mt-2"
            onClick={this.handleResetButton}
          >
            Reset
          </button>
          {showErrorMesssage && (
            <h3 className="alert-message">Invalid Username or Password</h3>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
