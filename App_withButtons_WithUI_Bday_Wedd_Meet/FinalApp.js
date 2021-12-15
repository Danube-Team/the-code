import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import Meeting from "./components/Meeting";
import BirthdayParties from "./components/BirthdayParties";
import Wedding from "./components/AddWedding";
import BabyShower from "./components/BabyShower";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: "None",
     
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
    this.setState({ choice: "Login" });
  } // this function handles the Login button by re setting the "choice" variable value to "Login" which we will use it later and pass it to a render function
  //which will open the Login component.
  buttonRegisteraction() {
    this.setState({ choice: "Register" });
  } // this function handles the Login button by re setting the "choice" variable value to "Register" which we will use it later and pass it to a render function
  //which will open the Register component.

  buttonWeddingaction() {
    this.setState({ choice: "WEDDING EVENT" });
  } // this function handles the Login button by re setting the "choice" variable value to "WEDDING EVENT" which we will use it later and pass it to a render function
  //which will open the Wedding component.

  buttonBirthdayaction() {
    this.setState({ choice: "BIRTHDAY PARTIES" });
  } // this function handles the Login button by re setting the "choice" variable value to "BIRTHDAY PARTIES" which we will use it later and pass it to a render function
  //which will open the Birthday component.
  buttonMeetingaction() {
    this.setState({ choice: "MEETING FORM" });
  } // this function handles the Login button by re setting the "choice" variable value to "MEETING FORM" which we will use it later and pass it to a render function
  //which will open the Meeting component.
  buttonBabyShoweraction() {
    this.setState({ choice: "BABY SHOWER" });
  } // this function handles the Login button by re setting the "choice" variable value to "BABY SHOWER" which we will use it later and pass it to a render function
  //which will open the BabyShower component.

  render() {
    return (
      <div class="container">
        <header>
          <div class="header">AJ's Events</div>
        </header>
        <div class="frame6">
          Welcome to AJ's Events! We can look after the whole party for you.
          From our initial discussions together, we will advise and guide you
          through taking the decision for the best party for your needs. You
          just need to turn up!
        </div>
        <hr />
        <div class="frame7">
          <h4>let's get started!</h4>
          <br />
          <br />

          <button class="weddingButton" onClick={this.buttonWeddingaction}>
            Wedding
          </button>

          <button class="birthDayButton" onClick={this.buttonBirthdayaction}>
            Birthday
          </button>

          <button
            class="babyShowerButton"
            onClick={this.buttonBabyShoweraction}
          >
            Baby Shower
          </button>

          <button class="meetingButton" onClick={this.buttonMeetingaction}>
            Meeting
          </button>
        </div>
        <div class="frame4">
          <button onClick={this.buttonLoginaction}>Login</button>
          <button onClick={this.buttonRegisteraction}> Register</button>
          <br />
        </div>

        <br />
        <hr />
        {this.state.choice === "Login" && <Login title={this.state.choice}/>}
        {this.state.choice === "Register" && <Register title={this.state.choice}/>}
        {this.state.choice === "MEETING FORM" && <Meeting title={this.state.choice}/>}
        {this.state.choice === "BIRTHDAY PARTIES" && <BirthdayParties title={this.state.choice}/>}
        {this.state.choice === "BABY SHOWER" && <BabyShower title={this.state.choice}/>}
        {this.state.choice === "WEDDING EVENT" && <Wedding title={this.state.choice}/>}
      </div>
    );
  }
}

export default App;
