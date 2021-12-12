import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import datepicker to insert a calenders
import { MeetingVenue } from "./MeetingVenues";
import { MeetingType } from "./MeetingVenues";
import { location } from "./MeetingVenues";
import { Cater } from "./MeetingVenues";
// impotred four arrays" MeetingVenue,MeetingType, location, Cater " from the same file "MeetingVenues"

const localLocation = location;
//initialise the location array
const localMeetingLocation = MeetingVenue;
//initialise the MeetingVenue array
const localMeetingType = MeetingType;
//initialise the MeetingVenue array
const localCater = Cater;
//initialise the MeetingVenue array
class Meeting extends Component {
  // my Meeting class
  constructor(props) {
    super(props);
    this.state = {
      organiser: "",
      meetingTitle: "",
      formErrors: {
        organiser: "",
        meetingTitle: "",
        startDate: ""
        
      },
      organiserNameValid: false,
      meetingTitleValid: false,
      selectedStartDate: new Date(),
      isStartSelected: false,
      localVenue: localLocation,
      myVenueChoice: null,
      isVenueValid: false,
      meetingLocation: localMeetingLocation,
      myMeetingLocationChoice: null,
      isMeetingLocationValid: false,
      meetingTypeArray: localMeetingType,
      myMeetingTypeChoice: null,
      isMeetingTypeValid: false,
      caterArray: localCater,
      meetingBasket: [],
      chosenPackage: null,
      formValid: false,
      packageAdded: false
    };
    // All the variables that I need to change their values in my programe

    this.handleOrganiserBox = this.handleOrganiserBox.bind(this);
    this.handleMeetingTitleBox = this.handleMeetingTitleBox.bind(this);
    this.handleChosenStartDate = this.handleChosenStartDate.bind(this);
    this.handleVenueList = this.handleVenueList.bind(this);
    this.handleMeetingLocationList = this.handleMeetingLocationList.bind(this);
    this.handleMeetingTypeList = this.handleMeetingTypeList.bind(this);
    this.addToMeetingBasket = this.addToMeetingBasket.bind(this);
    this.removePackage = this.removePackage.bind(this);
    this.submitButtonClick = this.submitButtonClick.bind(this);
    // to bind the functions with the input fields or with the dropdown list
  } // the end of the constructor
  handleOrganiserBox(event) {
    this.setState({ organiser: event.target.value });
    this.validateOrganizerBox(event.target.value);
    // this function handles the first input field which is the organizer name will be put in.
    // it takes the value that the user entered, using "event.target.value", and makes it the value for "organiser" variable using setState()
  }
  validateOrganizerBox(organiser) {
    let localFormErrors = this.state.formErrors;
    if (organiser.length < 6) {
      localFormErrors.organiser = "This name is too short";
    } else if (!isNaN(organiser)) {
      // isNAN() checks that the value is not a number. Here with ! (not), it means that if the value is number
      localFormErrors.organiser = "Please enter a valid name";
    } else {
      localFormErrors.organiser = "";
      this.setState({ organiserNameValid: true });
      this.validateForm();
    }
  } // this function's job is to make sure that the user enter a valid name
  // also has a role in validating the whole form

  handleMeetingTitleBox(event) {
    this.setState({ meetingTitle: event.target.value });
    this.validateMeetingTitleBox(event.target.value);
  } // this function handles the second input field which is the meeting title.
  // it takes the value that the user entered, using "event.target.value", and makes it the value for "meetingTitle" variable using setState()
  // also has a role in validating the whole form

  validateMeetingTitleBox(title) {
    let localFormErrors = this.state.formErrors;
    if (title.length > 60) {
      localFormErrors.meetingTitle =
        "This title is too long, Maximum letters allawed are 60";
        //here "if" statment checks the length of the text that the user entered and accepts only the text if its length less than 60 charachters 
    } else {
      localFormErrors.meetingTitle = "";
      this.setState({ meetingTitleValid: true });
    }
  } // this function's job is to make sure that the user enter a not too long title

  handleChosenStartDate(theDate) {
    let localFormErrors = this.state.formErrors;
    if (theDate < new Date()) {
      localFormErrors.startDate =
        "This Date is not valid, please chose date in the future";
    } else {
      localFormErrors.startDate = "";
      this.setState({ isStartSelected: true });
      this.setState({ selectedStartDate: theDate });
    }
  } // this function allow the user to inesrt the starting datae of the meeting
  // and also makes sure that the date is in the future
  

  handleVenueList(event) {
    this.setState({ myVenueChoice: event.target.value });
    this.setState({ isVenueValid: true });
    this.validateForm();
  } // this function changes "myVenueChoise" variable with the value that the user chose from the dropdown list
  // also has a role in validating the whole form

  handleMeetingTypeList(event) {
    this.setState({ myMeetingTypeChoice: event.target.value });
    this.setState({ isMeetingTypeValid: true });
    this.validateForm();
  } // this function changes "myMeetingTyprChoise" variable with the value that the user chose from the dropdown list
  // also has a role in validating the whole form

  handleMeetingLocationList(event) {
    this.setState({ myMeetingLocationChoice: event.target.value });
    this.setState({ isMeetingLocationValid: true });
    this.validateForm();
  }
  // this function changes "myMeetingLocationChoise" variable with the value that the user chose from the dropdown list
  // also has a role in validating the whole form
 

  sortMeetingLocationPrices(Aprice, Bprice) {
    let comparison = 0;

    if (Aprice.price > Bprice.price) comparison = 1;
    else if (Aprice.price < Bprice.price) comparison = -1;
    else comparison = 0;

    return comparison;
  } // this function sorts the price of meetig places in "meetingLocation" array in ascending order

  searchByMeetingType(meetingType) {
    return function (meeting) {
      return meeting.type === meetingType;
    };
  } //this function is used with filter method to return all the metting loctaions
  //depending on the meeting type that the user choose

  searchByMeetingVenue(city) {
    return function (meeting) {
      return meeting.city === city;
    };
  } //this function is used with filter method to return all the metting loctaions depending on the city that the user choose

  findChoiceByID(iD) {
    return function (object) {
      return object.id === iD;
    };
  } // this function finds the object by its ID Which we use in the next function
  addToMeetingBasket(choiceID) {
    let foundObj = this.state.caterArray.filter(this.findChoiceByID(choiceID));
    this.setState({ meetingBasket: this.state.meetingBasket.concat(foundObj) });
    this.setState({ packageAdded: true });
  } //this function uses filter function to get the only object that we want
  //and then uses concat function to add a copy of the object to a new array "meetingBasket"

  removePackage(indexToRemove) {
    if (this.state.meetingBasket.length > 0) {
      let tempBasket = this.state.meetingBasket;
      tempBasket.splice(indexToRemove, 1);
      this.setState({ meetingBasket: tempBasket });
      this.setState({ packageAdded: false });
    }
  }//this function job is to remove the package that the user chose if he cliked on "remove" button
  // and re set "packageAdded" variable to false again which actives the "add" buttons again so the user can chose another package

  validateForm() {
    this.setState({
      formValid:
        this.state.organiserNameValid &&
        // this.state.isMeetingLocationValid //&&
        // this.state.isMeetingTypeValid &&
        this.state.isVenueValid
    });
    // this function checks if these values are true then the "formValid" variable will be true as well
    // if "formValid" is true, the submit butto will be active as the user filled all the required fields. Otherwise the submit button will remail desibeld
  }
  submitButtonClick() {
    console.log(this.state.organiser);
    console.log(this.state.myVenueChoice);
    console.log(this.state.myMeetingTypeChoice);
    console.log(this.state.myMeetingLocationChoice);
  } // the function that will make the action after the user clicking on the submit button

  render() {
    const title= this.props.title;
    return (
      <div className="Meeting">
        <header>
          <div class="header">{title}</div>
        </header>
        <hr />
        <div class="frame6">
          <form>
            <label>by:</label>
            <input
              type="text"
              value={this.state.organiser}
              placeholder="The organiser"
              onChange={this.handleOrganiserBox}
            ></input>
          </form>
          <br />
          {this.state.formErrors.organiser && (
            <div class="error">
              {this.state.formErrors.organiser}
              <br />
              <br />
            </div>
          )}
          <form>
            <label>Meeting title:</label>
            <input
              type="text"
              placeholder="optional"
              value={this.state.meetingTitle}
              onChange={this.handleMeetingTitleBox}
            ></input>
          </form>
          <br />
          {this.state.formErrors.meetingTitle && (
            <div>{this.state.formErrors.meetingTitle}</div>
          )}
          <form>
            <label> Meeting date:</label>
            <DatePicker
              dateFormat="MMMM d, yyyy"
              closeOnScroll={true}
              selected={this.state.selectedStartDate}
              onChange={this.handleChosenStartDate}
            />
          </form>
          <br />
          {this.state.formErrors.startDate && (
            <div>
              {this.state.formErrors.startDate}
              <br />
            </div>
          )}
          
        
          <div>
            <form key="22">
              <label>Meeting Type:</label>
              <select onChange={this.handleMeetingTypeList}>
                <option selected value="" disabled="disabled">
                  choose
                </option>
                {this.state.meetingTypeArray.map((t, i) => (
                  <option key={i} value={t.type}>
                    {" "}
                    {t.type}{" "}
                  </option>
                ))}
              </select>
            </form>
            <br />

            <form>
              <label>City:</label>
              <select onChange={this.handleVenueList}>
                <option selected value="" disabled="disabled">
                  choose
                </option>
                {this.state.localVenue.map((p, key) => (
                  <option key={key} value={p.loc}>
                    {" "}
                    {p.loc}{" "}
                  </option>
                ))}
              </select>
            </form>

            <div>
              <br />
              {this.state.myVenueChoice && (
                <form key="23">
                  <label>Please choose your preferable location:</label>
                  <select onChange={this.handleMeetingLocationList}>
                    <option selected value="" disabled="disabled">
                      choose
                    </option>
                    {this.state.meetingLocation
                      .filter(
                        this.searchByMeetingType(this.state.myMeetingTypeChoice)
                      )
                      .filter(
                        this.searchByMeetingVenue(this.state.myVenueChoice)
                      )
                      .sort(this.sortMeetingLocationPrices)
                      .map((a, i) => (
                        <option key={i}>
                          {" "}
                          {a.place} | costs €{a.price} per day | MaxNo.OfGuests{" "}
                          {a.maxNumberOfGuests}
                        </option>
                      ))}
                  </select>
                </form>
              )}

              {this.state.myMeetingLocationChoice && (
                <div class="frame6">
                  {" "}
                  If you would like to add one package of these please press
                  "add"
                  <br/>
                  * please note you can add just <b>one</b> package
                  <br />
                  <br />
                  {this.state.caterArray.map((c, i) => (
                    <li key={i}>
                      {c.package} €{c.price} per person{" "}
                      <button
                        type="add"
                        onClick={() => this.addToMeetingBasket(c.id)}
                        disabled={this.state.packageAdded}
                      >
                        add
                      </button>
                      <br />
                    </li>
                    
                  ))}
                  <br/>
                  <br/>
                  <br/>
                </div>
                
              )}
              
            </div>

            {this.state.organiser && (
              <div id="big-margin">
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                <hr />
                <h2>Meeting Details</h2>
                <br />
                <br />
                {this.state.organiser && (
                  <div class="feedback">
                    <b> The organiser of the meeting is: </b>
                    {this.state.organiser}
                    <br />
                    <br />
                  </div>
                )}
                {this.state.meetingTitle && (
                  <div class="feedback">
                    <b> The tilte of the meeting is: </b>{" "}
                    {this.state.meetingTitle}
                    <br />
                    <br />
                  </div>
                )}
                {this.state.selectedStartDate && (
                  <div class="feedback">
                    <b> The meeting starting date is: </b>
                    {this.state.selectedStartDate.toLocaleDateString()}
                    <br />
                    <br />
                  </div>
                )}
                {this.state.myMeetingTypeChoice && (
                  <div class="feedback">
                    <b> The meeting type is: </b>
                    {this.state.myMeetingTypeChoice}
                    <br />
                    <br />
                  </div>
                )}
                {this.state.myVenueChoice && (
                  <div class="feedback">
                    <b> In the city of: </b> {this.state.myVenueChoice}
                    <br />
                    <br />
                  </div>
                )}
                {this.state.myMeetingLocationChoice && (
                  <div class="feedback">
                    <b>The meeting will be held in: </b>
                    {this.state.myMeetingLocationChoice}
                    <br />
                    <br />
                  </div>
                )}
                {this.state.meetingBasket.length > 0 && (
                  <div class="feedback">
                    <h3> Added package</h3>
                    <br />
                    <br />
                    <ul>
                      {this.state.meetingBasket.map((m, i) => (
                        <li key={i}>
                          <b>Your package choice is:</b>
                          <br />
                          {m.package} (with additional cost €{m.price} per
                          person)
                          <br />
                          <br />
                          If you want to clear your package choice please press
                          "remove"
                          <button onClick={this.removePackage}>remove</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <br />
          </div>

          <div class="frame4">
            <button
              type="submit"
              disabled={!this.state.formValid}
              onClick={this.submitButtonClick}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Meeting;
