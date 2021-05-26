import React, { useState } from "react";
import "./story.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import StoryCard from "./childs/StoryCard";
import AddCircleIcon from '@material-ui/icons/AddCircle';
const rightScroll = () => {
  document.getElementById("small-preview").scrollLeft += 70;
};
const leftScroll = () => {
  document.getElementById("small-preview").scrollLeft -= 70;
};
const Story = ({ data }) => {
  const [showBigStory,setShowBigStory]=useState(false)
  const [singleData,setSingleData]=useState({})
  if(showBigStory===true)
  {
    return <StoryCard d={singleData} allD={data.data} />
  }
  else
  return (
    <div className="story-base">
      <div className="small-preview" id="small-preview">
        <div className="small-card">
          <div className="heading">
            <div className="author"></div>

          </div>
          <div className="main-story">
            <div className="contents">
              <div className="image-background" style={{backgroundColor:"black"}}>
                <div className="texts">Add your story ..<AddCircleIcon /></div>
              </div>

            </div>
          </div>

        </div>
        {data.data.map((e) => {
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
                    style={{ backgroundImage: `url(${e.image})` }}
                    onClick={() => {
                      setShowBigStory(true)
                      setSingleData(e)
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
