import React, { useState, useEffect } from 'react'
import { getAllUsers } from './SearchApiCall'
import SearchIcon from '@material-ui/icons/Search';
import "./searchBox.css"
import {Link} from "react-router-dom"
function SearchBox() {
  const [searchClicked, setSearchClicked] = useState(false)
  const [userData, setUserData] = useState([])
  const [query, setQuery] = useState("")
  const [qresult, setqresult] = useState([])
  useEffect(() => {
    getAllUsers().then((u) => {
      setUserData(u)

    })
  }, [])
  const displayResult = () => {

    let l = query.length;
    let res = [];
    setqresult(res)
    userData.forEach((user) => {

      // console.log(user.name.substring(0,l-1))
      if (user.name.substring(0, l) == query.toLowerCase() && qresult.length !== 0) {

        res.push(user)

      }
    })
    if (res.length === 0) {
      let dt = {
        name: "not found"
      }
      res.push(dt)
    }
    setqresult(res)
  }
  useEffect(() => {
    displayResult()
  }, [query])
  const searchInput = () => {

    return (
      <div className="search-input-and-result">

        <input type="text" value={query} onChange={(e) => { setQuery(e.target.value) }} />
        <div className="search-result-display">
          <ul>
            {
              qresult.map((r) => {
                return <li><Link to={`/user/${r._id}/profile`} style={{textDecoration:"none",color:"white"}}>{r.name}</Link></li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
  return (
    <div className="search-container">
      {
        searchClicked && searchInput()
      }
      <SearchIcon className="btn" onClick={() => { setSearchClicked(!searchClicked) }} />

    </div>
  )
}

export default SearchBox
