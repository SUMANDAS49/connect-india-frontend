import React, { useState } from "react";
import "./story.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import StoryCard from "./childs/StoryCard";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { API } from "../../Backend";
import {createStory} from ".././StoryApiCall/CreateStory"
import {isAuthenticated} from "../auth/Helper"
const rightScroll = () => {
  document.getElementById("small-preview").scrollLeft += 70;
};
const leftScroll = () => {
  document.getElementById("small-preview").scrollLeft -= 70;
};
const Story = ({ data,stroryLoading }) => {
  const [showBigStory, setShowBigStory] = useState(false);
  const [singleData, setSingleData] = useState({});
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [createStoryData,setCreateStoryData]=useState({
    image:"",
    content:""
  })
const submitCreateStory=()=>{
let sdata=new FormData()
sdata.append("content",createStoryData.content)
sdata.append("image",createStoryData.image)
const token=isAuthenticated().token
const userId=isAuthenticated().user._id
createStory(userId,token,sdata).then((res)=>{
  setShowStoryForm(false)
})

}
  const storyForm = () => {
    return (
      <div className="story-form">
        <h1>Create fantastic story</h1>
        <CancelIcon onClick={()=>{setShowStoryForm(false)}} className="cancel-icon" />
        <div className="form-input">
          <input type="file" className="form-file" onChange={(e)=>{setCreateStoryData({...createStoryData,image:e.target.files[0]})}} />
          <textarea className="form-text-area" onChange={(e)=>{setCreateStoryData({...createStoryData,content:e.target.value})}} />
        </div>
        <div onClick={()=>{submitCreateStory()}} className="post-button">Post</div>
      </div>
    );
  };
  if (showStoryForm === true) {
    return <div className="story-form-container">{storyForm()}</div>;
  }
  if (showBigStory === true) {
    return (
      <StoryCard d={singleData} allD={data.data} display={setShowBigStory} />
    );
  } else
    return (
      <div className="story-base">
        <div className="small-preview" id="small-preview">
          <div
            onClick={() => {
              setShowStoryForm(true);
            }}
            className="small-card"
          >
            <div className="heading">
              <div className="author"></div>
            </div>

            <div className="main-story">
              <div className="contents">
                <div
                  className="image-background"
                  style={{ backgroundColor: "black" }}
                >
                  <div className="texts">
                    Add your story ..
                    <AddCircleIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {stroryLoading && <div className="loader-story"><img className="loader-story-image" src="./loader1.gif" /></div>}
          {!stroryLoading && data.map((e) => {
            return (
              <div className="small-card">
                <div className="heading">
                  <div className="author">{e.author}</div>
                  <div className="time">{e.time}</div>
                </div>
                <div className="main-story">
                  <div className="contents">
                    <div
                      className="image-background"
                      style={{
                        backgroundImage: `url(${API}/story/image/${e._id})`,
                      }}
                      onClick={() => {
                        setShowBigStory(true);
                        setSingleData(e);
                      }}
                    >
                      <div className="texts">{e.content}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="scroll-buttons">
          <ArrowBackIcon
            className="left"
            onClick={() => {
              leftScroll();
            }}
          />
          <div className="mid"></div>
          <ArrowForwardIcon
            className="right"
            onClick={() => {
              rightScroll();
            }}
          />
        </div>
      </div>
    );
};

export default Story;
