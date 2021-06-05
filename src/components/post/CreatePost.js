import React,{useState,useContext} from "react";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {isAuthenticated} from "../auth/Helper"
import "./post.css"



import { uploadPost } from "./PostHelper";
import { compressImage } from "./Helpers/Compressor";

import { PostReloadContext } from "../Contexts/PostLoaderContext";
function CreatePost() {
  const [postReload,setPostReload]=useContext(PostReloadContext)

    const data=new FormData()
    const [values,setvalues]=useState({
        content:"",
        image:""
    })
    const {image,content}=values
    const printValues= ()=>{
       
       
        data.append("content",content)
        data.append("image",image)
        const userId=isAuthenticated().user._id;
        const token=isAuthenticated().token;
        uploadPost(userId,token,data).then((r)=>{
            console.log(r)
            setvalues({image:"",content:""})
            setPostReload(!postReload)
           
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    const createPostForm=()=>{
        return (
            <div className="create-post-form-container">
                <input className="ip" placeholder="write something" value={content} onChange={(e)=>{setvalues({...values,content:e.target.value})}} />
               <div className="file"><input onChange={(e)=>{setvalues({...values,image:e.target.files[0]})}}   type="file" /><button onClick={()=>printValues()}>Post</button></div>
            </div>
        )
    }
    
  return (
    <div>
        {
          isAuthenticated() &&  <div className="create-post-container">
            {createPostForm()}
          </div>
        }
    </div>
  );
}

export default CreatePost;
