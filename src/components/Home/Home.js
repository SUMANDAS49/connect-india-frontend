import React,{useEffect,useState} from 'react'
import Bottombar from '../bottombar/Bottombar'
import "./Home.css"
import Nav from '../navbar/Nav'
import Base from '../../Base'
import CreatePost from '../post/CreatePost'
import DisplayPosts from '../post/DisplayPosts'
import Story from '../Story/Story'
import {storyDataProvider} from "../DummyData/Data"
import { isAuthenticated } from '../auth/Helper'
import { Redirect } from 'react-router'
import { getAllStories } from '../StoryApiCall/GrtAllStories'

function Home() {
  const [story,setStory]=useState([])
  const resirectToLogin=()=>{
    return <Redirect to="/auth/login" />
  }
  //story realted work starts here----------------------------
   useEffect(()=>{
     getAllStories().then((r)=>{
       console.log(r)
       setStory(r)
     })
     
   },[])

  // story related works ends here------------xxxxxxxxxxxxxxxx
  return (
    <Base>
        {isAuthenticated() &&  <Story data={story} />}
        <CreatePost />
        {isAuthenticated() && <DisplayPosts />}
        {!isAuthenticated() && resirectToLogin()}
    </Base>
  )
}

export default Home
