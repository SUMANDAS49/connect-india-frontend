import {API} from "../../Backend"
export const getAllUsers=()=>{
 return fetch(`${API}/user/all`,{
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
