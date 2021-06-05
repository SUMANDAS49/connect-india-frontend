import {createContext,useState} from "react"
export const PostLoaderContext=createContext();

export const PostLoaderContextProvider=(props)=>{
 const [postLoad,setPostLoad]=useState(true)
 return(
  <PostLoaderContext.Provider value={[postLoad,setPostLoad]}>
   {props.children}
  </PostLoaderContext.Provider>
 )
}