import { API } from "../../Backend"

export const getAllStories=()=>{
    return fetch(`${API}/story/all`,{
        method:"GET",
        headers:{
            Accept:"application/json"
        }
    }).then((response)=>{
        return response.json()
    }).catch((err)=>{
        console.log(err)
    })
}