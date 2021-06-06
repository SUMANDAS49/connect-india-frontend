import React, { useState, useEffect } from 'react'
import Base from '../../Base';
import { isAuthenticated } from '../auth/Helper'
import { getUserProfile } from './ApiHelper';
import "./profileStyle.css"

function Profile() {
  const [userData, setUserData] = useState({})
  useEffect(() => {
    const { _id } = isAuthenticated().user;
    getUserProfile(_id).then((r) => {
      setUserData(r);
    })
  }, [])

  return (
    <Base>
      <div className="profile-container">
         <div className="user-details-screen">
           <h3 style={{textAlign:"center"}}>Hello! {userData.name}</h3>
           <ul>
             <li>Name: {userData.name}</li>
             <li>Email: {userData.email}</li>
             <li>ID: {userData._id}</li>
             
           </ul>

         </div>
      </div>
    </Base>
  )
}

export default Profile
