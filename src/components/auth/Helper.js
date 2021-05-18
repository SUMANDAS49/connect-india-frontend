import {Redirect} from "react-router-dom"
import { API } from "../../Backend";


export const signUp = (email, password, name) => {
  return fetch(`${API}/user/signup`, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .then((r) => {
      return r.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const LogIn = (email, password) => {
  return fetch(`${API}/user/signin`, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((r) => {
      return r.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const isAuthenticated = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("auth")) {
        console.log("form-----"+localStorage.getItem("auth"))
      return JSON.parse(localStorage.getItem("auth"));
    } else {
      return false;
    }
  } else {
    return false;
  }
};
