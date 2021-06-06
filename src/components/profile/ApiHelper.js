import { API } from "../../Backend"

export const getUserProfile=(userId)=>{
 return fetch(`${API}/singleuser/${userId}`,{
  method:"GET",
  headers:{
   Accept:"application/json"
  }
 }).then((r)=>{
  return r.json()
 }).catch((err)=>{
  console.log(err)
 })

}
