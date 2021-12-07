import React, { Component } from "react";
//import DateTimePicker from "react-datetime-picker";
import Login from "./Login";
import Register from "./Register";
import Meeting from "./Meeting";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: "None",
      login: 0,
      register: 0,
      wedding: 0,
      birthday: 0,
      meeting: 0,
      babyShower: 0
      // All the variables that I need to change their values in my programe
    };
    this.buttonLoginaction = this.buttonLoginaction.bind(this);
    this.buttonRegisteraction = this.buttonRegisteraction.bind(this);
    this.buttonBabyShoweraction = this.buttonBabyShoweraction.bind(this);
    this.buttonBirthdayaction = this.buttonBirthdayaction.bind(this);
    this.buttonWeddingaction = this.buttonWeddingaction.bind(this);
    this.buttonMeetingaction = this.buttonMeetingaction.bind(this);
  } // to bind the functions with the input fields or with the dropdown list
  // the end of the constructor

  buttonLoginaction() {
    let actionVariable = this.state.login;
    actionVariable = actionVariable + 10;
    this.setState({ login: actionVariable });
    this.setState({ choice: "login" });
  } // this function handles the Login button by re setting the "choice" variable value to "login" which we will use it later and pass it to a render function
  //which will open the Login component.
  buttonRegisteraction() {
    let actionVariable = this.state.register;
    actionVariable = actionVariable + 10;
    this.setState({ register: actionVariable });
    this.setState({ choice: "register" });
  } // this function handles the Login button by re setting the "choice" variable value to "register" which we will use it later and pass it to a render function
  //which will open the Register component.

  buttonWeddingaction() {
    let actionVariable = this.state.wedding;
    actionVariable = actionVariable + 10;
    this.setState({ wedding: actionVariable });
    this.setState({ choice: "wedding" });
  } // this function handles the Login button by re setting the "choice" variable value to "wedding" which we will use it later and pass it to a render function
  //which will open the Wedding component.

  buttonBirthdayaction() {
    let actionVariable = this.state.birthday;
    actionVariable = actionVariable + 10;
    this.setState({ birthday: actionVariable });
    this.setState({ choice: "birthday" });
  } // this function handles the Login button by re setting the "choice" variable value to "birthday" which we will use it later and pass it to a render function
  //which will open the Birthday component.
  buttonMeetingaction() {
    let actionVariable = this.state.meeting;
    actionVariable = actionVariable + 10;
    this.setState({ meeting: actionVariable });
    this.setState({ choice: "meeting" });
  } // this function handles the Login button by re setting the "choice" variable value to "meeting" which we will use it later and pass it to a render function
  //which will open the Meeting component.
  buttonBabyShoweraction() {
    let actionVariable = this.state.babyShower;
    actionVariable = actionVariable + 10;
    this.setState({ babyShower: actionVariable });
    this.setState({ choice: "babyShower" });
  } // this function handles the Login button by re setting the "choice" variable value to "babyShower" which we will use it later and pass it to a render function
  //which will open the BabyShower component.

  render() {
    return (
      <div className="App">
        <h1>Welcome to AJ's Event</h1>
        <h3>let's get started!</h3>

        <button onClick={this.buttonLoginaction}>Login</button>
        <button onClick={this.buttonRegisteraction}> Register</button>
        <br />
        <br />
        <button onClick={this.buttonWeddingaction}>Wedding</button>
        <br />
        <br />
        <button onClick={this.buttonBirthdayaction}>Birthday</button>
        <br />
        <br />
        <button onClick={this.buttonMeetingaction}>Meeting</button>
        <br />
        <br />
        <button onClick={this.buttonBabyShoweraction}>Baby Shower</button>
        <br />
        <br />

        {this.state.choice === "login" && <Login />}

        {this.state.choice === "register" && <Register />}
        {this.state.choice === "meeting" && <Meeting />}
      </div>
    );
  }
}

export default App;
