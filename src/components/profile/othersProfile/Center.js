import React, { Profiler, useEffect, useState } from "react";
import Base from "../../../Base";
import { isAuthenticated } from "../../auth/Helper";
import { getUserProfile } from "../ApiHelper";
import DisplayProfilePosts from "../DisplayProfilePosts";
import Profile from "../Profile";

import DuoTwoToneIcon from "@material-ui/icons/DuoTwoTone";
import SmsTwoToneIcon from "@material-ui/icons/SmsTwoTone";
import { Link } from "react-router-dom";

import "../profileStyle.css";

import "./center.css";
import FollowUnfollow from "../../followManager/FollowUnfollow";

function Center() {
    const [uId, setUId] = useState("");
    const [wait, setWait] = useState(true);
    const [uIdDone, setUIdDone] = useState(false)
    const [uData, setUdata] = useState({});
    const { targetName } = isAuthenticated().user;

    useEffect(() => {
        console.log("---" + window.location.href);
        let s = window.location.href;
        let l = s.length;
        let i = 0;
        let target = "";
        while (i < l - 24) {
            if (s[i] === "/" && s[i + 24 + 1] === "/") {
                target = s.substr(i + 1, 24);
                break;
            }
            i++;
        }
        console.log(target);
        setUId(target);
        setUIdDone(true)

    }, []);
    useEffect(() => {

        if (uIdDone === true) {
            // console.log("*******#######" + uId);
            setTimeout(() => {
                getUserProfile(uId).then((d) => {


                    console.log(d);
                    setUdata(d);
                    setWait(false);

                });
            }, 500)
        }
    }, [uId]);
    if (wait === false)
        return (
            <Base>
                <div className="profile-container">
                    <div className="user-details-screen">
                        <h3 style={{ textAlign: "center" }}>Hello! {targetName}</h3>
                        <ul>
                            <li>Name: {uData.name}</li>
                            <li>Email: {uData.email}</li>
                        </ul>
                    </div>
                    <FollowUnfollow
                        myId={isAuthenticated().user._id}
                        userId={uId}
                        token={isAuthenticated().token}
                    />
                    <div className="center-tool-box">
                        <div className="chat-icon">
                            <span>
                                <Link to={`/user/message/${uData._id}`}>
                                    <SmsTwoToneIcon style={{ fontSize: "50px", margin: "auto" }} />
                                </Link>
                            </span>

                        </div>
                        <div className="video-call-icon">
                            <span>
                                <DuoTwoToneIcon style={{ fontSize: "50px" }} />
                            </span>

                        </div>
                    </div>
                    <div className="user-posts">
                        {!wait &&
                            uData.postIds &&
                            uData.postIds.map((pi) => {
                                return <DisplayProfilePosts id={pi} />;
                            })}
                    </div>
                </div>
            </Base>
        );
    else {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }
}

export default Center;
