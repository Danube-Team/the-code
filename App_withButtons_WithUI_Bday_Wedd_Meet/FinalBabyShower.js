import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BabyShowerPhoto from "./images/BabyShower.jpg";
import ReactFormValidation from "react-form-input-validation";

//fuction to alert when the right email has been inserted
function clickMe() {
  //source code react js
  alert("Your booking has been send to your email");
}
//const method for default email
const emailState = {
  email: "",
  error: ""
};

class BabyShower extends Component {
  // BabyShower constructor divided into:
  //a)required constructors for the mother's textbox
  //b) checkbox
  //c)type of choices
  //d)date(selected date and is selected)
  //e)theme array
  //f)venue array categorized into id, place, maximum numbers of guests, city and prices

  constructor(props) {
    super(props);
    this.state = {
      mother: "",
      outputError: { mother: " " },
      motherNameValid: false,
      formValid: false,
      fields: {
        gender: ""
      },
      errors: {},
      value: "",
      emailState,
      myChoice: null,
      myChoice1: null,
      selectedDate: new Date(),
      isSelected: false,
      BabyShowerTheme: [
        { type: "Jungle" },
        { type: "Fairies" },
        { type: "Minimalistic" },
        { type: "In the nature" }
      ],
      BabyShowerLoc: [
        {
          id: "1",
          place: "Medley-Private Dining & Party Venue",
          maxNumberofGuests: 50,
          city: "Dublin",
          price: 300
        },
        {
          id: "2",
          place: "Polka Dot Events",
          maxNumberofGuests: 100,
          city: "Dublin",
          price: 400
        },
        {
          id: "3",
          place: "Claire Hanley",
          maxNumberofGuests: 200,
          city: "Dublin",
          price: 350
        },
        {
          id: "4",
          place: "The Drawing Room",
          maxNumberofGuests: 150,
          city: "Cork",
          price: 350
        },
        {
          id: "5",
          place: "The Blue Room",
          maxNumberofGuests: 70,
          city: "Cork",
          price: 450
        },
        {
          id: "6",
          place: "Cork Ballroom Hotel",
          maxNumberofGuests: 40,
          city: "Cork",
          price: 370
        },
        {
          id: "7",
          place: "The House Hotel",
          maxNumberofGuests: 50,
          city: "Galway",
          price: 150
        },
        {
          id: "8",
          place: "Inis Mor Ballroom",
          maxNumberofGuests: 150,
          city: "Galway",
          price: 200
        },
        {
          id: "9",
          place: "The Lettermore Suit",
          maxNumberofGuests: 200,
          city: "Galway",
          price: 450
        }
      ]
    };
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleOrganiserChange = this.handleOrganiserChange.bind(this);
    this.handleMotherBox = this.handleMotherBox.bind(this);
    this.form = new ReactFormValidation(this, { locale: "en" });
    this.form.useRules({
      gender: "required"
    });
  }
  //end of constructor
  //event for mother textbox
  handleMotherBox(event) {
    // the value assigned of the mother checkbox
    // The event is what is 'selected' from the list. This action
    // is an event.
    this.setState({ mother: event.target.value });
    //before output the textbox the checkbox will be checked
    //to evaluate that the appropriate textbox has been inserted
    this.validateMotherBox(event.target.value);
  }
  //validate method to check the value of mother textbox
  validateMotherBox(mother) {
    let localoutputErrors = this.state.outputError;
    if (mother.length < 5) {
      localoutputErrors.mother = "Name is too short";
    } else if (!isNaN(mother)) {
      localoutputErrors.mother = "Invalid name";
    } else {
      localoutputErrors.mother = "Mother's name: " + mother;
      this.setState({ organiserNameValid: true });
      this.validateForm();
    }
  }
  //method to validate the mother textbox
  validateForm() {
    this.setState({ formValid: this.state.motherNameValid });
  }

  // Event handler for the theme drop-down-list
  handleThemeChange(event) {
    // the value assigned of the theme
    // The event is what is 'selected' from the list. This action
    // is an event.
    this.setState({ myChoice: event.target.value });
  }
  //Event handler for the venue drop-down-list
  handleListChange(event) {
    // the value assigned of the venue
    // The event is what is 'selected' from the list. This action
    // is an event.
    this.setState({ myChoice1: event.target.value });
  }
  //Event handler for the date picker
  handleDateChange(theDate) {
    this.setState({ isSelected: true });
    this.setState({ selectedDate: theDate });
  }
  // callback use to sort the respective features in the array
  sortTheme(dx, dy) {
    let DX = dx.type.toUpperCase();
    let DY = dy.type.toUpperCase();
    if (DX > DY) return 1;
    else if (DX < DY) return -1;
    else return 0;
  }
  sortLocate(dx, dy) {
    let DX = dx.BabyShowerLoc;
    let DY = dy.BabyShowerLoc;
    if (DX > DY) return 1;
    else if (DX < DY) return -1;
    else return 0;
  }

  isFuture() {
    return this.state.selectedDate > new Date();
  }
  handleOrganiserChange(event) {
    this.setState({ value: event.target.value });
  }

  //keeps on checking the email until the right has been inserted
  handleEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  //method for email checker
  emailValidation() {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!this.state.email || regex.test(this.state.email) === false) {
      this.setState({
        error: "Email is not valid"
      });
      return false;
    }
    return true;
  }
  //methos for submit button
  onSubmit() {
    if (this.emailValidation()) {
      console.log(this.state);
      this.setState(clickMe);
    }
  }
  //output respectively an image to represent the baby shower section,
  //a frame for the date, mother's name, gender selection, theme and venue,
  //after that all options has been selected, the user will be prompt to insert a valid email and press a submit button
  render() {
    return (
      <div className="Baby Shower">
        <header>
          <div class="header">Baby Shower</div>
        </header>
        <hr />
        <div class="frame1">
          <img src={BabyShowerPhoto} alt="logo" />
        </div>
        <hr />
        <div className="frame6">
          <form>
            Please choose a date:{" "}
            <div className="form-group">
              <DatePicker
                dateFormat="MMMM d, yyyy"
                closeOnScroll={true}
                selected={this.state.selectedDate}
                onChange={this.handleDateChange}
              />
            </div>
          </form>
          {this.state.isSelected && (
            <div class="feedback">
              <b>Your date and time: </b>
              <i>
                {this.state.selectedDate.toString()}
                <br />
              </i>
            </div>
          )}
        </div>
        <div className="frame6">
          <form>
            Insert mother's name:
            <input
              type="text"
              value={this.state.mother}
              placeholder="mother's name"
              onChange={this.handleMotherBox}
            ></input>
          </form>
          {this.state.outputError.mother && (
            <div class="feedback">
              <i>{this.state.outputError.mother}</i>
            </div>
          )}
        </div>
        <div className="frame6">
          <form>
            Select your baby gender
            <p>
              <label className="choice">
                {" "}
                <input
                  type="radio"
                  name="gender"
                  onChange={this.form.handleChangeEvent}
                  value="Male"
                />{" "}
                Male{" "}
              </label>
            </p>
            <p>
              <label className="choice">
                {" "}
                <input
                  type="radio"
                  name="gender"
                  onChange={this.form.handleChangeEvent}
                  value="Female"
                />{" "}
                Female{" "}
              </label>
            </p>
            <label className="error">
              {this.state.errors.gender ? this.state.errors.gender : ""}
            </label>
          </form>
        </div>
        <div className="frame6">
          <form>
            Pick a theme:
            <br />
            <select onChange={this.handleThemeChange}>
              {this.state.BabyShowerTheme.sort(this.sortTheme).map(
                (theme, key) => (
                  <option key={key} value={theme.type}>
                    {theme.type}
                  </option>
                )
              )}
            </select>
            <h3> </h3>
          </form>
          {this.state.myChoice && (
            <div class="feedback">
              <b>Your chosen theme: </b>
              <i>{this.state.myChoice}</i>
              <br />
            </div>
          )}
        </div>
        <div className="frame6">
          <form>
            Pick a venue:
            <br />
            <select onChange={this.handleListChange}>
              {this.state.BabyShowerLoc.sort(this.sortLocate).map((i, key) => (
                <option key={key}>
                  {i.place} €{i.price} Max N° of Guests {i.maxNumberofGuests}{" "}
                  city: {i.city}
                </option>
              ))}
            </select>
          </form>
          {this.state.myChoice && (
            <div class="feedback">
              <b>Your venue: </b>
              <i>{this.state.myChoice1}</i>
              <br />
              <hr />
              <div>
                <form>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleEmail}
                  />
                  <span className="text-danger">{this.state.error}</span>
                </form>
                <hr />
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-dark"
                    onClick={() => this.onSubmit(clickMe)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BabyShower;

