import React from "react";
import "./storyCard.css"
const StoryCard = ({ d, allD }) => {
  const len = allD.length;
  const target = allD.indexOf(d);
  let reqData = [];
  for (let i = target; i < len; i++) {
    reqData.push(allD[i]);
  }
  console.log(reqData);

  return (
    <div>
      <div className="main-story">
        <div className="author">{d.author}</div>
        <div className="content">
          <div
            className="image-background"
            style={{ backgroundImage: `url(${d.image})` }}
          >
              {d.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
