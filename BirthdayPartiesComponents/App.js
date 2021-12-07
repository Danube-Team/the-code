import React, { Component } from "react";
import "./styles.css";
import BirthdayParties from "./BirthdayParties";

class App extends Component {
  render() {
    return (
      <div >
        <header>
          <div class="header">Danube Events</div>
        </header>
        <BirthdayParties />
      </div>
    );
  }
}

export default App;

