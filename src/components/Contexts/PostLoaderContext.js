import {createContext,useState} from "react"
export const PostReloadContext=createContext();

export const PostReloadContextProvider=(props)=>{
 const [postReload,setPostReload]=useState(false)
 return(
  <PostReloadContext.Provider value={[postReload,setPostReload]}>
   {props.children}
  </PostReloadContext.Provider>
 )
}