import React from 'react'
import Bottombar from '../bottombar/Bottombar'
import "./Home.css"
import Nav from '../navbar/Nav'
import Base from '../../Base'
import CreatePost from '../post/CreatePost'
import DisplayPosts from '../post/DisplayPosts'

function Home() {
  return (
    <Base>
        <CreatePost />
        <DisplayPosts />
    </Base>
  )
}

export default Home
