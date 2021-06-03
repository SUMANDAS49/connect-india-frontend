import React,{useState,useEffect} from "react";
import ImageHelper from "./Helpers/ImageHelper";
import "./postCard.css"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {isAuthenticated} from "../auth/Helper"
import { deletePost } from "./Helpers/PostDeleteHelper";
function PostCard({ id, content, name, likes,email,idr,authorId }) {
  const [displayMore,setDisplayMore]=useState(false)
 
  const deletePostHandler=()=>{
    const userId=isAuthenticated().user._id
    const postId=idr;
    const token=isAuthenticated().token
    deletePost(postId,userId,token).then((r)=>{
      window.location.reload()
    }).catch((err)=>{
      console.log(err)
    })
  }
  const showMore=()=>{
    setDisplayMore(!displayMore)
  }
  const deleteForm=()=>{
    return <div className="show-more-form">
      {isAuthenticated().user._id===authorId && <div className="delete" onClick={()=>deletePostHandler()}>delete</div>}
      <div className="about">about</div>
    </div>
  }
  return (
    <div className="post-card">
      {displayMore && deleteForm()}
      <div className="post-card-author"> 
        <div style={{display:"flex",flexDirection:"raw"}}>
        <div className="name">{name}</div>
        <div className="more" onClick={()=>{showMore()}}><MoreVertIcon className="main" /> </div>
        </div>
        <div className="email">{email}</div>
      </div>
      <div className="post-card-image">
        <ImageHelper product={id} />
      </div>
      <div className="content">
        {content}
      </div>
      <div className="like-box">
        <div className="like"><ThumbUpAltIcon className="main" /></div>
        <div className="dislike"><ThumbDownIcon className="main" /></div>
        <div className="love"><FavoriteIcon className="main" /></div>
        <div className="haha"><EmojiEmotionsIcon className="main" /></div>
      </div>
    </div>
  );
}


export default PostCard;
