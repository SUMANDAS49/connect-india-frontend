import React from "react";
import ImageHelper from "./Helpers/ImageHelper";
import "./postCard.css"

function PostCard({ id, content, name, likes,email }) {
  return (
    <div className="post-card">
      <div className="post-card-author"> 
        <div className="name">{name}</div>
        <div className="email">{email}</div>
      </div>
      <div className="post-card-image">
        <ImageHelper product={id} />
      </div>
      <div className="content">
        {content}
      </div>
    </div>
  );
}


export default PostCard;
