import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class BabyShower extends Component {
  // our App constructor - with some state variables.
  constructor(props) {
    super(props);
    this.state = {
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
          place: "Cork Ballroon Hotel",
          maxNumberofGuests: 40,
          city: "Dublin",
          price: 370
        }
      ]
    };
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  // Event handler for the drop-down-list
  handleThemeChange(event) {
    // We assign the value of the event
    // The event is what is 'selected' from the list. This action
    // is an event.
    this.setState({ myChoice: event.target.value });
  }
  handleListChange(event) {
    // We assign the value of the event
    // The event is what is 'selected' from the list. This action
    // is an event.
    this.setState({ myChoice1: event.target.value });
  }

  // we'll use a callback to sort the deserts in our array
  // we have used sort number of times now.
  // Use upper case for case-insensitive sorting
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
  handleDateChange(theDate) {
    this.setState({ isSelected: true });
    this.setState({ selectedDate: theDate });
  }
  isFuture() {
    return this.state.selectedDate > new Date();
  }

  render() {
    return (
      <div className="Baby Shower">
        <header>
          <div class="header">Baby Shower</div>
        </header>
        <hr />
        <div class="frame6">
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
            <h4>
              You have choosen: {this.state.selectedDate.toString()}
              <br />
            </h4>
          )}
          <hr />

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
          </form>

          {this.state.myChoice && (
            <h4>
              Your choice: {this.state.myChoice}
              <br />
            </h4>
          )}

          <hr />
          <form>
            Pick a venue:
            <br />
            <select onChange={this.handleListChange}>
              {this.state.BabyShowerLoc.sort(this.sortDeserts).map((i, key) => (
                <option key={key}>
                  {i.place} €{i.price} MaxN°ofGuests {i.maxNumberofGuests} city:{" "}
                  {i.city}
                </option>
              ))}
            </select>
          </form>
          {this.state.myChoice && <h4>Your choice: {this.state.myChoice1}</h4>}
        </div>
      </div>
    );
  }
}
export default BabyShower;
