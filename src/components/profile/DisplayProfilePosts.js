import React, { useState, useEffect } from 'react'
import PostCard from '../post/PostCard'
import { getPostById } from './ApiHelper'

function DisplayProfilePosts({ id }) {
 const [post, setPost] = useState({})
 useEffect(() => {
  getPostById(id).then((p)=>{
   setPost(p)
  })
 }, [])
 return ( 
  <div>
  {post &&  <PostCard id={post} content={post.content} name={post.author} email={post.email} idr={post._id} authorId={post.authorId} /> }
  </div>
 )
}

export default DisplayProfilePosts
