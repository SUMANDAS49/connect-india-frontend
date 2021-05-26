import React from 'react'
import Bottombar from '../bottombar/Bottombar'
import "./Home.css"
import Nav from '../navbar/Nav'
import Base from '../../Base'
import CreatePost from '../post/CreatePost'
import DisplayPosts from '../post/DisplayPosts'
import Story from '../Story/Story'
import {storyDataProvider} from "../DummyData/Data"
function Home() {
  return (
    <Base>
        <Story data={storyDataProvider()} />
        <CreatePost />
        <DisplayPosts />
    </Base>
  )
}

export default Home
