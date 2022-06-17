import React from 'react'
import "./cstyle.css"
// import SearchIcon from '@mui/icons-material/Search';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { isAuthenticated } from '../auth/Helper';


function Nav({ children }) {
  const [userDetails, setUserDetails] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let data = JSON.parse(window.localStorage.getItem("auth"))
    setUserDetails(data?.user)

    setLoading(false)
  }, [])
  return (
    <div className='navBody'>
      <div className='topBar'>
        <div className='appName'>connect india</div>
        {
          isAuthenticated()
          &&
          <div className='topIcons'>
            <div className='icon'>
              <Link style={{ color: "white" }} to={`/user/profile/search`}>
                <SearchIcon />
              </Link>
            </div>
            <div className='icon'>
              <Link style={{ color: "white" }} to={`/`}>
                <HomeIcon />
              </Link>
            </div>
            {
              !loading && isAuthenticated() &&
              <div className='icon'>
                <Link style={{ color: "white" }} to={`/${userDetails.name}/profile`}>
                  <AccountCircleIcon />
                </Link>
              </div>}
          </div>
        }

      </div>
      <div>{children}</div>

      <div className='bottomBar'>
        <div className='icons'>
          <div className='icon'>
            <Link style={{ color: "white" }} to={`/user/profile/search`}>
              <SearchIcon />
            </Link>
          </div>
          <div className='icon'>
            <Link style={{ color: "white" }} to={`/`}>
              <HomeIcon />
            </Link>
          </div>
          {
            !loading && isAuthenticated() &&
            <div className='icon'>
              <Link style={{ color: "white" }} to={`/${userDetails.name}/profile`}>
                <AccountCircleIcon />
              </Link>
            </div>
          }
          <div className='icon'>
            <Link style={{ color: "white" }} to={`/`}>
              <MessageIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav