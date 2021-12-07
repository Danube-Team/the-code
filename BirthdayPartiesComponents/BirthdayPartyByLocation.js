import React, { Component } from "react";
import "./styles.css";

class BirthdayPartyByLocation extends Component {
  constructor(props) {
    super(props);
    console.log("In the constructor BirthdayPartyByLocation comp");

    this.state = {
      allPackages: [],
      isFetched: false,
      errorMsg: null,
      searchTerm: "",
      checked: false
    };
    this.onChangeSearchBox = this.onChangeSearchBox.bind(this);
    this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
  }
  async componentDidMount() {
    try {
      const API_URL =
        "https://raw.githubusercontent.com/Patularu/CS385_project/main/birthdayPartyPackages.json";
      const response = await fetch(API_URL);
      const jsonResult = await response.json();
      this.setState({ allPackages: jsonResult.availablePackages });
      this.setState({ isFetched: true });
    } catch (error) {
      this.setState({ isFetched: false });
      this.setState({ errorMsg: error });
    }
  }

  onChangeSearchBox(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleChangeCheckBox(event) {
    if (this.state.checked === false) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
  }

  render() {
    if (this.state.errorMsg) {
      return (
        <div className="error">
          <h3>We're very sorry: An error has occured in the API call</h3>
          <p>The error message is: {this.state.errorMsg.toString()}</p>
        </div>
      );
    } else if (this.state.isFetched === false) {
      return (
        <div className="error">
          <h3>We are loading your API request....</h3>
          <p>Your data will be here very soon....</p>
        </div>
      );
    } else {
      return (
        <div>
          <div class="frame6">
            <input
              type="checkbox"
              checked={this.state.checked}
              onChange={this.handleChangeCheckBox}
            />
            Show kids party packages
          </div>

          <div class="frame6">
            <SearchForm
              currentSearchTerm={this.state.searchTerm}
              onChange={this.onChangeSearchBox}
            />
            <SearchLocationResults
              globalPackagesArray={this.state.allPackages}
              resultssearchTerm={this.state.searchTerm}
              kidsCheckBox={this.state.checked}
            />
          </div>
        </div>
      );
    }
  }
}

class SearchForm extends Component {
  render() {
    const localCurrentsearchTerm = this.props.searchTerm;
    const localOnChangeLocation = this.props.onChange;

    return (
      <div className="SearchForm">
        <h4>Packages by Location</h4>

        <h6>
          Enter the main city for your area, like Athlone, Dublin, Galway,
          Swords, Maynooth{" "}
        </h6>

        <form>
          <input
            type="text"
            value={localCurrentsearchTerm}
            onChange={localOnChangeLocation}
          />
        </form>
      </div>
    );
  }
} // close the SearchForm component
//**************************************************//
class SearchLocationResults extends Component {
  locationFilterFunction(searchTerm, kidsCheckBox) {
    return function (pack) {
      let location = pack.location.toUpperCase();

      if (kidsCheckBox === true) {
        if (pack.kids === "Yes") {
          if (searchTerm !== "" && location === searchTerm.toUpperCase())
            return pack;
        }
      } else if (
        pack.kids === "no" &&
        searchTerm !== "" &&
        location === searchTerm.toUpperCase()
      ) {
        return pack;
      }
    };
  }

  render() {
    const localGlobalArray = this.props.globalPackagesArray;
    const localsearchTerm = this.props.resultssearchTerm;
    const localKidsCheckBox = this.props.kidsCheckBox;

    return (
      <div className="SearchLocationResults">
        <hr />
        {localGlobalArray
          .filter(
            this.locationFilterFunction(localsearchTerm, localKidsCheckBox)
          )
          .map((p) => (
            <div key={p.id}>
              <hr />
              <b>{p.location}</b>, <i>{p.theme}</i> , Price per person{" "}
              <b>{p.pricePerPerson}</b>, Maximum number of persons{" "}
              <b>{p.maxPersons}</b>, The package includes: <i>{p.includes}</i>
            </div>
          ))}
      </div>
    );
  }
}

export default BirthdayPartyByLocation;

