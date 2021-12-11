import React, { Component } from "react";
import AddWedding from "./AddWedding";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weddings: []
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Wedding Event</h1>

        <AddWedding />
        
       
      </div>
    ); // end of return statement
  } // end of render function
} // end of class
// close the Basket component

export default App;
