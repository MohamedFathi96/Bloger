import React from "react";
import { useNavigate } from "react-router-dom";
import facebook from "../assets/facebook.png";
import google from "../assets/google.png";
import twitter from "../assets/twitter.png";
import "../css/login.css";

const Login = () => {
  return (
    <div id="container">
      <div id="loginform">
        <FormHeader title="Blog Club" />
        <Form />
        <OtherMethods />
      </div>
    </div>
  );
};
const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

const Form = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <FormInput
        description="Username"
        placeholder="Enter your username"
        type="text"
      />
      <FormInput
        description="Password"
        placeholder="Enter your password"
        type="password"
      />
      <div>
        <FormButton title="Log In" />
      </div>
      <div
        onClick={() => {
          navigate("/signup");
        }}
      >
        <FormButton title="Sign UP" />
      </div>
    </div>
  );
};

const FormButton = (props) => (
  <div id="button" className="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = (props) => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} />
  </div>
);
const OtherMethods = (props) => (
  <div id="alternativeLogin">
    <label>Or sign in with:</label>
    <div id="iconGroup">
      <Facebook />
      <Twitter />
      <Google />
    </div>
  </div>
);
const Facebook = (props) => (
  <button href="#" id="facebookIcon">
    <img src={facebook} alt="faceBook" />
  </button>
);

const Twitter = (props) => (
  <button href="#" id="twitterIcon">
    <img src={twitter} alt="twitter" />
  </button>
);

const Google = (props) => (
  <button href="#" id="googleIcon">
    <img src={google} alt="google" />
  </button>
);

export default Login;
