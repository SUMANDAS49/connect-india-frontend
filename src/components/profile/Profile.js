import React, { useState, useEffect } from 'react'
import Base from '../../Base';
import { isAuthenticated } from '../auth/Helper'
import SearchBox from '../Search/SearchBox';
import { getPostById, getUserProfile } from './ApiHelper';
import DisplayProfilePosts from './DisplayProfilePosts';
import "./profileStyle.css"

function Profile() {

  const [userData, setUserData] = useState({})
  const [wait, setWait] = useState(true)
  useEffect(() => {
    const _id = isAuthenticated().user._id;
    getUserProfile(_id).then((r) => {

      setUserData(r);
    })
  }, [])
  useEffect(() => {
    console.log(userData)
    setWait(false)
  }, [userData])



  return (
    <Base>
      <div className="profile-container">
        {/* <SearchBox /> */}
        <div className="user-details-screen">
          <h3 style={{ textAlign: "center" }}>Hello! {userData.name}</h3>
          <ul>
            <li>Name: {userData.name}</li>
            <li>Email: {userData.email}</li>
            <li>ID: {userData._id}</li>

          </ul>

        </div>
        <div className="user-posts">
          {!wait && userData.postIds && userData.postIds.map((pi) => {
            return <DisplayProfilePosts id={pi} />
          })}

        </div>
      </div>
    </Base>
  )
}

export default Profile
