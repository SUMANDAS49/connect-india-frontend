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
export const getPostById=(id)=>{
 return fetch(`${API}/post/postbyid/${id}`,{
  method:"GET",
  headers:{
   Accept:"application/json"
  }
}).then((p)=>{
 return p.json()
}).catch((err)=>{
 console.log(err)
})
}
