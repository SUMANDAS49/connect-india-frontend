import { API } from "../../Backend"


export const createStory=(userId,token,data)=>{
    return fetch(`${API}/story/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"aplication/json",
            Authorization:`Bearer ${token}`
        },
        body:(data)
    }).then((r)=>{
        return r.json()
    }).catch((err)=>{
        console.log(err)
    })
}