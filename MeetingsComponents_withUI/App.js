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
      start: 100
    };
    this.buttonAction = this.buttonAction.bind(this);
  }

  buttonAction() {
    let actionVariable = this.state.start;
    actionVariable = actionVariable + 10;
    this.setState({ start: actionVariable });
  }

  render() {
    return (
      <div class="container">
        <header>
          <div class="header">Welcome to Danube! </div>
          <div class="frame6">
            <h4>don't know how to plan for your event?</h4>
          </div>
          <div class="frame6">
            <h3> here's Danube!</h3>
            <hr />
            <p>
              A specialized Event App which will help you to organize your event
            </p>
          </div>
        </header>
        <div class="frame4">
          <button onClick={this.buttonAction}>Press here to Start!</button>
          {this.state.start > 100 && <Login varA={this.state.start} />}
        </div>

        <Register />
        <hr />
        <Meeting />
      </div>
    );
  }
}

export default App;

