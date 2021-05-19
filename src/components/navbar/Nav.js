import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./cstyle.css";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import TelegramIcon from '@material-ui/icons/Telegram';
import HomeIcon from "@material-ui/icons/Home";
import Bounce from "react-reveal/Bounce";
import Fade from "react-reveal/Fade";
import { isAuthenticated, LogIn } from "../auth/Helper";

function Nav() {
  const [hide, setHide] = useState(false);
  const [changed, setChanged] = useState(false);

  const logout = () => {
    if (typeof window !== undefined) {
      localStorage.removeItem("auth");
    }
  };
  const displayUserName = () => {
    if (isAuthenticated().user !== undefined) {
      return (
        <div className="displayName">
          <AccountCircleIcon className="userIcon" />{" "}
          {isAuthenticated().user.name}
        </div>
      );
    } else {
      return (
        <Link to="auth/login">
          <div className="displayName">.</div>
        </Link>
      );
    }
  };
  const tgl = () => {
    if (hide === false) {
      return <CloseIcon />;
    } else {
      return (
        <>
          <MenuIcon />
        </>
      );
    }
  };
  useEffect(() => {
    setHide(true);
  }, []);

  return (
    <div className="nav">
      <div className="head">
        <Bounce>
          <div className="title">okindia</div>
          {displayUserName()}
        </Bounce>
      </div>
      <button
        onClick={() => {
          setHide(!hide);
        }}
      >
        {tgl()}
      </button>
      <Fade top big>
        <div className="main-nav" id={hide === true ? "hide" : "show"}>
          <ul>
            <Link
              style={{
                paddingLeft: 13,
                textDecoration: "none",
                color: "white",
              }}
              to="/"
            >
              {" "}
              <li>
                <HomeIcon />
              </li>
            </Link>
            {!isAuthenticated() && (
              <Link
                style={{
                  paddingLeft: 13,
                  textDecoration: "none",
                  color: "white",
                }}
                to="/auth/signup"
              >
                {" "}
                <li>sign up</li>
              </Link>
            )}
            {!isAuthenticated() && (
              <Link
                style={{
                  paddingLeft: 13,
                  textDecoration: "none",
                  color: "white",
                }}
                to="/auth/login"
              >
                {" "}
                <li>Log in</li>
              </Link>
            )}

            {isAuthenticated() && (
              <Link
                style={{
                  paddingLeft: 13,
                  textDecoration: "none",
                  color: "white",
                }}
              >
                {" "}
                <li
                  onClick={() => {
                    logout();
                  }}
                >
                  logout
                </li>
              </Link>
            )}
          </ul>
        </div>
      </Fade>
      <div className="outside">
        <ul>
        {isAuthenticated() && (
          <Link
            style={{
              paddingLeft: 13,
              textDecoration: "none",
              color: "white",
            }}
          >
            <li>
              <NotificationsNoneOutlinedIcon  className="main" />
            </li>
          </Link>
        )}
        {isAuthenticated() && (
          <Link
            style={{
              paddingLeft: 13,
              textDecoration: "none",
              color: "white",
            }}
          >
            <li>
              <TelegramIcon  className="main" />
            </li>
          </Link>
        )}
        </ul>
      </div>
    </div>
  );
}

export default Nav;
