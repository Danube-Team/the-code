import React, { Component } from "react";
import "react-inputs-validation/lib/react-inputs-validation.min.css";



class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      name: "",
      email: "",
      password: "",
      passwordConf: "",
      formErrors: {
        name: "",
        email: "",
        phone: "",
        password: ""
      },
      nameValid: false,
      emailValid: false,
      phoneValid: false,
      passwordValid: false,
      formValid: false
    }; // All the variables that I need to change their values in my programe
    this.handleNameBox = this.handleNameBox.bind(this);
    this.handlePhoneBox = this.handlePhoneBox.bind(this);
    this.handleEmailBox = this.handleEmailBox.bind(this);
    this.handlePasswordBox = this.handlePasswordBox.bind(this);
    this.submitButtonClick = this.submitButtonClick.bind(this);
  }
  // to bind the functions with the input fields or with the dropdown list
  // the end of the constructor
  handleNameBox(event) {
    this.setState({ name: event.target.value });
    this.validateName(event.target.value);
  } // this function handles the first input field which is the user name will be put in.
  // it takes the value that the user entered, using "event.target.value", and makes it the value for "name" variable using setState()

  validateName(name) {
    let localFormErrors = this.state.formErrors;
    if (name.length < 6) {
      localFormErrors.name = "This name is too short";
    } else if (!isNaN(name)) {
      localFormErrors.name = "Please enter a valid name";
    } else {
      localFormErrors.name = "";
      this.setState({ nameValid: true });
      this.validateForm();
    }
  } // this function's job is to make sure that the user enter a valid name
  // also has a role in validating the whole form
  handleEmailBox(event) {
    this.setState({ email: event.target.value });
    this.validateEmail(event.target.value);
  } // this function handles the first input field where the email adrees of the user will be put in.
  // it takes the value that the user entered, using "event.target.value", and makes it the value for "email" variable using setState()

  validateEmail(email) {
    let localFormErrors = this.state.formErrors;
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(String(email).toLowerCase()) && email.length > 10) {
      localFormErrors.email = "";
      this.setState({ emailValid: true });
      this.validateForm();
    } else {
      localFormErrors.email = "This email is not Valid";
    }
  } // this function's job is to make sure that the user enter a valid email
  // also has a role in validating the whole form

  handlePasswordBox(event) {
    this.setState({ password: event.target.value });
    this.validatePassword(event.target.value);
  } // this function handles the third input field where the password of the user will be put in.
  // it takes the value that the user entered, using "event.target.value", and makes it the value for "password" variable using setState()
  validatePassword(password) {
    let localFormErrors = this.state.formErrors;
    const re = new RegExp("^(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
    if (re.test(password)) {
      localFormErrors.password = "";
      this.setState({ passwordValid: true });
      this.validateForm();
    } else {
      localFormErrors.password = "This password is not Valid";
    }
  } // this function's job is to make sure that the user enter a valid password
  //it has to be at least (one uppercase char , one lower case char, one number) and its length has to be at least 9
  // also has a role in validating the whole form

  handlePhoneBox(event) {
    this.setState({ phone: event.target.value });
    this.validatePhone(event.target.value);
  } // this function handles the fourth input field where the phone number of the user will be put in.
  // it takes the value that the user entered, using "event.target.value", and makes it the value for "phone" variable using setState()

  validatePhone(phone) {
    let localFormErrors = this.state.formErrors;
    const phonePattern = new RegExp(/^[0-9\b]+$/);
    if (phonePattern.test(phone) && this.state.phone.length === 9) {
      localFormErrors.phone = "";
      this.setState({ phoneValid: true });
      this.validateForm();
    } else {
      localFormErrors.phone = "is not a valid phone number";
    }
  } // this function's job is to make sure that the user enter a valid phone number
  //it has to be all consist of only numbers and its length has to be 9
  // also has a role in validating the whole form
  validateForm() {
    this.setState({
      formValid:
        this.state.nameValid &&
        this.state.emailValid &&
        this.state.passwordValid
      //this.state.phoneValid &&
    });
  } // this function checks if these values are true then the "formValid" variable will be true as well
  // if "formValid" is true, the submit button will be active as the user filled all the required fields. Otherwise the register button will remail desibeld.
  submitButtonClick() {
    console.log(this.state.name);
    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.passwordConf);
    console.log(this.state.phone);
  } // the function that will make the action after the user clicking on the submit button

  render() {
    return (
      <div className="Register">
        <div class="frame4">
           <p>
          New Customer!!
          <br/> Regester Now
          <br />
          <br />
            <form>
              <label for="name">Name:</label>

              <input
                type="Name"
                value={this.state.name}
                name="getName"
                onChange={this.handleNameBox}
                placeholder="Full Name"
              ></input>
            </form>
            <br />

            {this.state.formErrors.name && (
              <div class="error">
                {this.state.formErrors.name}
                <br />
                <br />
              </div>
            )}

            <form>
              <label for="mail">Email address:</label>
              <input
                type="email"
                value={this.state.email}
                name="getEmail"
                onChange={this.handleEmailBox}
                placeholder="Email"
              ></input>
            </form>
            <br />
            {this.state.formErrors.email && (
              <div class="error">
                {this.state.formErrors.email}
                <br />
                <br />
              </div>
            )}
            <form>
              <label>Password:</label>
              <input
                type="Password"
                placeholder="9No./Letters+UpperCase"
                value={this.state.password}
                onChange={this.handlePasswordBox}
              ></input>
            </form>
            {this.state.formErrors.password && (
              <div class="error">
                <br />
                {this.state.formErrors.password}
                <br />
              </div>
            )}
            <br />
            <form>
              <label></label>
              <span>Phone number:</span>
              <input
                type="phone"
                value={this.state.phone}
                name="getphone"
                onChange={this.handlePhoneBox}
                placeholder="Phone"
              ></input>
            </form>
            <div class="error">{this.state.formErrors.phone}</div>
            <br />
          </p>
          <div class="frame4">
            <button
              type="submit"
              disabled={!this.state.formValid}
              onClick={this.submitButtonClick}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;

