import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.intervalId = "";
    this.state = {
      currentTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      difference: {
        india: 0,
        london: 0,
      },
      formInput: {
        USTime: "",
        indiaDifference: "",
        londonDifference: "",
      },
      message: {
        showErrorMessage: false,
        detail: "",
      },
    };
  }

  componentDidMount() {
    let date = new Date();
    this.setState({
      currentTime: {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      },
    });

    this.IntervalId = setInterval(() => {
      this.updateTime();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTime = () => {
    let { hours, minutes, seconds } = this.state.currentTime;
    seconds = seconds + 5;
    if (seconds > 59) {
      seconds = seconds % 60;
      minutes++;
      if (minutes > 59) {
        minutes = minutes % 60;
        hours++;
        if (hours > 23) {
          hours = hours % 24;
        }
      }
    }
    this.setState({
      currentTime: {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      },
    });
  };

  handleCheckForValidTime = () => {
    let USTime = this.state.formInput.USTime;
    let timeArray = USTime.split(":");
    if (timeArray.length !== 3) {
      return false;
    }
    let hours = parseInt(timeArray[0]);
    let minutes = parseInt(timeArray[1]);
    let seconds = parseInt(timeArray[2]);
    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      isNaN(seconds) ||
      !(hours >= 0 && hours < 24) ||
      !(minutes >= 0 && minutes < 60) ||
      !(seconds >= 0 && seconds < 60)
    ) {
      return false;
    }
    return { hours, minutes, seconds };
  };

  handleTimeSet = () => {
    let validationStatus = this.handleCheckForValidTime();
    if (validationStatus === false) {
      this.setState({
        message: {
          showErrorMessage: true,
          detail: "Invalid Time (use HH:MM:SS)",
        },
      });
    } else {
      const { hours, minutes, seconds } = validationStatus;
      this.setState({
        currentTime: {
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        },
        formInput: {
          ...this.state.formInput,
          USTime: "",
        },
        message: {
          showErrorMessage: false,
          detail: "",
        },
      });
    }
  };

  handleChange = (e) => {
    let label = e.target.id;
    let value = e.target.value;

    if (label === "india") {
      this.setState({
        formInput: {
          ...this.state.formInput,
          indiaDifference: value,
        },
      });
    } else if (label === "london") {
      this.setState({
        formInput: {
          ...this.state.formInput,
          londonDifference: value,
        },
      });
    } else if (label === "USTime") {
      this.setState({
        formInput: {
          ...this.state.formInput,
          USTime: value,
        },
      });
    }
  };

  checkForValidHours = (time) => {
    time = parseInt(time);
    if (isNaN(time) || time < -24 || time > 24) {
      return false;
    }
    return true;
  };

  handleSetDifferenceLondon = () => {
    const { londonDifference } = this.state.formInput;
    let status = this.checkForValidHours(londonDifference);
    if (!status) {
      this.setState({
        message: {
          showErrorMessage: true,
          detail:
            "Invalid Hours to set London Difference (should between -24 to 24)",
        },
      });
    } else {
      this.setState({
        difference: {
          ...this.state.difference,
          london: parseInt(londonDifference),
        },
        message: {
          showErrorMessage: false,
          detail: "",
        },
      });
    }
  };

  handleSetDifferenceIndia = () => {
    const { indiaDifference } = this.state.formInput;
    let status = this.checkForValidHours(indiaDifference);
    if (!status) {
      this.setState({
        message: {
          showErrorMessage: true,
          detail:
            "Invalid Hours to set India Difference (should between -24 to 24)",
        },
      });
    } else {
      this.setState({
        difference: {
          ...this.state.difference,
          india: parseInt(indiaDifference),
        },
        message: {
          showErrorMessage: false,
          detail: "",
        },
      });
    }
  };

  handleLogout = () => {
    this.props.setLoggedIn();
  };

  getTimeString = (hours, minutes, seconds) => {
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
  };

  getIndiaTime = () => {
    const { india } = this.state.difference;
    const { hours, minutes, seconds } = this.state.currentTime;
    let newHour = (hours + india + 24) % 24;
    let indiaString = this.getTimeString(newHour, minutes, seconds);
    return indiaString;
  };

  getLondonTime = () => {
    const { london } = this.state.difference;
    const { hours, minutes, seconds } = this.state.currentTime;
    let newHour = (hours + london + 24) % 24;
    let londonString = this.getTimeString(newHour, minutes, seconds);
    return londonString;
  };

  render() {
    const { hours, minutes, seconds } = this.state.currentTime;
    const { indiaDifference, londonDifference, USTime } = this.state.formInput;
    let time = this.getTimeString(hours, minutes, seconds);
    let indiaTime = this.getIndiaTime();
    let londonTime = this.getLondonTime();
    const { showErrorMessage, detail } = this.state.message;
    return (
      <div>
        <div className="navbar w-100 d-flex justify-content-end">
          <button className="btn btn-danger" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
        <div className="row col-sm-12 col-lg-8 offset-lg-2 col-md-10 offset-md-1 mt-3 set-time">
          Set United State Time :
          <input
            id="USTime"
            type="text"
            placeholder="HH:MM:SS"
            value={USTime}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-primary ml-md-1 mt-xs-1"
            onClick={this.handleTimeSet}
          >
            Submit
          </button>
        </div>
        <div className="row col-md-10 offset-md-1 col-lg-10 offset-lg-1 mt-5 ">
          <div className="col-md-6 col-sm-12 text-center time">
            United State :{" "}
            <span className="us-time" style={{ fontSize: "3rem" }}>
              {time}
            </span>
          </div>
          <div className="col-md-3 col-xs-4 col-sm-6 text-center time">
            London : <span className="us-time">{londonTime}</span>
          </div>
          <div className="col-md-3 col-sm-4 col-xs-6 text-center time">
            India :<span className="us-time">{indiaTime}</span>
          </div>
        </div>
        <div className="row col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 mt-5 set-difference-container ">
          <div className="mt-4">
            Time Difference for London :{" "}
            <input
              type="text"
              id="london"
              placeholder="HH"
              onChange={this.handleChange}
              value={londonDifference}
              style={{ width: "50px" }}
            />
            <button
              className="btn btn-primary m-1"
              onClick={this.handleSetDifferenceLondon}
            >
              Set
            </button>
          </div>
          <div className="mt-4 justify-content-end">
            Time Difference for India :{" "}
            <input
              type="string"
              placeholder="HH"
              id="india"
              value={indiaDifference}
              onChange={this.handleChange}
              style={{ width: "50px" }}
            />
            <button
              className="btn btn-primary m-1"
              onClick={this.handleSetDifferenceIndia}
            >
              Set
            </button>
          </div>
        </div>
        {showErrorMessage && <h3 className="alert-message">{detail}</h3>}
      </div>
    );
  }
}

export default Home;
