import React, { Component } from "react";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./styles.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErrors: { email: "", password: "" },

      emailValid: false,
      passwordValid: false,
      formValid: false
    }; // All the variables that I need to change their values in my programe

    this.handleEmailBox = this.handleEmailBox.bind(this);
    this.handlePasswordBox = this.handlePasswordBox.bind(this);
    this.submitButtonClick = this.submitButtonClick.bind(this);
  } // to bind the functions with the input fields or with the dropdown list
  // the end of the constructor

  handleEmailBox(event) {
    this.setState({ email: event.target.value });
    this.validateEmail(event.target.value);
  } // this function handles the first input field where the email adrees of the user will be put in.
  // it takes the value that the user entered, using "event.target.value", and makes it the value for "email" variable using setState()

  validateEmail(email) {
    let localFormErrors = this.state.formErrors;
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(String(email).toLowerCase())) {
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
  } // this function handles the second input field where the password of the user will be put in.
  // it takes the value that the user entered, using "event.target.value", and makes it the value for "password" variable using setState()
  validatePassword(password) {
    const passwordReg = new RegExp("^(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
    let localFormErrors = this.state.formErrors;

    if (passwordReg.test(password)) {
      localFormErrors.password = "";
      this.setState({ passwordValid: true });
      this.validateForm();
    } else {
      localFormErrors.password = "This password is not Valid";
    }
  }// this function's job is to make sure that the user enter a valid password 
  //it has to be at least (one uppercase char , one lower case char, one number) and its length has to be at least 9
  // also has a role in validating the whole form

  validateForm() {
    this.setState({
      formValid: this.state.passwordValid && this.state.emailValid
    });
  } // this function checks if these values are true then the "formValid" variable will be true as well
  // if "formValid" is true, the submit button will be active as the user filled all the required fields. Otherwise the login button will remail desibeld.

  submitButtonClick() {
    console.log(this.state.name);
    console.log(this.state.email);
    console.log(this.state.phone);
  } // the function that will make the action after the user clicking on the submit button

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>

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
          <div>
            {this.state.formErrors.email}
            <br />
            <br />
          </div>
        )}
        <form>
          <label>Password:</label>
          <input
            type="Password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handlePasswordBox}
          ></input>
        </form>
        {this.state.formErrors.password && (
          <div>
            <br />
            {this.state.formErrors.password}
            <br />
          </div>
        )}
        <br />

        <button
          type="submit"
          disabled={!this.state.formValid}
          onClick={this.submitButtonClick}
        >
          Login
        </button>
      </div>
    );
  }
}
export default Login;
