import React, { Profiler, useEffect, useState } from 'react'
import Base from '../../../Base'
import { isAuthenticated } from '../../auth/Helper'
import { getUserProfile } from '../ApiHelper'
import DisplayProfilePosts from '../DisplayProfilePosts'
import Profile from '../Profile'


import DuoTwoToneIcon from '@material-ui/icons/DuoTwoTone';
import SmsTwoToneIcon from '@material-ui/icons/SmsTwoTone';
import { Link } from 'react-router-dom'

import "../profileStyle.css"

import "./center.css"


function Center() {
    const [uId, setUId] = useState("")
    const [wait, setWait] = useState(true)
    const [uData, setUdata] = useState({})
    useEffect(() => {

        console.log("---" + window.location.href)
        let s = window.location.href
        let l = s.length
        let i = 0;
        let target = ""
        while (i < l - 24) {
            if (s[i] === "/" && s[i + 24 + 1] === "/") {
                target = s.substr(i + 1, 24);
                break;
            }
            i++;
        }
        console.log(target)
        setUId(target)
        console.log(uId)


    }, [])
    useEffect(() => {
        getUserProfile(uId).then((d) => {
            console.log(d)
            setUdata(d)
            setTimeout(() => {
                setWait(false)
            }, 500);
        })
    }, [uId])
    if (uId.length !== 0 && wait === false)
        return (
            <Base>
                <div className="profile-container">
                    <div className="user-details-screen">
                        <h3 style={{ textAlign: "center" }}>Hello! {isAuthenticated().user.name}</h3>
                        <ul>
                            <li>Name: {uData.name}</li>
                            <li>Email: {uData.email}</li>


                        </ul>

                    </div>
                    <div className="center-tool-box">
                        <ul>
                            <Link to={`/user/message/${uData._id}`}><li><SmsTwoToneIcon style={{fontSize:"50px"}} /></li></Link>
                            <li><DuoTwoToneIcon style={{fontSize:"50px"}} /></li>
                        </ul>
                    </div>
                    <div className="user-posts">
                        {!wait && uData.postIds && uData.postIds.map((pi) => {
                            return <DisplayProfilePosts id={pi} />
                        })}

                    </div>
                </div>
            </Base>

        )
    else {
        return (<div><h1>Loading...</h1></div>)
    }
}

export default Center
