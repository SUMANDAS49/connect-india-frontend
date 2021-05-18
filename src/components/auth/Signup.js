import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { signUp } from "./Helper";
function Signup() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const { email, password, name } = details;
  const [clicked, setClicked] = useState(false);
  const done = () => {
    signUp(email, password, name)
      .then((res) => {
        if (res) {
          if (res.error) {
            setErr(res.error);
            setSuccess(false);
          } else {
            console.log(res);
            setSuccess(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setDetails({ name: "", email: "", password: "" });
    setClicked(true);
  };
  return (
    <div className="sign-up-body">
      <div className="title">Register here</div>
      {err.length !== 0 && success === false
        ? clicked && <div className="sign-up-error">{err}</div>
        : clicked && (
            <div className="sign-up-success">
              <h4>
                Registration complete! click here{" "}
                <Link to="/auth/login">login</Link>{" "}
              </h4>
            </div>
          )}
      <div className="sign-up-container">
        <input
          value={name}
          onChange={(e) => {
            setDetails({ ...details, name: e.target.value });
          }}
          type="text"
          placeholder="Name"
          className="ip0"
        />
        <input
          value={email}
          type="text"
          placeholder="Email"
          className="ip1"
          onChange={(e) => {
            setDetails({ ...details, email: e.target.value });
          }}
        />
        <input
          value={password}
          onChange={(e) => {
            setDetails({ ...details, password: e.target.value });
          }}
          type="password"
          placeholder="Password"
          className="ip2"
        />

        <button
          onClick={() => {
            done();
          }}
          className="ip3"
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;
