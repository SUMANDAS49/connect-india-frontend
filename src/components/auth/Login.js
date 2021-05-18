import React, { useState, useEffect } from "react";
import { Link ,Redirect} from "react-router-dom";
import "./auth.css";
import { signUp,LogIn } from "./Helper";
function Login() {
  
  const [details, setDetails] = useState({
    email: "",
    password: "",
   
  });
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const { email, password} = details;
  const [clicked, setClicked] = useState(false);
  const [redirect,setRedirect]=useState(false)
  const done = () => {
    LogIn(email, password)
      .then((res) => {
        if (res) {
          if (res.error) {
            setErr(res.error);
            setSuccess(false);
          } else {
            console.log(res);
            localStorage.setItem("auth",JSON.stringify(res))
            setSuccess(true);
            setRedirect(true)
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setDetails({ email: "", password: "" });
    setClicked(true);
  };

 if(redirect===true)
 {
   return <Redirect to="/" />
 }
  return (
    <div className="sign-up-body">
      <div className="title">Login</div>
      {err.length !== 0 && success === false
        ? clicked && <div className="sign-up-error">{err}</div>
        : clicked && (
            <div className="sign-up-success">
              <h4>
                successfully logged in
                
              </h4>
            </div>
          )}
      <div className="sign-up-container">
        
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
            done()
            
          }}
          className="ip3"
        >
          Log in
        </button>
      </div>
    </div>
  );
}

export default Login;
