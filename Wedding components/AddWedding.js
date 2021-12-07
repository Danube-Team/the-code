import React, { Component } from "react";
import { venueList } from "./venueList.js";
import validator from "validator";
import weddingPhoto from "./wedding.png";


const localVenueList = venueList;

function isNumeric(num) {
  return !isNaN(num);
}

class AddWedding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      eventDate: new Date(),
      numOfGuests: 0,
      venueList: localVenueList,
      venue: "",
      contact: "",
      phone: "",
      email: "",
      comments: "",
      isDJChecked: false,
      isBandChecked: false,
      isFlowersChecked: false,
      pricePP: 0,

      //error checking
      formErrors: {
        eventDate: "",
        numOfGuests: "",
        venue: "",
        contact: "",
        phone: "",
        email: ""
      },

      weddingArray: [{
        eventDate: "",
        numOfGuests: "",
        venue: "",
        contact: "",
        phone: "",
        email: "",
        totalPrice: 0}
      ],
      isContactValid: false,
      isEventDateValid: false,
      isVenueValid: false,
      isPhoneValid: false,
      isNumOfGuestsValid: false,
      isEmailValid: false,
      isformValid: false
    };
    this.submitButtonClick = this.submitButtonClick.bind(this);
    this.handleEventDate = this.handleEventDate.bind(this);
    this.handlenumOfGuests = this.handlenumOfGuests.bind(this);
    this.handleVenueChange = this.handleVenueChange.bind(this);
    this.handleContactChange = this.handleContactChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleCommentEvent = this.handleCommentEvent.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);

    this.handleFlowersCheckbox = this.handleFlowersCheckbox.bind(this);
    this.handleDJCheckbox = this.handleDJCheckbox.bind(this);
    this.handleBandCheckbox = this.handleBandCheckbox.bind(this);
  }

  submitButtonClick(event) {
    let localweddingArray = this.state.weddingArray;

    this.state.weddingArray.eventDate = this.state.eventDate;
    this.state.weddingArray.numOfGuests = this.state.numOfGuests;
    this.state.weddingArray.venue = this.state.venue;
    this.state.weddingArray.concat = this.state.contact;
    this.state.weddingArray.phone = this.state.phone;
    this.state.weddingArray.email = this.state.email;
    this.state.weddingArray.totalPrice = 
      this.state.pricePP * this.state.numOfGuests +
      (this.state.isDJChecked ? 300: 0) +
      (this.state.isFlowersChecked ? 200:0) +
      (this.state.isBandChecked ? 200: 0);

      
      console.log(this.state.weddingArray);
  }

  handleEventDate(event) {
    this.setState({ eventDate: event.target.value });
    this.validateEventDate(event.target.value);
  }

  validateEventDate(eventDate) {
    let localFormErrors = this.state.formErrors;

    if (eventDate < new Date()) {
      localFormErrors.eventDate = "Event date cannot be less than today";
      this.setState({ isEventDateValid: false });
    } else {
      localFormErrors.eventDate = "";
      this.setState({ isEventDateValid: true });
    }
    this.setState({ formErrors: localFormErrors });
    this.validateForm();
  }

  handlenumOfGuests(event) {
    this.setState({ numOfGuests: event.target.value });
    this.validateGuests(event.target.value);
  }

  validateGuests(numOfGuests) {
    let localFormErrors = this.state.formErrors;
    if (numOfGuests <= 0) {
      localFormErrors.numOfGuests = "Number of Guests is invalid";
      this.setState({ isNumOfGuestsValid: false });
    } else {
      localFormErrors.numOfGuests = "";
      this.setState({ isNumOfGuestsValid: true });
    }
    this.setState({ formErrors: localFormErrors });
    this.validateForm();
  }

  handleVenueChange(e) {
    this.setState({ venue: e.target.value });
    this.setState({ isVenueValid: true });

    this.setState({ pricePP: this.state.venueList[e.target.value].pricepp });
    this.validateForm();
  }

  handleContactChange(event) {
    this.setState({ contact: event.target.value });
    this.validateConcat(event.target.value);
  }

  validateConcat(contact) {
    let localFormErrors = this.state.formErrors;
    if (contact.length < 4) {
      localFormErrors.contact = "Contact name is too short or is invalid";
      this.setState({ isContactValid: false });
    } else {
      localFormErrors.contact = "";
      this.setState({ isContactValid: true });
    }
    this.setState({ formErrors: localFormErrors });
    this.validateForm();
  }

  handlePhoneChange(event) {
    this.setState({ phone: event.target.value });
    this.validatePhone(event.target.value);
  }

  validatePhone(phone) {
    let localFormErrors = this.state.formErrors;
    console.log(isNumeric(phone));
    if (phone.length < 8 || !isNumeric(phone)) {
      localFormErrors.phone = "Phone is too short or is invalid";
      this.setState({ isPhoneValid: false });
    } else {
      localFormErrors.contact = "";
      this.setState({ isPhoneValid: true });
    }
    this.setState({ formErrors: localFormErrors });
    this.validateForm();
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
    this.validateEmail(event.target.value);
  }

  validateEmail(email) {
    let localFormErrors = this.state.formErrors;

    if (!validator.isEmail(email)) {
      localFormErrors.email = "Email is invalid";
      this.setState({ isEmailValid: false });
    } else {
      localFormErrors.email = "";
      this.setState({ isEmailValid: true });
    }
    this.setState({ formErrors: localFormErrors });
    this.validateForm();
  }

  handleFlowersCheckbox(event) {
    this.setState({ isFlowersChecked: !this.state.isFlowersChecked });
  }

  handleDJCheckbox(event) {
    this.setState({ isDJChecked: !this.state.isDJChecked });
  }

  handleBandCheckbox(event) {
    this.setState({ isBandChecked: !this.state.isBandChecked });
  }

  handleCommentEvent(value) {
    this.setState({ comments: value });
  }

  validateForm() {
    this.setState({
      isformValid:
        this.state.isContactValid &&
        this.state.isEventDateValid &&
        this.state.isNumOfGuestsValid &&
        this.state.isPhoneValid &&
        this.state.isVenueValid &&
        this.state.isEmailValid
    });
  }

  

  render() {
    return (
      <div>
        <p>
        <img src={weddingPhoto} alt="logo" />
      </p>

        <h2> Create a Wedding Event</h2>
        <form>
          <div className="input_container">
            <label>
              Event Date &nbsp;
              <input
                type="date"
                value={this.state.eventDate}
                onChange={(e) => this.handleEventDate(e)}
              />
            </label>
            <br />
            <br />
            <label>
              Guests &nbsp;
              <input
                type="number"
                placeholder="Enter number of guests"
                value={this.state.numOfGuests}
                onChange={(e) => this.handlenumOfGuests(e)}
              />
            </label>
            <br />
            <br />
            <label>
              Venue (Capacity) &nbsp;
              <select onChange={(e) => this.handleVenueChange(e)}>
                {this.state.venueList.map((v, index) => (
                  <option key={v.id} value={v.id}>
                    {v.venuename} - ({v.capacity})
                  </option>
                ))}
              </select>
            </label>
            <br />
            <br />
            <label>
              Contact Name &nbsp;
              <input
                type="text"
                placeholder="Provide a Contact Name"
                value={this.state.contact}
                onChange={(e) => this.handleContactChange(e)}
              />
            </label>
            &nbsp; &nbsp; &nbsp;
            <br />
            <br />
            <label>
              Phone &nbsp;
              <input
                type="text"
                placeholder="Contact Phone/Mobile"
                value={this.state.phone}
                onChange={(e) => this.handlePhoneChange(e)}
              />
            </label>
            &nbsp; &nbsp; &nbsp;
            <label>
              Email &nbsp;
              <input
                type="text"
                placeholder="Email ID"
                value={this.state.email}
                onChange={(e) => this.handleEmailChange(e)}
              />
            </label>
            <br />
            <br />
            Others &nbsp; &nbsp;
            <input
              type="checkbox"
              onChange={(e) => this.handleFlowersCheckbox(e)}
              defaultChecked={this.state.isFlowersChecked}
            />
            Flowers &nbsp;
            <input
              type="checkbox"
              onChange={(e) => this.handleDJCheckbox(e)}
              defaultChecked={this.state.isDJChecked}
            />
            DJ &nbsp;
            <input
              type="checkbox"
              onChange={(e) => this.handleBandCheckbox(e)}
              defaultChecked={this.state.isBandChecked}
            />
            Band
            <label>
              <br /> <br />
              Special Requirements &nbsp;
              <textarea
                placeholder="Special notes if any"
                value={this.state.comments}
                onChange={(e) => this.handleCommentEvent(e)}
              />
            </label>
            <br /> <br />
            {this.state.pricePP !== 0 && (
              <b>
                {" "}
                Total Price (€):{" "}
                {this.state.pricePP * this.state.numOfGuests +
                  (this.state.isDJChecked ? 300: 0) +
                  (this.state.isFlowersChecked ? 200:0) +
                  (this.state.isBandChecked ? 200: 0)}{" "}
              </b>
            )}
            <br /> <br />
            <span
              style={{
                fontWeight: "bold",
                color: "red"
              }}
            >
              {!this.state.isEventDateValid && this.state.formErrors.eventDate}
              {!this.state.isNumOfGuestsValid &&
                this.state.formErrors.numOfGuests}
              {!this.state.isContactValid && this.state.formErrors.contact}
              {!this.state.isPhoneValid && this.state.formErrors.phone}
              {!this.state.isEmailValid && this.state.formErrors.email}
            </span>
          </div>
          <div className="btn_container">
            <br />
            <button
              type="submit"
              disabled={!this.state.isformValid}
              onClick={this.submitButtonClick}
            >
              submit
            </button>


          </div>
        </form>
      </div>
    );
  }
}

export default AddWedding;
