import React, { Component } from "react";
import "./styles.css";
import BirthdayPartyByLocation from "./BirthdayPartyByLocation";
import BirthdayPartyByBudget from "./BirthdayPartyByBudget";

class BirthdayParties extends Component {
  constructor(props) {
    super(props);
    console.log("In the constructor App comp");
    const img1 = require("./images/images.jpeg");
    const img2 = require("./images/paintball.jpeg");
    const img3 = require("./images/harry_potter.jpeg");
    const img4 = require("./images/horse_racing.jpeg");
    const img5 = require("./images/spa.jpeg");
    const img6 = require("./images/karting.jpeg");
    this.state = {
      imagesList: [img1, img2, img3, img4, img5, img6],
      photosIndex: 0
    };
    this.handleClickForwardViewPhotos = this.handleClickForwardViewPhotos.bind(
      this
    );
    this.handleClickBackViewPhotos = this.handleClickBackViewPhotos.bind(this);
  }

  handleClickForwardViewPhotos(event) {
    if (this.state.photosIndex + 1 === this.state.imagesList.length) {
      this.setState({ photosIndex: 0 });
    } else {
      this.setState({ photosIndex: this.state.photosIndex + 1 });
    }
  }

  handleClickBackViewPhotos(event) {
    if (this.state.photosIndex - 1 === -1) {
      this.setState({ photosIndex: this.state.imagesList.length - 1 });
    } else {
      this.setState({ photosIndex: this.state.photosIndex - 1 });
    }
  }

  render() {
    return (
      <div class="container">
        <header>
          <div class="header">Birthday Parties</div>
          <nav>
            <ul id="navbar">
              <li class="menu">
                <a href="index.html">Home</a>
              </li>

              <li class="menu">
                <a href="location.html">Birthday Parties</a>
              </li>
            </ul>
          </nav>
        </header>
        <div class="frame4">
          We can look after the whole party for you. From our initial
          discussions together, we will advise and guide you through taking the
          decision for the best party for your needs. You just need to turn up!
        </div>

        <div class="frame4">
          <img src={this.state.imagesList[this.state.photosIndex]} alt="" />

          <button onClick={this.handleClickForwardViewPhotos}>
            {" "}
            View previous{" "}
          </button>
          <button onClick={this.handleClickForwardViewPhotos}>
            {" "}
            View next{" "}
          </button>
        </div>

        <BirthdayPartyByLocation />
        <hr />
        <BirthdayPartyByBudget />
      </div>
    );
  }
}
export default BirthdayParties;

