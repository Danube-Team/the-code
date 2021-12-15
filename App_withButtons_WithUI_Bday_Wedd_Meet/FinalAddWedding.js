import React, { Component } from "react";
import validator from "validator";
import weddingPhoto from "./wedding.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

function isNumeric(num) {
  return !isNaN(num);
}

class AddWedding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // initialize all variables for states
      eventDate: new Date(),
      numOfGuests: 0,
      localVenueList: [],
      venue: "",
      contact: "",
      phone: "",
      email: "",
      comments: "",
      isDJChecked: false,
      isBandChecked: false,
      isFlowersChecked: false,
      pricePP: 0,

      // used for fetching json file on github
      isFetched: false,
      errorMsg: null,

      // object store error messages
      formErrors: {
        eventDate: "",
        numOfGuests: "",
        venue: "",
        contact: "",
        phone: "",
        email: ""
      },
      // flags validating each input
      isContactValid: false,
      isEventDateValid: false,
      isVenueValid: false,
      isPhoneValid: false,
      isNumOfGuestsValid: false,
      isEmailValid: false,
      isformValid: false,
      //array to store user inputs
      weddingArray: [
        {
          id: 1,
          eventDate: "",
          numOfGuests: "",
          venue: "",
          contact: "",
          phone: "",
          email: "",
          totalPrice: 0
        }
      ]
    };

    // bind for event handlers
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

  // store input to an array - refresh array every time submit is clicked
  submitButtonClick(event) {
    let newArray = [
      {
        id: 1,
        eventDate: this.state.eventDate,
        numOfGuests: this.state.numOfGuests,
        venue: this.state.venue,
        contact: this.state.contact,
        phone: this.state.phone,
        email: this.state.email,
        //calculate and store total price for selections
        totalPrice:
          this.state.pricePP * this.state.numOfGuests +
          (this.state.isDJChecked ? 300 : 0) +
          (this.state.isFlowersChecked ? 200 : 0) +
          (this.state.isBandChecked ? 200 : 0)
      }
    ];

    this.state.weddingArray.splice(0, 1); // remove existing data in the array
    this.state.weddingArray.push(newArray); // push new details to the array
    console.log(this.state.weddingArray); // print contents of the array to console
  }

  // fetch venue details from github where json file is stored
  async componentDidMount() {
    try {
      const API_URL =
        "https://raw.githubusercontent.com/MincyS/CS385-Project/main/venueList.json";
      const response = await fetch(API_URL);
      const jsonResult = await response.json();
      this.setState({ localVenueList: jsonResult.venueList });
      this.setState({ isFetched: true });
    } catch (error) {
      this.setState({ isFetched: false });
      this.setState({ errorMsg: error });
    }
  }

  // store and validate user input
  handleEventDate(eventdt) {
    this.setState({ eventDate: eventdt });
    this.validateEventDate(eventdt);
  }

  validateEventDate(eventDate) {
    let localFormErrors = this.state.formErrors;

    if (!(eventDate > new Date())) {
      localFormErrors.eventDate = "Event date should be greater than today";
      this.setState({ isEventDateValid: false });
    } else {
      localFormErrors.eventDate = "";
      this.setState({ isEventDateValid: true });
    }
    this.setState({ formErrors: localFormErrors });
    this.validateForm(); // validate form
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
    // store selected venue name
    this.setState({
      venue: this.state.localVenueList[e.target.value - 1].venuename
    });
    this.setState({ isVenueValid: true });

    this.setState({
      pricePP: this.state.localVenueList[e.target.value - 1].pricepp
    });
    this.validateForm();
  }

  handleContactChange(event) {
    this.setState({ contact: event.target.value });
    this.validateContact(event.target.value);
  }

  validateContact(contact) {
    let localFormErrors = this.state.formErrors;
    if (contact.length < 4) {
      // check if minimum 4 characters are input by user
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
    // check for length and numeric only values for user input
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
    // used external dependency for validating email input
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

  // validate entire form
  validateForm() {
    this.setState({
      isformValid:
        this.state.isContactValid &&
        this.state.isEventDateValid &&
        this.state.isNumOfGuestsValid &&
        this.state.isPhoneValid &&
        this.state.isEmailValid
    });
  }

  render() {
    const title= this.props.title;

    return (
      <div>
        <header>
          <div class="header">{title}</div>
        </header>
        <hr />
        <div class="frame4">
          <img src={weddingPhoto} alt="logo" />
        </div>
        <div class="frame6">
          <h4> Create a Wedding Event</h4>
          <div className="input_container">
            <form>
              <label>Event Date</label>
              <DatePicker
                dateFormat="MMMM d, yyyy"
                closeOnScroll={true}
                selected={this.state.eventDate}
                onChange={this.handleEventDate}
              />
            </form>
            <br />
            <form>
              <label>
                Guests &nbsp;
                <input
                  type="number"
                  placeholder="Enter number of guests"
                  value={this.state.numOfGuests}
                  onChange={(e) => this.handlenumOfGuests(e)}
                />
              </label>
            </form>
            <br />
            <form>
              <label>
                Venue (Capacity) &nbsp;
                <select onChange={(e) => this.handleVenueChange(e)}>
                  {this.state.localVenueList.map((v, index) => (
                    <option key={v.id} value={v.id}>
                      {v.venuename} - ({v.capacity})
                    </option>
                  ))}
                </select>
              </label>
            </form>
            <br />
            <form>
              <label>
                Contact Name &nbsp;
                <input
                  type="text"
                  placeholder="Provide a Contact Name"
                  value={this.state.contact}
                  onChange={(e) => this.handleContactChange(e)}
                />
              </label>
            </form>
            &nbsp; &nbsp; &nbsp;
            <br />
            <form>
              <label>
                Phone &nbsp;
                <input
                  type="text"
                  placeholder="Contact Phone/Mobile"
                  value={this.state.phone}
                  onChange={(e) => this.handlePhoneChange(e)}
                />
              </label>
            </form>
            &nbsp; &nbsp;
            <form>
              <label>
                Email &nbsp;
                <input
                  type="text"
                  placeholder="Email ID"
                  value={this.state.email}
                  onChange={(e) => this.handleEmailChange(e)}
                />
              </label>
            </form>
            <br />
            <form>
              <div class="frame4">
                <b>Others</b>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => this.handleFlowersCheckbox(e)}
                    defaultChecked={this.state.isFlowersChecked}
                  />
                  Flowers
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="DJ"
                    onChange={(e) => this.handleDJCheckbox(e)}
                    defaultChecked={this.state.isDJChecked}
                  />
                  DJ
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => this.handleBandCheckbox(e)}
                    defaultChecked={this.state.isBandChecked}
                  />
                  Band
                </label>
              </div>
            </form>
            <br /> <br />
            <form>
              <label>
                {" "}
                Special Requirements &nbsp;
                <textarea
                  placeholder="Special notes if any"
                  value={this.state.comments}
                  onChange={(e) => this.handleCommentEvent(e)}
                />
              </label>
            </form>
            <br /> <br />
            {/* Conditional rendering of total price 
                once the venue is selected pricepp is set
            */}
            {this.state.pricePP !== 0 && (
              <b>
                {" "}
                Total Price (€):{" "}
                {this.state.pricePP * this.state.numOfGuests +
                  (this.state.isDJChecked ? 300 : 0) +
                  (this.state.isFlowersChecked ? 200 : 0) +
                  (this.state.isBandChecked ? 200 : 0)}{" "}
              </b>
            )}
            {/* inline style for displaying error messages 
                 for invalid input when validation fails
            */}
            <div
              style={{
                fontWeight: "bold",
                color: "red",
                textAlign: "left"
              }}
            >
              {!this.state.isEventDateValid && this.state.formErrors.eventDate}
              {!this.state.isNumOfGuestsValid &&
                this.state.formErrors.numOfGuests}
              {!this.state.isContactValid && this.state.formErrors.contact}
              {!this.state.isPhoneValid && this.state.formErrors.phone}
              {!this.state.isEmailValid && this.state.formErrors.email}
            </div>
            <br />
            <br />
          </div>
          <div className="frame4">
            <br />
            <button
              type="submit"
              disabled={!this.state.isformValid}
              onClick={this.submitButtonClick}
            >
              Submit
            </button>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default AddWedding;
