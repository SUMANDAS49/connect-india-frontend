import React from "react";
import "./storyCard.css"
import CancelIcon from '@material-ui/icons/Cancel';
import { API } from "../../../Backend";

const StoryCard = ({ d, allD,display }) => {
  

  return (
    <div>
      <div className="main-story">
        <div onClick={()=>display(false)} className="close-button">
        <  CancelIcon className="main-close-button"   />
        </div>
        
        <div className="author">{d.author}</div>
        <div className="content">
          <div
            className="image-background"
            style={{ backgroundImage: `url(${API}/story/image/${d._id})` }}
          >
              {d.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
