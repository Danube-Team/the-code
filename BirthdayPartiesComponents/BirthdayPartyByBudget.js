import React, { Component } from "react";
import "./styles.css";

class BirthdayPartyByBudget extends Component {
  constructor(props) {
    super(props);
    console.log("In the constructor BirthdayPartyByBudget comp");
    this.state = {
      allPackages: [],
      isFetched: false,
      errorMsg: null,
      choice: "",
      options: [
        { id: "0", option: "None" },
        { id: "1", option: "Under 50" },
        { id: "2", option: "50 to 100" },
        { id: "3", option: "100 to 120" },
        { id: "4", option: "120 to 150" },
        { id: "5", option: "Above 150" }
      ],
      checked: false
    };

    this.onSelectDropDown = this.onSelectDropDown.bind(this);
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

  onSelectDropDown(event) {
    this.setState({ choice: event.target.value });
  }

  budgetFilterFunction(searchTerm, kids) {
    return function (pack) {
      let price = pack.pricePerPerson;
      if (kids === true) {
        if (pack.kids === "Yes") {
          if (searchTerm === "Under 50" && price < 50) return pack;
          if (searchTerm === "50 to 100" && price >= 50 && price <= 100)
            return pack;
          if (searchTerm === "100 to 120" && price >= 100 && price <= 120)
            return pack;
          if (searchTerm === "120 to 150" && price >= 120 && price <= 150)
            return pack;
          if (searchTerm === "Above 150" && price > 150) return pack;
        }
      }
      if (kids === false) {
        if (pack.kids === "no") {
          if (searchTerm === "Under 50" && price < 50) return pack;
          if (searchTerm === "50 to 100" && price >= 50 && price <= 100)
            return pack;
          if (searchTerm === "100 to 120" && price >= 100 && price <= 120)
            return pack;
          if (searchTerm === "120 to 150" && price >= 120 && price <= 150)
            return pack;
          if (searchTerm === "Above 150" && price > 150) return pack;
        }
      }
    };
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
            <div className="DropDown">
              <h4>Packages by Budget Range</h4>

              <h6> Select your budget range (price per person)</h6>
              <form>
                <select onChange={this.onSelectDropDown}>
                  {this.state.options.map((p) => (
                    <option key={p.id} value={p.option}>
                      {p.option}
                    </option>
                  ))}
                </select>
              </form>
              <hr />

              {this.state.allPackages
                .filter(
                  this.budgetFilterFunction(
                    this.state.choice,
                    this.state.checked
                  )
                )
                .map((p) => (
                  <div key={p.id}>
                    <hr />
                    <b>{p.location}</b>, <i>{p.theme}</i> , Price per person{" "}
                    <b>{p.pricePerPerson}</b>, Maximum number of persons{" "}
                    <b>{p.maxPersons}</b>, The package includes:{" "}
                    <i>{p.includes}</i>
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default BirthdayPartyByBudget;

