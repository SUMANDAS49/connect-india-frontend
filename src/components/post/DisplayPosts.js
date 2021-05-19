import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/Helper";
import { getAllPosts } from "./PostHelper";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import {Redirect} from "react-router-dom"
import "./displayPosts.css"
import PostCard from "./PostCard";
function DisplayPosts() {
  const redirectToLogin=()=>{
return <Redirect to="/auth/login" />
  }
  const [data, setdata] = useState({});
  const [loading, setLoading] = useState(true);
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
            console.log(data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const errorMessage = () => {
    return <div className="display-post-error">{error.message}</div>;
  };
  if (loading === true) {
    return (
      <div className="loader">
        {!isAuthenticated() && <img src="loader.gif" className="actual" />}
        {!isAuthenticated() && redirectToLogin()}
      </div>
    );
  } else {
    return (
      <div className="display-posts-body">
        {error.isError && errorMessage()}
        <div>
        {
            
            data.posts.map((d) => {
                return <PostCard name={d.author} email={d.email} content={d.content} id={d} idr={d._id} />;
              })
        }
        </div>
      </div>
    );
  }
}

export default DisplayPosts;
