import React, { useState, useEffect ,useContext} from "react";
import { isAuthenticated } from "../auth/Helper";
import { getAllPosts } from "./PostHelper";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import {Redirect} from "react-router-dom"
import "./displayPosts.css"
import PostCard from "./PostCard";
import { PostReloadContext } from "../Contexts/PostReloaderContext";
import { PostLoaderContext } from "../Contexts/PostLoaderContext";

function DisplayPosts() {
  const redirectToLogin=()=>{
return <Redirect to="/auth/login" />
  }
  const [data, setdata] = useState({});

  const [postsReload,setPostReload]=useContext(PostReloadContext)
  const [postLoad,setPostLoad]=useContext(PostLoaderContext)
  const [error, setError] = useState({
    message: "",
    isError: false,
  });
  
  useEffect(() => {
    if (isAuthenticated()) {
      
      const token = isAuthenticated().token;
      const userId = isAuthenticated().user._id;
      getAllPosts(userId, token)
        .then((r) => {
          if (r.error !== undefined) {
            setError({ message: r.error, isError: true });
          } else {
            setdata(r);
            
            setPostLoad(false)
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [postsReload]);
  const errorMessage = () => {
    return <div className="display-post-error">{error.message}</div>;
  };
  {
    return (
      <div className="display-posts-body">
        {error.isError && errorMessage()}
        <div>
          {
            postLoad && <img className="loader" src="./loader1.gif" />
          }
        {
            
            !postLoad && data.posts.map((d) => {
                return <PostCard name={d.author} email={d.email} content={d.content} id={d} idr={d._id} authorId={d.authorId} />;
              })
        }
        </div>
      </div>
    );
  }
}

export default DisplayPosts;
