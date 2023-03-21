import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import facebook from "../assets/facebook.png";
import google from "../assets/google.png";
import twitter from "../assets/twitter.png";
import { useAuthContext } from "../context/AuthContext";
import { Alert } from "@mui/material";
import Grow from "@mui/material/Grow";

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
  const { logIn } = useAuthContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [alertErr, setAlertErr] = useState(false);
  async function handleLogin() {
    try {
      await logIn(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setAlertErr(true);
    }
  }
  return (
    <div className="up">
      <FormInput
        description="Email"
        placeholder="Enter your email"
        type="text"
        elemref={emailRef}
      />
      <FormInput
        description="Password"
        placeholder="Enter your password"
        type="password"
        elemref={passwordRef}
      />
      <div className="up">
        <FormButton clickFunc={handleLogin} type="submit" title="Log In" />
      </div>
      <div className="up">
        <FormButton
          type="button"
          clickFunc={() => {
            navigate("/signup");
          }}
          title="Sign UP"
        />
      </div>
      <div className={`mt-2 px-2 ${alertErr ? "block" : "hidden"}`}>
        <Grow
          in={alertErr}
          style={{ transformOrigin: "0 0 0" }}
          {...(alertErr ? { timeout: 1000 } : {})}
        >
          <Alert variant="filled" severity="error">
            Sorry Couldn't Log In try again!!!
          </Alert>
        </Grow>
      </div>
    </div>
  );
};

const FormButton = (props) => (
  <div id="button" className="row">
    <button onClick={props.clickFunc} type={props.type}>
      {props.title}
    </button>
  </div>
);

const FormInput = (props) => (
  <div className="row">
    <label>{props.description}</label>
    <input
      ref={props.elemref}
      type={props.type}
      placeholder={props.placeholder}
    />
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
